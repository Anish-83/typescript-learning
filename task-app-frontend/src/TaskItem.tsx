import React from 'react';
import { Task } from './types';
import './TaskItem.css';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    return (
        <li className={`task-item ${task.status === 'done' ? 'done' : ''}`}>
            {task.name} - {task.status}
            <button onClick={() => onToggle(task.id)}>
                {task.status === 'done' ? 'Undo' : 'Complete'}
            </button>
        </li>
    );
};

export default TaskItem;