import React, { useState } from "react";

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("Arooj Maqsood");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await onCreate({ title, owner, status, description });
      setTitle("");
      setDescription("");
      setMessage("Task created.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>New task</h2>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Owner
        <input value={owner} onChange={(e) => setOwner(e.target.value)} required />
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="in_progress">In progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </label>
      <button type="submit">Create task</button>
      {message && <p className="muted">{message}</p>}
    </form>
  );
}

export default TaskForm;
