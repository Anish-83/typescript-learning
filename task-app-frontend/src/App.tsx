import React, { useState,useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Task } from './types';
import './App.css';
import { timeStamp } from 'console';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8080/crud/tasks');
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    // const toggleTask = (id: number) => {
    //     setTasks(tasks.map(task =>
    //         task.id === id ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
    //             : task
    //     ));
    // };
    function generateId() {
        const now = new Date();
        const timestamp = now.getTime(); // Get timestamp in milliseconds
        //const random = Math.random().toString(36).substring(2, 8); // Add a random string for extra uniqueness
        return `${timestamp}`;
    }
    
    //Update task-app-frontend to toggle task status by calling a task-api endpoint and enhance task-api to handle status updates.
    const toggleTask = async (id: number) => {
        try {
            const task = tasks.find(t => t.id === id);
            if (!task) return;
            const newStatus = task.status === 'done' ? 'pending' : 'done';
            const response = await fetch(`http://localhost:8080/crud/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id:task.id,
                    name:task.name,
                    status: newStatus })
                });
            
                if (response.ok) {
                const updatedTask: Task = await response.json();
                setTasks(tasks.map(t => t.id === id ? updatedTask : t));
            }
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };
    
    
    const addTask = async (name : string) =>{
        try{
            const response= await fetch('http://localhost:8080/crud/tasks',{
                method:'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({name:name,status:'Pending'})
            });
            if (response.ok) {
                const newTask: Task = await response.json();
                setTasks([...tasks, newTask]);
            }
        }
        catch(error){
             console.error('Error adding task:', error);
        }
    };


    return (
        <div className="App">
            <h1>Task Manager</h1>
            <TaskList tasks={tasks} onToggle={toggleTask} />
            <TaskForm onAddTask={addTask} />
        </div>
    );
};

export default App;

