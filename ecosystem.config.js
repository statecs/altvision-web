module.exports = {
  apps: [{
    name: 'altvision-app',
    script: 'npx',
    args: ['serve', '-s', 'build', '-l', '5091', '--single'],
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
    }
  }]
};