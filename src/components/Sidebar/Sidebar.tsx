import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <h2>Code Editor</h2>
            {/* Placeholder for the Monaco Editor */}
            <div className={styles.editor}>
                {/* Monaco Editor will be integrated here */}
            </div>
            <h2>Live Preview</h2>
            <div className={styles.preview}>
                {/* Live preview of the code will be displayed here */}
            </div>
        </div>
    );
};

export default Sidebar;