import React from "react";
import { useState } from "react";
import "./TaskForm.css";

interface TaskFormProps{
    onAddTask:(name: string) => void;
}

const TaskForm : React.FC<TaskFormProps>= ({onAddTask}) =>{
    const [taskName,setTaskName] = useState('');

    const handleSubmit= (e:React.FormEvent) =>{
        e.preventDefault();
        if(taskName.trim()){
             onAddTask(taskName);
            setTaskName('');
        }

    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                placeholder="Enter task name"
            />
            <button type="submit">Add Task</button>
        </form>
    );

};


export default TaskForm;