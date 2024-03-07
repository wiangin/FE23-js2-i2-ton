// Fetch functions get patch post delete requests

const header = { "Content-type": 'application/json; charset=UTF-8'};

async function getTasks(){
    const url = `http://localhost:4000/tasks`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function postTask(task,category){  

    if(task !== ''){
        const url = `http://localhost:4000/tasks`;
        
        const content = {
            task: task,
            category: category
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(content),
            headers: header
        }

        const res = await fetch(url, options);
        const data = await res.json();
    }

    else{
        throw new Error('Input field can not be empty.');
    }   
}

async function patchAssignTo(id, assignTo){
    
    if(assignTo !== '' ){
     
        const url = `http://localhost:4000/tasks/assign`;

        const content = {
            id: id,
            assign: assignTo
        }
        
        const options = {
            method: 'PATCH',
            body: JSON.stringify(content),
            headers: header
        }
    
        const res = await fetch(url, options);
        const data = await res.json();
    }
    else{
        throw new Error('Input field can not be empty.');
    } 
}

async function patchDoneTask(id){
    
        const url = `http://localhost:4000/tasks/done`;

        const content = {
            id: id
        }
        
        const options = {
            method: 'PATCH',
            body: JSON.stringify(content),
            headers: header
        }
    
        const res = await fetch(url, options);
        const data = await res.json();
}

async function deleteTask(id){

    const url = `http://localhost:4000/tasks?id=${id}`;

    const options = {
        method: 'DELETE',
        headers: header
    }

    const res = await fetch(url, options);
    const data = await res.json();
}

export{getTasks, postTask, patchAssignTo,patchDoneTask, deleteTask}