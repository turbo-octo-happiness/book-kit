process.env.DEVELOPMENT = 'testing';
const runServer = require('../server').runServer;

before((done) => {
  runServer(() => {
    done();
  });
});
