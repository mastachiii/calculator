// BUTTON STYLING
const numberButtons = document.getElementById('numbers')
    , operatorButtons = document.getElementById('buttons-right')
    , extraButtons = document.getElementById('extra-buttons')
    , displayInput = document.getElementById('input')
    , displayEquation = document.getElementById('equation')
    , display = document.getElementById('display');

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

// CALCULATOR FUNCTIONALITY

let Calculator = {

    leftOperand: '',
    rightOperand: '',
    operation: '',
    mode: 0,
    result: ''
}

function inputNumbers (e){

    if (e.target.tagName != 'BUTTON') return;

    if (Calculator.leftOperand === '' && +e.target.textContent === 0 || Calculator.rightOperand === '' && +e.target.textContent === 0) return;

    switch (Calculator.mode){

        case 0:
            if (String(Calculator.leftOperand).includes('.') && e.target.textContent === '.') return

            if (String(Calculator.leftOperand).length >= 9) return;

            Calculator.leftOperand += e.target.textContent;
            break;

        default:
            if(String(Calculator.rightOperand).includes('.') && e.target.textContent === '.') return;

            if (String(Calculator.rightOperand).length >= 9) return;

            Calculator.rightOperand += e.target.textContent;
    }

    displayInput.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand}`;

    checkResultLength();
}

function useOperators (e){

    if (e.target.tagName != 'BUTTON') return;

    if (e.target.textContent === ' = ' && Calculator.rightOperand != '' || Calculator.leftOperand != '' && Calculator.rightOperand != ''){

        switch (Calculator.operation){

            case '+':
                Calculator.result = +Calculator.leftOperand + +Calculator.rightOperand;
                break;
            
            case '-':
                Calculator.result = Calculator.leftOperand - Calculator.rightOperand;
                break;

            case '×':
                Calculator.result = Calculator.leftOperand * Calculator.rightOperand;
                break;

            case '÷':
                Calculator.result = Calculator.leftOperand / Calculator.rightOperand; 
                break;

            case '%':
                Calculator.result = Calculator.leftOperand % Calculator.rightOperand;
        }

        displayEquation.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand} =`;

        displayInput.textContent = `${Calculator.result}`;

        checkResultLength()

        Calculator.operation = e.target.textContent != ' = ' ? e.target.textContent : Calculator.operation;
        
        Calculator.leftOperand = Calculator.result;
        
        Calculator.rightOperand = '';

        return;
    };

    if (Calculator.leftOperand != '' && e.target.textContent !== ' = '){

        Calculator.operation = '';

        Calculator.operation += e.target.textContent.split(' ').join('');

        Calculator.mode++;

        displayInput.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand}`;
    }

    checkResultLength();
}

function useExtraFunctions (e){

    if (e.target.tagName != 'BUTTON') return;

    switch (e.target.textContent){

        case 'C':
            Calculator.leftOperand = '';
            Calculator.rightOperand = '';
            Calculator.operation = '';
            Calculator.mode = 0;

            break;

        case '+/-':
            if (Calculator.mode === 0){
                Calculator.leftOperand *= -1;
            } else {
                Calculator.rightOperand *= -1;
            }
            
            break;

        case '%':   
            Calculator.operation = ' % ';
            Calculator.mode++;
    }

    displayInput.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand}`;

    checkResultLength();
}

function checkResultLength (){

    console.log(String(displayInput.textContent.split(' ').join('')).length)
    if (String(displayInput.textContent.split(' ').join('')).length >= 6){
        displayInput.style.fontSize = '60px'
    } else{
        displayInput.style.fontSize = '120px'
    }
}


numberButtons.addEventListener('mousedown', inputNumbers);

operatorButtons.addEventListener('mousedown', useOperators);

extraButtons.addEventListener('mousedown', useExtraFunctions);

//KEYBOARD FUNCTIONALITY

document.body.addEventListener('keydown', inputNumbersKeyBoard);

document.body.addEventListener('keydown', useOperatorsKeyBoard);

document.body.addEventListener('keydown', useExtraFunctionsKeyBoard)

function inputNumbersKeyBoard (e){

    if (String(+e.key) === 'NaN' && e.key !== '.') return

    let input = e.key;    

    if (Calculator.leftOperand === '' && +input === 0 || Calculator.rightOperand === '' && +input === 0) return;

    switch (Calculator.mode){

        case 0:
            if (String(Calculator.leftOperand).includes('.') && input === '.') return

            if (String(Calculator.leftOperand).length >= 9) return;

            Calculator.leftOperand += input;
            break;

        default:
            if(String(Calculator.rightOperand).includes('.') && input === '.') return;

            if (String(Calculator.rightOperand).length >= 9) return;

            Calculator.rightOperand += input;
    }

    displayInput.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand}`;

    checkResultLength();
}

function useOperatorsKeyBoard (e){

    let oppArr = ['+', '-', 'x', '/', '%', '='];

    if (!(oppArr.includes(e.key))) return;

    let input = e.key;

    if (input === '=' && Calculator.rightOperand != '' || Calculator.leftOperand != '' && Calculator.rightOperand != ''){

        switch (Calculator.operation){

            case '+':
                Calculator.result = +Calculator.leftOperand + +Calculator.rightOperand;
                break;
            
            case '-':
                Calculator.result = Calculator.leftOperand - Calculator.rightOperand;
                break;

            case 'x':
                Calculator.result = Calculator.leftOperand * Calculator.rightOperand;
                break;

            case '/':
                Calculator.result = Calculator.leftOperand / Calculator.rightOperand; 
                break;

            case '%':
                Calculator.result = Calculator.leftOperand % Calculator.rightOperand;
        }

        displayEquation.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand} =`;

        displayInput.textContent = `${Calculator.result}`;

        checkResultLength()

        Calculator.operation = input != '=' ? input : Calculator.operation;
        
        Calculator.leftOperand = Calculator.result;
        
        Calculator.rightOperand = '';

        return;
    };

    if (Calculator.leftOperand != '' && input !== ' = '){

        Calculator.operation = '';

        Calculator.operation += input;

        Calculator.mode++;

        displayInput.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand}`;
    }

    checkResultLength();
}

function useExtraFunctionsKeyBoard (e){

    if (!(e.key === 'Escape' || e.key === 'Backspace')) return;

    switch (e.key){

        case 'Escape':
            Calculator.leftOperand = '';
            Calculator.rightOperand = '';
            Calculator.operation = '';
            Calculator.mode = 0;

            break;

        case 'Backspace':
            if (Calculator.mode === 0 && Calculator.result !== ''){
                Calculator.leftOperand = String(Calculator.leftOperand).slice(0, -1);
            } else {
                Calculator.rightOperand = String(Calculator.rightOperand).slice(0, -1);
            } 
    }

    displayInput.textContent = `${Calculator.leftOperand} ${Calculator.operation} ${Calculator.rightOperand}`;

    checkResultLength();
}
