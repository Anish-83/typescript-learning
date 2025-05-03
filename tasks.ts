interface Task {
    id: number;
    name: string;
    status: string;
}

const tasks: Task[] = [
    { id: 1, name: "Code", status: "pending" },
    { id: 2, name: "Test", status: "done" },
    { id: 3, name: "Deploy", status: "pending" }
];

function getPendingTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => task.status === "pending");
}

console.log(getPendingTasks(tasks));