var makeSpy = function() {
    var spy = function() {
        spy.called = true;
    };
    spy.called = false;
    return spy;
};

module.exports = makeSpy;
