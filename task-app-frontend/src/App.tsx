import React from 'react';
import TaskList from './TaskList';
import { Task } from './types';
import './App.css';

const App: React.FunctionComponent= () => {
  const tasks: Task[] = [
      { id: 1, name: "Code", status: "pending" },
      { id: 2, name: "Test", status: "done" },
      { id: 3, name: "Deploy", status: "pending" }
  ];

  return (
      <div className="App">
          <h1>Task Manager</h1>
          <TaskList tasks={tasks} />
      </div>
  );
};

export default App;