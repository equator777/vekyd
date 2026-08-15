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
