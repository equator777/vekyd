/**
 * Free Real-Time Visitor IP & Location Tracker
 * Fetches visitor IP, city, region, country, and device type without requiring API keys
 */

export const trackVisitor = async () => {
  try {
    const existingLogs = JSON.parse(localStorage.getItem('tc_visitor_logs_v2') || '[]');
    
    // Check if tracked in the last 15 minutes to avoid spamming API
    const lastVisit = existingLogs[0];
    const now = Date.now();
    if (lastVisit && (now - new Date(lastVisit.timestamp).getTime()) < 15 * 60 * 1000) {
      return existingLogs;
    }

    // Fetch IP and Geolocation details
    const res = await fetch('https://ipapi.co/json/').catch(() => null);
    let ipData = {};
    if (res && res.ok) {
      ipData = await res.json().catch(() => ({}));
    }

    // Fallback if ipapi is rate-limited
    if (!ipData.ip) {
      const fallbackRes = await fetch('https://api.ipify.org?format=json').catch(() => null);
      if (fallbackRes && fallbackRes.ok) {
        const fallbackJson = await fallbackRes.json();
        ipData.ip = fallbackJson.ip;
      }
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const newLog = {
      id: `v-${now}`,
      ip: ipData.ip || 'Local / Anonymous',
      city: ipData.city || 'Unknown City',
      region: ipData.region || 'Unknown Region',
      country: ipData.country_name || 'India',
      countryCode: ipData.country_code || 'IN',
      org: ipData.org || ipData.network || 'Internet Provider',
      device: isMobile ? 'Mobile Smartphone' : 'Desktop Computer',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const updatedLogs = [newLog, ...existingLogs].slice(0, 100); // Keep last 100 visits
    localStorage.setItem('tc_visitor_logs_v2', JSON.stringify(updatedLogs));
    return updatedLogs;
  } catch (err) {
    console.warn('Visitor tracking notice:', err);
    return JSON.parse(localStorage.getItem('tc_visitor_logs_v2') || '[]');
  }
};
