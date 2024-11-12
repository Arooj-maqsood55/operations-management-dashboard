import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import StatusFilter from "./components/StatusFilter";

const API = "/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks(nextStatus = status) {
    setLoading(true);
    setError("");
    try {
      const query = nextStatus ? `?status=${encodeURIComponent(nextStatus)}` : "";
      const response = await fetch(`${API}${query}`);
      if (!response.ok) {
        throw new Error("Failed to load tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(payload) {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error || "Unable to create task");
    }
    await loadTasks();
  }

  return (
    <div className="page">
      <header>
        <h1>Operations Management Dashboard</h1>
        <p>Track task workflows, filter by status, and keep imports clean.</p>
      </header>
      <StatusFilter
        value={status}
        onChange={(value) => {
          setStatus(value);
          loadTasks(value);
        }}
      />
      <TaskForm onCreate={handleCreate} />
      {loading && <p className="muted">Loading tasks...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
