// BUTTON STYLING
const numberButtons = document.getElementById('numbers')
    , operatorButtons = document.getElementById('buttons-right')
    , extraButtons = document.getElementById('extra-buttons')
    , displayInput = document.getElementById('display');


numberButtons.addEventListener('mousedown', changeColorDown);
numberButtons.addEventListener('mouseup', changeColorUp);
numberButtons.addEventListener('mouseout', changeColorUp);

operatorButtons.addEventListener('mousedown', changeColorDown);
operatorButtons.addEventListener('mouseup', changeColorUp);
operatorButtons.addEventListener('mouseout', changeColorUp);

extraButtons.addEventListener('mousedown', changeColorDown);
extraButtons.addEventListener('mouseup', changeColorUp);
extraButtons.addEventListener('mouseout', changeColorUp);

function changeColorDown (e){
    
    switch (e.target.parentElement.id){

        case 'numbers':
            e.target.style.backgroundColor = '#fbfaf9';
            // test.append(e.target.textContent)
            break;

        case 'buttons-right':
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.color = '#ff9f06';
            break;

        case 'extra-buttons':
            e.target.style.backgroundColor = '#fbfaf9';
            break;
    }
}

function changeColorUp (e){
    
    switch (e.target.parentElement.id){

        case 'numbers':
            e.target.style.backgroundColor = '#333333';
            break;

        case 'buttons-right':
            e.target.style.backgroundColor = '#ff9f06';
            e.target.style.color = '#ffffff';
            break;

        case 'extra-buttons':
            e.target.style.backgroundColor = '#a5a5a5';
            break;
    }
}

// CALCULATOR OBJ

let Calculator = {

    values:{
        
        leftOperand: '',
        rightOperand: '',
        equation: '',
        result: 0
    },

    operators:{
        
        add: 0,
        subtract: 0,
        multiply: 0,
        divide: 0,
    }
}


numberButtons.addEventListener('mousedown', foo);
operatorButtons.addEventListener('mousedown', foo);
extraButtons.addEventListener('mousedown', foo)

// DETERMINES IF LEFT OR RIGHT HAND OPERAND GETS CHANGED

let mode = 0
  , operation;


function foo (e){

    let currentNum = String(+e.target.textContent) != 'NaN' ? e.target.textContent : null
      , currentOp = String(+e.target.textContent) === 'NaN' ? e.target.textContent.split(' ').join('') : null;

    if (currentNum != null){

        switch (mode){

            case 0:
                Calculator.values.leftOperand += currentNum;
                Calculator.values.equation += currentNum;
                break;

            default:
                Calculator.values.rightOperand += currentNum;
                Calculator.values.equation += currentNum;
        }

    } else if (Calculator.values.leftOperand != '' && currentOp != '='){

        operation = currentOp;
        mode = 1;
        Calculator.values.equation += e.target.textContent;

    }

    displayInput.textContent = Calculator.values.equation;

    if (currentOp === '=') getResult(operation);
}

function getResult (operator){

    switch (operator){

        case '+':
            Calculator.values.result = +Calculator.values.leftOperand + +Calculator.values.rightOperand;
            break;
            
        case '-':
            Calculator.values.result = +Calculator.values.leftOperand - Calculator.values.rightOperand;
            break;

        case '×':
            Calculator.values.result = +Calculator.values.leftOperand * Calculator.values.rightOperand;
            break;
        
        case '÷':
            Calculator.values.result = +Calculator.values.leftOperand / +Calculator.values.rightOperand;
    }

    displayInput.textContent = Calculator.values.result;
}