// components/TaskCard.tsx
import React from 'react';
import './TaskCard.css';

const TaskCard: React.FC = () => {
  return (
    <div className="container" role="region" aria-label="Task card">
      <div className="header">
        <svg className="icon-button" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 6h18v2H3zM7 9h10v11H7z" />
        </svg>
        <svg className="icon-button" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
        </svg>
      </div>
      <div className="title">Campus build</div>
      <textarea placeholder="Add details" aria-label="Add details"></textarea>
      <div className="link" tabIndex={0}>Add date</div>
      <div className="link" tabIndex={0}>Move to another list</div>
    </div>
  );
};

export default TaskCard;
