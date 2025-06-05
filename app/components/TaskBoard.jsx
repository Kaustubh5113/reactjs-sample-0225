import React, { useState, useEffect } from 'react';
import './TaskBoard.css';

const TaskBoard = ({ onLogout }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return [{ id: 1, title: 'My Tasks' }];
  });

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openAddTaskPopup = () => setShowAddPopup(true);
  const closeAddTaskPopup = () => {
    setShowAddPopup(false);
    setNewTaskTitle('');
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
    };

    setTasks((prev) => [...prev, newTask]);
    closeAddTaskPopup();
  };

  const handleDeleteTask = (taskId, taskTitle) => {
    if (window.confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
    }
  };

  return (
    <div className={`taskboard-container${showAddPopup ? ' blurred' : ''}`} role="main" aria-label="Task Board Application">
      <header>
        <div className="logo-title">
          <img
            alt="TasksBoard logo"
            className="logo"
            src="https://storage.googleapis.com/a1aa/image/b5387dc5-4cf5-4039-530d-fea12ee9e71f.jpg"
            width="40"
            height="40"
          />
          <div className="title">TasksBoard</div>
        </div>

        <button
          aria-label="User profile"
          className="profile-button"
          onClick={() => alert('Profile clicked!')}
        >
          <img
            alt="Profile picture"
            className="profile-pic"
            src="https://storage.googleapis.com/a1aa/image/3678a909-2c28-44ca-ea63-83e1d24c000c.jpg"
            width="48"
            height="48"
          />
        </button>

        <button
          onClick={onLogout}
          className="logout-button"
          aria-label="Logout"
          title="Logout"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            marginLeft: '16px',
          }}
        >
          Logout
        </button>
      </header>

      <main>
        {tasks.map((task) => (
          <section
            key={task.id}
            aria-label={task.title}
            className="task-card"
            tabIndex={0}
          >
            <div className="task-header" style={{ position: 'relative' }}>
              <span>{task.title}</span>
              <button
                className="btn-icon btn-delete"
                aria-label={`Delete task ${task.title}`}
                title={`Delete task ${task.title}`}
                onClick={() => handleDeleteTask(task.id, task.title)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#ff4d4d',
                }}
              >
                🗑️
              </button>

              <button
                className="btn-icon"
                aria-label="More options"
                title="More options"
                onClick={() => alert('More options clicked')}
              >
                <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
              </button>
            </div>

            <div className="new-task-container">
              <span className="new-task-text">New Task</span>
              <button
  className="btn-add-small"
  aria-label="Add task inside card"
  title="Add task inside card"
  style={{
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }}
  onClick={() => alert('Add task inside this card clicked')}
>
  Add Task
</button>

            </div>
          </section>
        ))}
      </main>

      <button
        className="btn-add-large"
        aria-label="Add new task"
        title="Add new task"
        onClick={openAddTaskPopup}
      >
        +
      </button>

      {/* Popup for adding new task */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAddTaskPopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popupTitle"
          >
            <h2 id="popupTitle">Add New Task</h2>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              aria-label="Task title"
              autoFocus
            />
            <div className="popup-buttons">
              <button onClick={handleAddTask} className="btn-add-task">Add</button>
              <button onClick={closeAddTaskPopup} className="btn-cancel-task">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
