import React, { useState } from 'react';
import TaskList from './TaskList';
import { Task } from './types';
import './App.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, name: "Code", status: "pending" },
        { id: 2, name: "Test", status: "done" },
        { id: 3, name: "Deploy", status: "pending" }
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
                : task
        ));
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <TaskList tasks={tasks} onToggle={toggleTask} />
        </div>
    );
};

export default App;

