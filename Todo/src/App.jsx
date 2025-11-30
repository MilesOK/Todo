import { useState} from 'react'

function App() {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("");
  

  //Makes the input value visible
  function handleInputValue (e) {
    setNewTask(e.target.value)
  }

  //Adds new task
  const AddTask = () => {
    setTasks(t => [...t, newTask])
    setNewTask("")
  }

  //handles the delete of any list item
  function handleDelete(index) {
    const newItems = tasks.filter((_, i) => i !== index)
    setTasks(newItems)
  }
  return (
    <>
      <div className="app-container">
        <div className="todo-box">
          <h1 className='title'>Todo</h1>
          <input className='input-row' type="text" placeholder='Enter a todo' value={newTask}
            onChange={handleInputValue}/>
          <button className='add-btn' onClick={AddTask}>Add</button>
        </div>       
          <ul>
            {tasks.map((task, index) => <li key={index}>{task}
              <button onClick={() => handleDelete(index)}>delete</button>
            </li>)}
          </ul>
      </div>
    </>
  )
}

export default App
