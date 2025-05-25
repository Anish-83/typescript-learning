import React from 'react';
import { Task } from './types';
import './TaskItem.css';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete}) => {
    return (
        <li className={`task-item ${task.status === 'done' ? 'done' : ''}`}>
            {task.name} - {task.status}
            <button onClick={() => onToggle(task.id)}>
                {task.status === 'done' ? 'Undo' : 'Complete'}
            </button>
             <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;