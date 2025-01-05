import React, { useState } from 'react'; 
import './index.scss'

function ToDoList() {
  
    const completed = {
        textDecoration: 'line-through'
    };
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [id, setId] = useState(0);
    const [editedTitle, setEditedTitle] = useState("");

    const handleChange = (event) => {
        const updatedTasks = tasks.map(task => 
            task.id === parseInt(event.target.id) ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const AddTask = () => {
        if (newTask.trim() !== "") {
            const taskToAdd = {
                id: id + 1, 
                title: newTask,
                completed: false,
                isEditing: false // Add edit mode flag for each task
            };
            setId(id + 1);
            setTasks([...tasks, taskToAdd]); 
            setNewTask(""); 
        }
    };

    const handleInput = (event) => {
        setNewTask(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            AddTask();
        }
    };

    const handleEditInput = (event) => {
        setEditedTitle(event.target.value);
    };

    const editTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, title: editedTitle, isEditing: false } : task
        );
        setTasks(updatedTasks);
    };

    const toggleEditMode = (taskId, currentTitle) => {
        setEditedTitle(currentTitle); 
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <input onKeyDown={handleKeyPress} type="text" value={newTask} onChange={handleInput} id="add-input" />
            <button onClick={AddTask}>Add Task</button>
            <div>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <input 
                                type="checkbox" 
                                id={task.id} 
                                name="checkbox" 
                                checked={task.completed} 
                                onChange={handleChange} 
                                style={{ visibility: task.isEditing ? "hidden" : "visible" }} 
                            />
                            <span style={task.completed ? completed : {}}>
                                {task.isEditing ? (
                                    <>
                                        <input 
                                            type="text" 
                                            value={editedTitle} 
                                            onChange={handleEditInput} 
                                        />
                                        <button onClick={() => editTask(task.id)}>Submit</button>
                                    </>
                                ) : (
                                    task.title
                                )}
                            </span>
                            <div className="task-buttons">
                                <button className="task-button" onClick={() => deleteTask(task.id)}>🗑️</button>
                                <button className="task-button" onClick={() => toggleEditMode(task.id, task.title)}>🖋️</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoList;
