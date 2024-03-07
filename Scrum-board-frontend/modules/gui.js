// Fucntions to display error message and display all tasks.
// Fuctions to create elememts. 
// Fuctions to create form and call patch assignTo request
// Fuctions to create done button and and call  patchDone request
// Fuctions to create delete button and call delete request.

import { patchAssignTo ,getTasks, deleteTask, patchDoneTask} from "./fetch.js";

function displayTask(tasks){
    const toDoDiv = document.querySelector('#toDoDiv');
    const inProgressDiv = document.querySelector('#inProgressDiv');
    const doneDiv = document.querySelector('#doneDiv');

    toDoDiv.innerHTML = '';
    inProgressDiv.innerHTML = '';
    doneDiv.innerHTML = '';

    for(const item of tasks){
        const taskCardDiv = document.createElement('div');
        const developerName = item.assign;
   
        taskCardDiv.id = item.id;
        createAndAppendElement('h4', taskCardDiv , item.task);
       
        if(item.category === 'dev frontend')taskCardDiv.classList.add('frontendDivStyle');
        else if( item.category === 'dev backend' ) taskCardDiv.classList.add('backendDivStyle');
        else if(item.category === 'ux') taskCardDiv.classList.add('uxDivStyle');

        if(item.progress === 'in progress'){
            createDeloverName(developerName, taskCardDiv);
            createDoneButton(taskCardDiv);
            createForm(taskCardDiv).remove();

            inProgressDiv.append(taskCardDiv);
        }
        else if(item.progress === 'done'){
            createDeloverName(developerName, taskCardDiv);
            createDeleteButton(taskCardDiv);

            doneDiv.append(taskCardDiv);
        }
        else{
            createForm(taskCardDiv);
            
            toDoDiv.append(taskCardDiv);    
        }
    }  
}

function createAndAppendElement(type,container,content){
    const element = document.createElement(type);

    element.innerText = content;
    container.append(element);

    return element;
}

function createForm(taskCardDiv){
    
    const form = document.createElement('form');
    const assignInput = document.createElement('input');
    const button = document.createElement('button');

    assignInput.type = 'text';
    assignInput.placeholder = 'Name';
    assignInput.required = true;
    button.innerText = 'Assign>>';
    form.append(assignInput,button);

    taskCardDiv.append(form);

    form.addEventListener('submit', event => {
        event.preventDefault();
        
        patchAssignTo(taskCardDiv.id, assignInput.value)
            .then(() => { getTasks().then(displayTask) })
            .catch(error)
    })

    return form;
}

function createDoneButton(taskCardDiv){
  
    const btn = document.createElement('button');

    btn.innerText = 'Done >>';
    taskCardDiv.append(btn);

    btn.addEventListener('click', () => {
        patchDoneTask(taskCardDiv.id)
            .then(() => { getTasks().then(displayTask)} )
    })

    return btn;
}

function createDeleteButton(taskCardDiv){
    const btn = document.createElement('button');

    btn.innerHTML = 'Remove' + ' &#x2717;';
    taskCardDiv.append(btn);

    btn.addEventListener('click', event => {
        deleteTask(taskCardDiv.id)
            .then(() => { getTasks().then(displayTask) })
    })

    return btn;
}

function createDeloverName(name, taskCardDiv){
    const h4EL = document.createElement('h4');

    h4EL.innerText = `--${name}`;
    taskCardDiv.append(h4EL);

    return h4EL;
}

function error(error){
    const dialogEl = document.querySelector('#myDialog');
    const messageDiv = document.querySelector('#errorMessage');
    const closeBtn = document.querySelector('#closeBtn');
    const h3El = document.createElement('h3');

    messageDiv.innerHTML = '';
    h3El.innerText = error.message;
    dialogEl.showModal(h3El);

    messageDiv.append(h3El, closeBtn);
    dialogEl.append(messageDiv);

    closeBtn.addEventListener('click', () => {
        dialogEl.close();
    })
};

export{
    displayTask,
    createForm,
    createAndAppendElement, 
    createDeloverName, 
    createDoneButton,
    createDeleteButton,
    error
}