
import React, { useState } from 'react'; 
import './index.scss'

function ToDoList() {
  
    //css variable
    const completed = {
        textDecoration: 'line-through'
    };
    const [tasks, setTasks] = useState([{id:555,title:"eat",completed:false}]);
    const [newTask,setNewTask] = useState("")
    const handleChange = (event) => {
        const updatedTasks = tasks.map(task => 
            task.id === parseInt(event.target.id) ? {...task, completed: !task.completed} :task
        );
        setTasks(updatedTasks);
    };
    const deleteTask = (id) =>{
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);
    }
    const [id,setId] = useState(0)
    const AddTask = () => {
        if (newTask.trim() !== "") {
            const taskToAdd = {
                id: id +1, 
                title: newTask,
                completed: false,
            };
            setId(id +1)
            setTasks([...tasks, taskToAdd]); 
            setNewTask(""); 
        }
    };
    const handleInput = (event) =>{
        
        setNewTask(event.target.value)
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            AddTask();
        }
    };
    const [textArea, setTextArea] = useState(false);
   
    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <input   onKeyDown={handleKeyPress} type="text" value={newTask}  onChange={handleInput}  id="add-input" />
            <button  onClick={AddTask}>Add Task</button>
            <div>
                <ul >
                    {tasks.map((task)=>(
                        <li key={task.id}>
                           
                            <input type="checkbox" id={task.id} name="checkbox" checked={task.completed} onChange={handleChange}   />
                            
                            <span style={task.completed ? completed : {}}> {textArea ? <><input type="textArea" value={task.title}/> <button onClick="">submit</button></> : task.title}</span>
                            <div className="task-buttons">
                <button className="task-button" onClick={() => deleteTask(task.id)}>🗑️</button>
                <button className="task-button" onClick={() => setTextArea(true)}>🖋️</button>
            </div>

                        </li>
                       

                    ))}
                </ul>
            </div>

        </div>
    );
}

export default ToDoList;