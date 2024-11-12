//TASK1
function messageCalculation(quantity, price) {
    const totalPrice = price * quantity;
    return `Ви замовили ${quantity} дроїдів, що коштує ${totalPrice} кредитів`;
}

function calculate(event) {
    event.preventDefault();

    const quantity = parseInt(document.querySelector('#quantity').value);
    const price = parseInt(document.querySelector('#price').value);

    if (quantity <= 0 || price <= 0 ) {
        document.getElementById('message').textContent = 'Значення введено некоректно';
    }
    else{
        document.getElementById('message').textContent = messageCalculation(quantity, price);
    }
}





//TASK2

function checkForSpam(message){
    const textLower = message.toLowerCase();
    return textLower.includes('sale') || textLower.includes('spam');
}

function checkMessage(event){
    event.preventDefault();
    const text = document.getElementById('textMessage').value;
    document.getElementById('result').textContent = checkForSpam(text).toString();

}





//TASK3
function filterArray(numbers, value){
    const newArray = [];
    for(let number of numbers){
        if(number>value){
            newArray.push(number);
        }
    }
    return newArray;
}

function filterFunction(event) {
    event.preventDefault();
    const valueInput = document.getElementById('number').value;
    const value = parseInt(valueInput);

    if (isNaN(value)) {
        document.getElementById('resultArray').textContent = "Будь ласка, введіть коректне число для фільтрації.";
        return;
    }


    const numbersInput = document.getElementById('textArray').value;
    const numbersArray = numbersInput.split(',').map(num => num.trim());
    const isValidArray = numbersArray.every(num => !isNaN(num));

    if (!isValidArray) {
        document.getElementById('resultArray').textContent = "Масив містить некоректні значення. Будь ласка, введіть тільки цифри через кому.";
        return;
    }

    const numbers = numbersArray.map(Number);

    const result = filterArray(numbers, value);

    if (result.length === 0) {
        document.getElementById('resultArray').textContent = "Не має чисел більших за введене значення";
    } else {
        document.getElementById('resultArray').textContent = `Відфільтрований масив [ ${result.join(', ')} ]`;
    }
}






//TASK4
function createArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 101) - 50);
    }
    return array;
}

function findMaxEvenValue(array) {
    let maxEven = null;
    for (let num of array) {
        if (num % 2 === 0 && (maxEven === null || num > maxEven)) {
            maxEven = num;
        }
    }
    return maxEven;
}

function findMinEvenIndexValue(array) {

    let minEvenIndex = array[0];
    for (let i = 0; i < array.length; i += 2) {
        if (array[i] < minEvenIndex) {
            minEvenIndex = array[i];
        }
    }
    return minEvenIndex;
}

function swapElements(array, maxEven, minEvenIndex) {
    const maxIndex = array.indexOf(maxEven);
    const minIndex = array.indexOf(minEvenIndex);
    if (maxIndex !== -1 && minIndex !== -1) {
        [array[maxIndex], array[minIndex]] = [array[minIndex], array[maxIndex]];
    }
    return array;
}

function insertionSort(array) {

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
    }
    return array;
}

function processArray(event) {
    event.preventDefault();

    const length = parseInt(document.getElementById('arrayLength').value);

    const inputArray = createArray(length);
    document.getElementById('inputArray').textContent = `Вхідний масив: [${inputArray.join(', ')}]`;

    const maxEven = findMaxEvenValue(inputArray);
    const minEvenIndex = findMinEvenIndexValue(inputArray);


    const outputArray = swapElements([...inputArray], maxEven, minEvenIndex);
    document.getElementById('outputArray').textContent = `Масив після заміни: [${outputArray.join(', ')}]`;

    const sortedArray = insertionSort([...outputArray]);
    document.getElementById('sortedArray').textContent = `Відсортований масив: [${sortedArray.join(', ')}]`;
}






//TASK5
function validateForm(event) {
    event.preventDefault();

    const intField = document.getElementById('intField').value.trim();
    const floatField = document.getElementById('floatField').value.trim();
    const dateField = document.getElementById('dateField').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    // Перевірка цілого числа
    const intError = document.getElementById('intError');
    if (!/^-?\d+$/.test(intField)) {
        intError.textContent = "Будь ласка, введіть коректне ціле число.";
        isValid = false;
    } else {
        intError.textContent = "";
    }

    // Перевірка дійсного числа
    const floatError = document.getElementById('floatError');
    if (!/^-?\d+(\.\d+)?$/.test(floatField)) {
        floatError.textContent = "Будь ласка, введіть коректне дійсне число.";
        isValid = false;
    } else {
        floatError.textContent = "";
    }

    // Перевірка дати
    const dateError = document.getElementById('dateError');
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateField) || !isValidDate(dateField)) {
        dateError.textContent = "Будь ласка, введіть коректну дату у форматі DD.MM.YYYY.";
        isValid = false;
    } else {
        dateError.textContent = "";
    }

    // Перевірка пароля
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password === "") {
        passwordError.textContent = "Пароль обов'язковий.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    // Перевірка підтвердження паролю
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Паролі не співпадають.";
        isValid = false;
    } else {
        confirmPasswordError.textContent = "";
    }

    // Якщо форма пройшла перевірку, вивести повідомлення
    if (isValid) {
        document.getElementById('formStatus').textContent = "Форма успішно пройдена!";
    } else {
        document.getElementById('formStatus').textContent = "Будь ласка, виправте помилки у формі.";
    }
}

// Перевірка дати на реальність
function isValidDate(dateString) {
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
}