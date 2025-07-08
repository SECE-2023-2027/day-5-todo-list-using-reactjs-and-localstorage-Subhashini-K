import { useState } from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'

const TodoList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true // 'all' filter
  })

  // Sort tasks with most recent first
  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <div className="todo-list-container">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-list">
          <p>No tasks yet. Add some tasks to get started!</p>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="empty-list">
          <p>No {filter} tasks found.</p>
        </div>
      ) : (
        <ul className="todo-list">
          {sortedTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoList
