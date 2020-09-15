"use strict";

function getCurrentTime() {
    let now = new Date();
    let time = now.toTimeString().split(' ')[0];
    return time;
}

let clock = document.getElementById('clock');

function updateClock() {
    clock.innerText = getCurrentTime();
}

updateClock();

setInterval(updateClock, 1000);

function removeLogItem(event) {
    this.remove();
}

let logElement = document.getElementById('log');

logElement.addEventListener('click', (event) => {
    console.log('remove');
    const target = event.target;
    if (target.tagName === 'LI') {
        target.remove();
    }
})

let log = (event) => {
    console.log('second');
};
logElement.addEventListener('click', log)

setTimeout(() => { logElement.removeEventListener('click', log); console.log('removed') }, 5000);

function logTime() {
    // let dateItem = document.createElement('li');
    // dateItem.textContent = getCurrentTime();
    // dateItem.onclick = removeLogItem;
    // logElement.appendChild(dateItem);

    logElement.innerHTML += `<li>${getCurrentTime()}</li>`;
}