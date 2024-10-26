// src/App.js
import React, { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import styles from './project.module.css';

const dummyTasks = [
  {
    _id: '1',
    title: 'Design Homepage',
    priority: 'High',
    dueDate: '2024-10-25',
    status: 'to-do',
    createdAt: '2024-10-20',
  },
  {
    _id: '2',
    title: 'Fix Login Bug',
    priority: 'Medium',
    dueDate: '2024-10-22',
    status: 'in-progress',
    createdAt: '2024-10-18',
  },
  {
    _id: '3',
    title: 'Prepare Report',
    priority: 'Low',
    dueDate: null,
    status: 'backlog',
    createdAt: '2024-09-15',
  },
  {
    _id: '4',
    title: 'Release Update',
    priority: 'High',
    dueDate: '2024-10-30',
    status: 'done',
    createdAt: '2024-10-05',
  },
];

function Projects() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [filter, setFilter] = useState('all'); // 'today', 'week', 'month', 'all'
  const [collapsedColumns, setCollapsedColumns] = useState({
    backlog: false,
    'to-do': false,
    'in-progress': false,
    done: false,
  });

  // Filter tasks based on the selected filter option
  const getFilteredTasks = () => {
    const now = new Date();
    return tasks.filter((task) => {
      const createdAt = new Date(task.createdAt);
      const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

      if (filter === 'today') return diffInDays <= 1;
      if (filter === 'week') return diffInDays <= 7;
      if (filter === 'month') return diffInDays <= 30;
      return true; // Default: 'all'
    });
  };

  const toggleCollapse = (status) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <div className={styles.appContainer}>
      <h1>Task Manager</h1>
      <div className={styles.filterContainer}>
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <TaskForm setTasks={setTasks} />
      <TaskList
        tasks={getFilteredTasks()}
        setTasks={setTasks}
        collapsedColumns={collapsedColumns}
        toggleCollapse={toggleCollapse}
      />
    </div>
  );
}

export default Projects;
