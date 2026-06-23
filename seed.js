// Automatic background seeder for the AcePath dev server
setTimeout(() => {
  fetch('http://localhost:3001/auth/seed')
    .then(r => r.json())
    .then(data => console.log('✅ [DB_SEED]', data.status || data))
    .catch(() => console.log('⚠️ [DB_SEED] Skipped: Backend not ready'));
}, 8000);
