// src/App.js
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Analytics from '../../components/Analytics';
import Settings from '../../components/Settings';
import styles from './app.module.css';
import {Projects} from '../index.js'

function ProjectApp() {
  const [activeSection, setActiveSection] = useState('board'); // Default section is Board

  const renderContent = () => {
    switch (activeSection) {
      case 'board':
        return <Projects />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Projects />;
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar setActiveSection={setActiveSection} />
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}

export default ProjectApp;
