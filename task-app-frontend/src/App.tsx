import React, { useState,useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Task } from './types';
import './App.css';


const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);    
    
    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8080/crud/tasks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred in fetchTasks');
            } finally {
                setLoading(false);
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
    // let timestamp : number;
    // function generateId() {
    //     const now = new Date();
    //     timestamp = now.getTime(); // Get timestamp in milliseconds
    //     //const random = Math.random().toString(36).substring(2, 8); // Add a random string for extra uniqueness
        
    // }
    
    //Update task-app-frontend to toggle task status by calling a task-api endpoint and enhance task-api to handle status updates.
    const toggleTask = async (id: number) => {
        setError(null);
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
            
                if (!response.ok) {
                    throw new Error('Failed to update task');
            }
                const updatedTask: Task = await response.json();
                setTasks(tasks.map(t => t.id === id ? updatedTask : t));
            
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred in toggleTask');
        }
    };
    
   
    // const addTask = async (name : string) =>{
    //     setError(null);
    //     try{
    //         const response= await fetch('http://localhost:8080/crud/tasks',{
    //             method:'POST',
    //             headers:{ 'Content-Type': 'application/json' },
    //             body: JSON.stringify({id:(Math.random() * 10) ,name:name,status:'Pending'})
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to add task');
    //         }
    //         const newTask: Task = await response.json();
    //         setTasks([...tasks, newTask]);
            
    //     }
    //     catch(error){
    //         setError(error instanceof Error ? error.message : 'An error occurred in addTask');
    //     }
    // };
    const addTask = async (name: string) => {
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, status: 'pending' })
            });
            if (!response.ok) throw new Error('Failed to add task');
            const newTask: Task = await response.json();
            setTasks([...tasks, newTask]);
            setError('Task added successfully!');
            setTimeout(() => setError(null), 2000);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const deleteTask= async(id: number)=>{
        setError(null);
        try{
            const response= await fetch(`http://localhost:8080/crud/tasks/${id}`,{
                method:'DELETE'});
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setTasks(tasks.filter(t => t.id !== id));
            
        }
        catch(error){
            setError(error instanceof Error ? error.message : 'An error occurred in deleteTask');
        }
    };


    return (
        <div className="App">
            <h1>Task Manager</h1>
            {error && <div className={error.includes('success') ? 'success' : 'error'}>{error}</div>}
            <TaskForm onAddTask={addTask} />

            {loading ? (
                <div>Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div>No tasks available</div>
            ) : (
                <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
            )}
            
        </div>
    );
};

export default App;

