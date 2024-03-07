// Fucntions to listen after get post patch and delete http request

import express from "express";
import cors from "cors";
import { getTask, addTask, patchTask, deleteTask} from "./handledb.js";
import {body, validationResult} from "express-validator";

const app = express();
app.use(cors());
app.use(express.json());

// Validations start\\
const postValidations = [
    body('category').exists().isIn(['ux', 'dev backend', 'dev frontend']),
    body('task').exists().isString(),

];
const patchAssignValidations = [
    body('assign').exists().isString(),
    body('id').exists().isNumeric()
];
const patchDoneValidations = [
    body('id').exists().isNumeric()
];
// Validations end\\

// Requests start\\
app.get('/tasks', async (req, res) => {
    
    const tasks = await getTask();
    res.json(tasks);
})

app.post('/tasks', postValidations, async (req,res) => {
    
    const errors = validationResult(req);

    if(errors.array().length > 0){
        res.status(400).json({message: 'Wrong format'});
    }
    else{
        await addTask(req.body);
        res.json(req.body);
    }
})

app.patch('/tasks/assign', patchAssignValidations, async(req,res) => {

    const errors = validationResult(req);

    if(errors.array().length > 0){
        res.status(400).json({message: 'Wrong format'});
    }
    else{
        await patchTask(req.body);
        res.json(req.body);
    }
})

app.patch('/tasks/done', patchDoneValidations, async(req,res) => {

    const errors = validationResult(req);

    if(errors.array().length > 0){
        res.status(400).json({message: 'Wrong format'});
    }
    else{
        await patchTask(req.body);
        res.json(req.body);
    }
})

app.delete('/tasks', (req, res) => {

    deleteTask(req.query);
    res.json({message: 'Delete'});
})
// Requests end\\

export{app};    
