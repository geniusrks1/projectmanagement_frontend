import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar({ setActiveSection }) {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>Pro Manage</h2>
      <nav className={styles.nav}>
        <button onClick={() => setActiveSection('board')}>Board</button>
        <button onClick={() => setActiveSection('analytics')}>Analytics</button>
        <button onClick={() => setActiveSection('settings')}>Settings</button>
      </nav>
    </div>
  );
}

export default Sidebar;
