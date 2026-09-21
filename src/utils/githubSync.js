/**
 * GitHub REST API Sync Utility for Vekyd Static Marketplace
 * Allows Admin to commit updated JSON data directly to GitHub repository.
 * GitHub Pages / Netlify / Vercel will automatically rebuild and host the updated site for all visitors worldwide.
 */

export async function commitDataToGitHub({
  owner,
  repo,
  token,
  filePath = 'src/data/initialData.json',
  data,
  commitMessage = 'admin: update Vekyd marketplace users, goods, and ads data'
}) {
  if (!owner || !repo || !token) {
    throw new Error('Please provide GitHub Repository Owner, Repo Name, and Access Token.');
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  
  // Convert JS object to pretty JSON string
  const jsonContent = JSON.stringify(data, null, 2);
  // Base64 encode the string (handles UTF-8 strings safely)
  const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

  let sha = null;

  // Step 1: Check if file exists to get existing SHA
  try {
    const getRes = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
      }
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }
  } catch (err) {
    console.log('File does not exist yet on GitHub, creating new file...');
  }

  // Step 2: Commit (PUT) file to GitHub
  const body = {
    message: commitMessage,
    content: base64Content,
    ...(sha ? { sha } : {})
  };

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  if (!putRes.ok) {
    const errorData = await putRes.json();
    throw new Error(errorData.message || `GitHub API error: ${putRes.status}`);
  }

  const result = await putRes.json();
  return result;
}

let syncTimeout = null;

/**
 * Auto-triggers GitHub deployment commit if GitHub credentials exist in localStorage or ENV.
 * Call this whenever users, listings, tradesmen, or ads are mutated.
 */
export async function triggerAutoGitHubSync({
  users,
  goods,
  tradesmen,
  ads,
  tradeCategories,
  commitMessage,
  onSyncStart,
  onSyncSuccess,
  onSyncError
}) {
  const owner = localStorage.getItem('vekyd_gh_owner') || 'equator777';
  const repo = localStorage.getItem('vekyd_gh_repo') || 'vekyd';
  const token = localStorage.getItem('vekyd_gh_token') || import.meta.env.VITE_GITHUB_TOKEN || '';
  const autoPushEnabled = localStorage.getItem('vekyd_gh_auto_push') !== 'false';

  // If no token or auto push disabled, exit cleanly
  if (!token || !autoPushEnabled) {
    console.log('[GitHub Auto-Sync] Auto push skipped (No access token configured in Admin Panel or ENV)');
    return false;
  }

  // Clear existing debounce timer
  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }

  return new Promise((resolve) => {
    syncTimeout = setTimeout(async () => {
      try {
        if (onSyncStart) onSyncStart();

        const fullSiteData = {
          updatedAt: new Date().toISOString(),
          ...(tradeCategories ? { TRADE_CATEGORIES: tradeCategories } : {}),
          users: users || [],
          goods: goods || [],
          tradesmen: tradesmen || [],
          ads: ads || []
        };

        const msg = commitMessage || `live-sync: auto update marketplace content (${new Date().toLocaleTimeString()})`;

        const res = await commitDataToGitHub({
          owner,
          repo,
          token,
          filePath: 'src/data/initialData.json',
          data: fullSiteData,
          commitMessage: msg
        });

        console.log('[GitHub Auto-Sync] Successfully committed to GitHub:', res);
        if (onSyncSuccess) onSyncSuccess(res);
        resolve(true);
      } catch (err) {
        console.error('[GitHub Auto-Sync] Failed to commit to GitHub:', err);
        if (onSyncError) onSyncError(err);
        resolve(false);
      }
    }, 1500); // 1.5s debounce to consolidate rapid edits
  });
}

