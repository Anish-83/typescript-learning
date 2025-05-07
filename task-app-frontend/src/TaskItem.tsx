import React from 'react';
import { Task } from './types';
import './TaskItem.css';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <li className={`task-item ${task.status === 'done' ? 'done' : ''}`}>
            {task.name} - {task.status}
        </li>
    );
};

export default TaskItem;