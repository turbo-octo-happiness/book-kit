let makeSpy = function() {
  let spy = function() {
    spy.called = true;
  };
  spy.called = false;
  return spy;
};

module.exports = makeSpy;
