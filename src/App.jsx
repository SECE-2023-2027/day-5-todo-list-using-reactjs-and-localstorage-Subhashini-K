import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Notification from './components/Notification'

function App() {
  const [tasks, setTasks] = useState([])
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Show notification message
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' })
    }, 3000)
  }

  // Add a new task
  const addTask = (taskText) => {
    if (taskText.trim() === '') return
    
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    setTasks([...tasks, newTask])
    showNotification('Task added successfully!')
  }

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    showNotification('Task deleted successfully!', 'warning')
  }

  // Toggle task completion status
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ))
    showNotification('Task status updated!')
  }

  // Edit a task
  const editTask = (taskId, newText) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, text: newText } 
        : task
    ))
    showNotification('Task updated successfully!')
  }

  return (
    <div className="todo-app">
      <div className="container">
        <h1>To-Do List</h1>
        <p className="app-description">Keep track of your tasks and stay organized</p>
        
        <TodoForm addTask={addTask} />
        
        {notification.show && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
          />
        )}
        
        <TodoList 
          tasks={tasks} 
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={editTask}
        />
        
        <div className="task-summary">
          <p>Total tasks: {tasks.length}</p>
          <p>Completed: {tasks.filter(task => task.completed).length}</p>
          <p>Remaining: {tasks.filter(task => !task.completed).length}</p>
        </div>
      </div>
    </div>
  )
}

export default App
