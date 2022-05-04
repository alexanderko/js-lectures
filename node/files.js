const fs = require('fs');
const path = require('path');

let empPath = process.argv[2];
let horizon = process.argv[3] || 1;

console.time('file read');
fs.readFile(empPath, { encoding: 'utf8' }, (err, data) => {
    console.timeEnd('file read');
    if (err) {
        console.error(err);
        return;
    }

    let employees = data
        .split('\n')
        .filter(Boolean)
        .map(line => line.split(','))
        .map(([name, birthday]) => ({ name, birthday }));

    planBirthdays(employees, horizon);
});

function planBirthdays(employees, horizon) {
    employees.forEach(e => console.log(e));
}
