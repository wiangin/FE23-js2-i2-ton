// Contains get request fuction and call display all tasks.
// Form element with eventlistener, send post request when submit.

import { getTasks, postTask} from "./modules/fetch.js";
import { error } from "./modules/gui.js";
import { displayTask } from "./modules/gui.js";

getTasks()
    .then(task => { displayTask(task) });

const taskForm = document.querySelector('#taskForm');
taskForm.addEventListener('submit', async event => {
    event.preventDefault();

    const taskInput = document.querySelector('#taskInput').value;
    const selectEl = document.querySelector('select');
    const choiceOption = selectEl.options[selectEl.selectedIndex].value;

    postTask(taskInput, choiceOption)
        .then(() => { getTasks().then(displayTask) })
        .catch(error)

        taskForm.reset();
})

