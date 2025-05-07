import React from 'react';
import { Task } from './types';
import TaskItem from './TaskItem';
import './TaskList.css';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;