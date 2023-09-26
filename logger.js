let logEnabled = false;

function enableLogging() {
    logEnabled = true;
}

function log(...args) {
    if (logEnabled) {
        console.log(...args);
    }
}

module.exports = {
    enableLogging,
    log
};
