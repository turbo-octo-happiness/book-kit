const runServer = require('../server').runServer;

before((done) => {
  runServer(() => {
    done();
  });
});
