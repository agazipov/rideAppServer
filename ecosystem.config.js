module.exports = {
  apps : [{
    name: 'rideAppServer',
    script: 'index.js',
    env_prod: {
      'MOCK': 'false'
    },
    env_mock: {
      'MOCK': 'true'
    },
  }],
};
