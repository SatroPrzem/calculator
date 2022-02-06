const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete'); 
const equalBtn = document.querySelector('.equal'); 
const previousResult = document.querySelector('.previous-calc'); 
const actualResult = document.querySelector('.actual-calc'); 

let actualNumber = '';
let previousNumber = '';
let operation = undefined;

const clearCalculator = () => {
    actualNumber = '';
    previousNumber = '';
    operation = undefined;
};
const chocenOperation = (operator) => {
    if(actualNumber === '') return;
    operation = operator;
    previousNumber = actualNumber;
    actualNumber = '';
}

const updateResult = () => {
    actualResult.innerText = actualNumber;
    previousResult.innerText = previousNumber;
}

const addNumber = (num) => {
    if(num === '•'){
        num = '.'
        if(actualNumber.includes('.')){
            return
        }
        if(actualNumber.length === 0) return
    }
    actualNumber = actualNumber.toString() + num.toString();    
}

const deleteNumber = () => {
    if (actualNumber[actualNumber.length - 1] == '.'){
    actualNumber = actualNumber.slice(0, -2);
    } else {
        actualNumber = actualNumber.slice(0, -1)
    };
};








numbers.forEach((num) => {
    num.addEventListener('click', () => {
        addNumber(num.innerText);
        updateResult();
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () =>{
        console.log('siemaneczko');
    });
});

deleteBtn.addEventListener('click', () => {
    deleteNumber();
    updateResult();
});

clearBtn.addEventListener('click', () => {
    clearCalculator();
    updateResult();
});