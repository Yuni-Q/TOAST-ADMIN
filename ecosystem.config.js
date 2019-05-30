
module.exports = {
  apps: [
    {
      name: 'Yuni-Q_TOAST_ADMIN',
      script: 'next start',
      exec_mode: 'cluster',
      instances: '0',
      instance_var: 'INSTANCE_ID',
    },
  ],
};
