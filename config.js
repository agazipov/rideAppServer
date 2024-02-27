module.exports = {
  // mongodb: {
  //   uri: (process.env.NODE_ENV === 'test') ?
  //     'mongodb://127.0.0.1:27017/7-module-1-task' :
  //     'mongodb://127.0.0.1:27017/any-shop',
  // },
  crypto: {
    iterations: 12000,
    length: 128,
    digest: 'sha512',
  },
};
