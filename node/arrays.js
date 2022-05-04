// # Створення

// - Пустий
[];
new Array();

// - # Заповнений
[1, 2];
new Array(3);
new Array(5).fill(0);

// - З рядка
'red green blue'.split(' ');
'hello'.split('');

// # Довжина та індекс
[1, 2].length;
let numbers = [1, 2, 3];
numbers[0];
numbers[2] = 10;

// # Обхід
// - for loop
for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    console.log(element);
}

// - foreach loop
for (let element of numbers) {
    console.log(element);
}

// - forEach method
numbers.forEach(element => {
    console.log(element);
});

// # Додавання на видалення елементів

// стек
numbers.push(5);
numbers.pop();

numbers.shift(); // черга
numbers.unshift(30);

// # Пошук
numbers.indexOf(0);
numbers.indexOf(30);

// # Сортування
numbers.sort();
let users = [
    { id: 5, name: 'Bob' },
    { id: 4, name: 'Alex' },
    { id: 6, name: 'John' },
];
users.sort((a, b) => a.id - b.id);

// # Заміна
numbers.splice(1, 1);
numbers.splice(1, 0, 40, 50);

// # Базові методи обробки даних
// - filter
// - map
// - reduce

// # Методи для зручності
// - join
// - slice
