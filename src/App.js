import "./App.css";
import React, { useState } from "react";

export default function App() {
  const [tasks, setTask] = useState([]);

  const [input, setInput] = useState("");

  function todoComplete(id) {
    setTask(
      tasks.filter((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  }

  function todoDelete(id) {
    setTask(tasks.filter((task) => task.id !== id));
  }

  function addTodoTask(e) {
    if (
      e.code === "Enter" ||
      (e.code === "NumpadEnter" && input.trim() !== "")
    ) {
      setTask(tasks.concat([{ id: Date.now(), title: input }]));
      setInput("");
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={input}
        type="text"
        className="inputText"
        onKeyUpCapture={(e) => addTodoTask(e)}
        onChange={(e) => setInput(e.target.value)}
      />
      {tasks &&
        tasks.map((task) => {
          return (
            <div className="todoList" key={task.id}>
              <input
                type="checkbox"
                onClick={() => todoComplete(task.id)}
                checked={task.completed}
              />
              <div
                className="taskTitle"
                style={{
                  textDecoration: task.completed ? "line-through" : null,
                }}
              >
                {task.title}
              </div>
              <div className="close" onClick={() => todoDelete(task.id)}>
                &#x2716;
              </div>
            </div>
          );
        })}
    </div>
  );
}
