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

const calculate = () => {
    let calculation = '';
    if(!previousNumber || !actualNumber) return;
    const actual = parseFloat(actualNumber);
    const prev = parseFloat(previousNumber);
    if(isNaN(actual)  || isNaN(prev)) return;

    switch(operation) {
        case '+':
            calculation = prev + actual;
            break;
        case "-":
            calculation = prev - actual;
            break;
        case "×":
            calculation = prev * actual;
            break;
        case "÷" :
            if(actual === 0){
                clearCalculator();
                return;
            } 
            calculation = prev / actual;
            break;
        case "√" : 
            calculation = Math.pow(prev, 1/actual);
            break; 
        case "^" : 
            calculation = Math.pow(prev, actual);
            break;
        case "%" : 
            calculation = prev / 100 * actual;
            break;
        case "log" :
            if(actual === 1){
                clearCalculator();
                return;
            }
            calculation = Math.log(prev) / Math.log(actual); 
            break;
        default:return;
    }

    actualNumber = calculation.toString();
    operation = undefined;
    previousNumber = '';
}

const clearCalculator = () => {
    actualNumber = '';
    previousNumber = '';
    operation = undefined;
};
const chooseOperation = (operator) => {
    if(actualNumber === '') return;
    if (previousResult !== '') {
        const prev = previousResult.innerText;
        if(actualNumber.toString() === "0" && prev[prev.length -1 ] === "÷") {
            clearCalculator();
            return;
        }
        if(actualNumber.toString() === "1" && prev[prev.length -1 ] === "g") {
            clearCalculator();
            return;
        }
        calculate();
    }
    operation = operator;
    previousNumber = actualNumber ;
    actualNumber = '';
}

const updateResult = () => {
    actualResult.innerText = actualNumber;
    if (operation != null) previousResult.innerHTML = previousNumber  + operation;
    else previousResult.innerText = ''

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
    operator.addEventListener('click', () => {
        chooseOperation(operator.innerText);
        updateResult();
    })
});

deleteBtn.addEventListener('click', () => {
    deleteNumber();
    updateResult();
});

clearBtn.addEventListener('click', () => {
    clearCalculator();
    updateResult();
});

operators.forEach((op) => {
    op.addEventListener('click', () => {
        chooseOperation(op.innerText);
        updateResult();
    })
})

equalBtn.addEventListener('click', () => {
    calculate();
    updateResult();
})