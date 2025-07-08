import { useState } from 'react'
import './TodoItem.css'

const TodoItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText)
    } else {
      setEditText(task.text) // Reset to original if empty or unchanged
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditText(task.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span 
            className={`todo-text ${task.completed ? 'completed-text' : ''}`}
            onClick={() => onToggleComplete(task.id)}
          >
            {task.text}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={task.completed}
            >
              Edit
            </button>
            <button 
              className="delete-btn"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
