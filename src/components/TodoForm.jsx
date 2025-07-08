import { useState } from 'react'
import './TodoForm.css'

const TodoForm = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTask(inputValue)
      setInputValue('')
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  )
}

export default TodoForm
