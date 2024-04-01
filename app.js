const $ = (selector) => document.querySelector(selector);
// Создаем массив с 30 случайными числами от 0 до 99
let numbers = Array.from({length: 30}, () => Math.floor(Math.random() * 100));

const createTable = () => document.createElement('table');
const createRow = () => document.createElement('tr');

const table = createTable();

for (let i = 0; i < 5; i++) {
    const row = createRow();
    table.insertAdjacentElement('beforeend', row);
    for (let j = 0; j < 6; j++) {
        // Определяем индекс числа в массиве
        let index = i * 6 + j;
        let number = numbers[index];
        // Проверяем условие и цвет ячейки
        let color = number >= 50 ? 'orange' : 'transparent';
        // Выводим ячейку
        row.insertAdjacentHTML('afterbegin', `<td style="background-color: ${color}">${number}</td>`);
    }
}

$('#app').insertAdjacentElement('afterbegin', table);

function addRandomNumber() {
    let number = Math.floor(Math.random() * 100);
    numbers.push(number);

    let table = document.getElementsByTagName('table')[0];
    let rows = table.getElementsByTagName('tr');
    let lastRow = rows[rows.length - 1];
    let lastRowLength = lastRow.getElementsByTagName('td').length;
    // Определяем цвет для числа
    let color = number >= 50 ? 'orange' : 'transparent';
    // Добавляем число в таблицу
    if (lastRowLength <= 5) {
        lastRow.innerHTML += `<td style="background-color: ${color}">${number}</td>`;
    } else {
        table.innerHTML += `<tr><td style="background-color: ${color}">${number}</td></tr>`;
    }
}