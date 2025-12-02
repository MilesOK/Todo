import { useState, useEffect, useRef } from "react";

function App() {
  // Load saved tasks on first render
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const inputRef = useRef();

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputValue(e) {
    setNewTask(e.target.value);
  }

  const AddTask = () => {
    if (!newTask.trim()) {
      alert("Enter a todo");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
    };

    setTasks(t => [...t, newItem]);
    setNewTask("");
    inputRef.current?.focus();
  };

  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="title">Todo</h1>

        <input
          ref={inputRef}
          className="input-row"
          type="text"
          placeholder="Enter a todo"
          value={newTask}
          onChange={handleInputValue}
          onKeyDown={(e) => e.key === "Enter" && AddTask()}
        />

        <button className="add-btn" onClick={AddTask}>Add</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDelete(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
