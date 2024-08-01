// BUTTON STYLING
const numberButtons = document.getElementById('numbers')
    , operatorButtons = document.getElementById('buttons-right')
    , extraButtons = document.getElementById('extra-buttons')
    , test = document.getElementById('text');


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
            test.append(e.target.textContent)
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






