import React from 'react';
import styles from './Message.module.css';

interface MessageProps {
    content: string;
    sender: 'user' | 'ai';
}

const Message: React.FC<MessageProps> = ({ content, sender }) => {
    return (
        <div className={`${styles.message} ${sender === 'user' ? styles.user : styles.ai}`}>
            <p>{content}</p>
        </div>
    );
};

export default Message;