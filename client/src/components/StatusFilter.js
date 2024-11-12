import React from "react";

function StatusFilter({ value, onChange }) {
  return (
    <div className="filters">
      <label>
        Status filter
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">All</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </label>
    </div>
  );
}

export default StatusFilter;
