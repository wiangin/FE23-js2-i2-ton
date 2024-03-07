//Fucntions to read and write to databse (db.json).
//Fucntions to get add patch and deltete tasks.

import fs from "fs/promises";

async function readDB(){
    const raw = await fs.readFile('./src/db.json');
    const db = JSON.parse(raw);
    return db;
}

async function writeDB(db){
    const newDB = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', newDB);
}

function getTask(){
    const dataBase = readDB();
    const tasks = dataBase;
    return tasks;
}

async function addTask(newObj){
    
    const tasks = await getTask();
    const newTask = {}

    newTask.task = newObj.task;
    newTask.category = newObj.category;
    newTask.id = Date.now();
    newTask.progress = 'to do';
    newTask.assign = '';

    tasks.push(newTask);

    const newDataBase = tasks;
    await writeDB(newDataBase);
}

async function patchTask(taskToPatch){
    const tasks = await getTask();
    
    for(const item of tasks){
        if (item.id === Number(taskToPatch.id)) {
            if(item.progress === 'to do'){
                item.progress = 'in progress';
                item.assign = taskToPatch.assign;

                const newDataBase = tasks;
                await writeDB(newDataBase);
            }
            else if(item.progress === 'in progress'){
                
                item.progress = 'done';

                const newDataBase = tasks;
                await writeDB(newDataBase);
            }
        }
    }
}

async function deleteTask(taskToDelete){
    const tasks = await getTask();
    
    for(const item of tasks){
        if(item.id === Number(taskToDelete.id)){
            console.log(item);

            const newTaskList = tasks.filter(task => task !== item);

            const newDataBase = newTaskList;
            await writeDB(newDataBase);
        }
    }
}   
export{getTask, addTask, patchTask, deleteTask}