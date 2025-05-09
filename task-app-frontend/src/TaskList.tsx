import React from 'react';
import { Task } from './types';
import TaskItem from './TaskItem';
import './TaskList.css';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => {
    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} />
            ))}
        </ul>
    );
};

export default TaskList;