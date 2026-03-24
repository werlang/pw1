const inputNumber = document.querySelector('#input-numero');
const buttonAddNumber = document.querySelector('#btn-adicionar');
const buttonClearNumbers = document.querySelector('#btn-limpar');
const messageNumber = document.querySelector('#mensagem');
const numbersList = document.querySelector('#lista-numeros');
const totalCount = document.querySelector('#quantidade');
const totalSum = document.querySelector('#soma');
const averageValue = document.querySelector('#media');
const highestValue = document.querySelector('#maior');
const lowestValue = document.querySelector('#menor');

const numberArray = [10, 7, 5];

function renderNumbers() {
    numbersList.innerHTML = '';

    numberArray.forEach(function(number) {
        numbersList.innerHTML += `<li>${number}</li>`;
    });

    if (numberArray.length === 0) {
        totalCount.textContent = '0';
        totalSum.textContent = '0';
        averageValue.textContent = '0';
        highestValue.textContent = '0';
        lowestValue.textContent = '0';
        return;
    }

    const sum = numberArray.reduce(function(accumulator, number) {
        return accumulator + number;
    }, 0);

    let highest = numberArray[0];
    let lowest = numberArray[0];

    numberArray.forEach(function(number) {
        if (number > highest) {
            highest = number;
        }

        if (number < lowest) {
            lowest = number;
        }
    });

    totalCount.textContent = numberArray.length;
    totalSum.textContent = sum.toFixed(1);
    averageValue.textContent = (sum / numberArray.length).toFixed(2);
    highestValue.textContent = highest.toFixed(1);
    lowestValue.textContent = lowest.toFixed(1);
}

buttonAddNumber.addEventListener('click', function() {
    const numberValue = Number(inputNumber.value);

    if (inputNumber.value === '' || Number.isNaN(numberValue)) {
        messageNumber.textContent = 'Digite um número válido.';
        inputNumber.focus();
        return;
    }

    numberArray.push(numberValue);
    messageNumber.textContent = `O valor ${numberValue} foi adicionado.`;
    inputNumber.value = '';
    inputNumber.focus();
    renderNumbers();
});

buttonClearNumbers.addEventListener('click', function() {
    numberArray.length = 0;
    messageNumber.textContent = 'Todos os valores foram removidos.';
    renderNumbers();
});

renderNumbers();