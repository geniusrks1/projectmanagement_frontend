// src/components/TaskList.js
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import styles from './TaskList.module.css';

function TaskList({ tasks, setTasks, collapsedColumns, toggleCollapse }) {
  const statuses = ['backlog', 'to-do', 'in-progress', 'done'];
  const [showForm, setShowForm] = useState(false);

  const handleAddTaskClick = () => setShowForm(true);

  return (
    <div className={styles.taskListContainer}>
      {statuses.map((status) => (
        <div key={status} className={styles.taskColumn}>
          <div className={styles.columnHeader}>
            <h2>{status.toUpperCase()}</h2>
            <div>
              {status === 'to-do' && (
                <button onClick={handleAddTaskClick}>+</button>
              )}
              <button onClick={() => toggleCollapse(status)}>
                {collapsedColumns?.[status] ? 'Max' : 'Min'}
              </button>
            </div>
          </div>

          {!collapsedColumns?.[status] && (
            <>
              {showForm && status === 'to-do' && (
                <TaskForm setTasks={setTasks} setShowForm={setShowForm} />
              )}

              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard key={task._id} task={task} setTasks={setTasks} />
                ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
