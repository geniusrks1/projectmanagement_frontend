// src/components/TaskForm.js
import React, { useState } from 'react';
import styles from './TaskForm.module.css';

function TaskForm({ setTasks, setShowForm }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      _id: Date.now().toString(), // Temporary ID
      title,
      priority,
      dueDate: dueDate || null,
      status: 'to-do', // Default status
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle('');
    setPriority('Low');
    setDueDate('');
    setShowForm(false); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
