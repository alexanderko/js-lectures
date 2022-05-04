console.time('first timeout');
setTimeout(function () {
    console.timeEnd('first timeout');
}, 10_000);

const clock = setInterval(() => {
    let time = new Date().toLocaleTimeString();
    console.log(time);
}, 1000);
console.log('Clock started ...');
console.time('clock');

function stopClock() {
    clearInterval(clock);
    console.log('Clock stopped');
    console.timeEnd('clock');
}

setTimeout(stopClock, 20_000);
console.log('... stop clock registered');
