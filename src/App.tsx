import React, { useState } from "react";
import "./App.css";

interface Task {
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"All" | "Active" | "Complited">("All");
  const [value, setValue] = useState<string>("");

  const addTask = () => {
    if (value.trim()) {
      setTasks([...tasks, { text: value, completed: false }]);
      setValue("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  
  return (
    <div className="todos">
      <h1 className="todos__title">todos</h1>
      <div className="todos__wrapper">
        <input
          className="todos__input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="What need to be done?"
          required
        />
        <ul className="list">
          {filter == "All" &&
            tasks.map((task, index) => (
              <li
                className="list__item"
                key={index}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <input
                  className="list__item_checkbox"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                />
                {task.text}
              </li>
            ))}

          {filter == "Complited" &&
            tasks
              .filter((task) => task.completed)
              .map((task, index) => (
                <li
                  className="list__item"
                  key={index}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <input
                    className="list__item_checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                  />
                  {task.text}
                </li>
              ))}

          {filter == "Active" &&
            tasks
              .filter((task) => !task.completed)
              .map((task, index) => (
                <li
                  className="list__item"
                  key={index}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <input
                    className="list__item_checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                  />
                  {task.text}
                </li>
              ))}
        </ul>
        <footer className="footer">
          <h3 className="footer__info">{tasks.filter((task) => !task.completed).length} items left</h3>
          <div className="filters">
            <button className="footer__btn" onClick={() => setFilter("All")}>
              All
            </button>
            <button className="footer__btn" onClick={() => setFilter("Active")}>
              Active
            </button>
            <button
              className="footer__btn"
              onClick={() => setFilter("Complited")}
            >
              Completed
            </button>
          </div>
          <button className="footer__btn" onClick={clearCompleted}>
            Clear complited
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
