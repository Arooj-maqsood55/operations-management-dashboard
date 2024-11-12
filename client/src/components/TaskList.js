import React from "react";

function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p className="muted">No tasks match the current filter.</p>;
  }

  return (
    <section className="card">
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id || task.title}>
            <strong>{task.title}</strong>
            <span className={`badge ${task.status}`}>{task.status}</span>
            <p>{task.description || "No description"}</p>
            <small>Owner: {task.owner}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
