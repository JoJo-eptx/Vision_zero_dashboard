module.exports = {
  apps: [
    {
      name: "SYSTEMIC_SAFETY_DASHBOARD",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: process.env.PORT || 3000,
      },
      watch: false,
      autorestart: true,
    },
  ],
};