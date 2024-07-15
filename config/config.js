module.exports = {
  mongodb: {
    uri: 'mongodb://127.0.0.1:27017/rideDB',
  },
  crypto: {
    iterations: 12000,
    length: 128,
    digest: 'sha512',
  },
  newAdmin: {
    NAME: process.argv[2],
    PASSWORD: process.argv[3],
  },
  MOCK: process.env.MOCK || 'false'
};
