import React, { useState } from "react";

const TaskManagementSystem = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [category, setCategory] = useState("");
    const addTask = () => {
        if (taskName && deadline && category) {
            setTasks([
                ...tasks,
                { id: Date.now(), name: taskName, deadline, category, completed: false },
            ]);
            setTaskName("");
            setDeadline("");
            setCategory("");
        }
    };
    const markAsComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
            )
        );
    };
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };
    const progress = () => {
        const completedTasks = tasks.filter((task) => task.completed).length;
        return tasks.length > 0
            ? Math.round((completedTasks / tasks.length) * 100)
            : 0;
    };
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>Task Management System</h1>
            <div>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} style={{ marginBottom: "10px" }}>
                        <strong>{task.name}</strong> - {task.category} - Due:{" "}
                        {task.deadline} -{" "}
                        {task.completed ? (
                            <span style={{ color: "green" }}>Completed</span>
                        ) : (
                            <button onClick={() => markAsComplete(task.id)}>Complete</button>
                        )}
                        <button
                            style={{ marginLeft: "10px", color: "red" }}
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Progress: {progress()}%</h3>
        </div>
    );
};

export default TaskManagementSystem;
