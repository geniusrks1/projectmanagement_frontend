// src/components/TaskCard.js
import React, { useState } from 'react';
import styles from './TaskCard.module.css';

function TaskCard({ task, setTasks }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Task: ${task.title}, Priority: ${task.priority}`
    );
    alert('Task link copied to clipboard!');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === task._id ? editedTask : t))
    );
    setEditMode(false);
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.cardHeader}>
        <h3>{task.title}</h3>
        <button onClick={toggleMenu}>⋮</button>
        {menuVisible && (
          <div className={styles.menu}>
            <button onClick={handleShare}>Share</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>

      {!editMode ? (
        <>
          <p>Priority: {task.priority}</p>
          {task.dueDate && <p>Due: {task.dueDate}</p>}
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <input
            type="date"
            value={editedTask.dueDate || ''}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default TaskCard;
