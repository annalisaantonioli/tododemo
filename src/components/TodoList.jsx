import { useEffect, useState } from 'react'
import { PlusIcon } from '@phosphor-icons/react'

import TodoItem from './TodoItem'
import FilterButtons from './FilterButtons'
import TodoStats from './TodoStats'

import logo from '../assets/logo.png'

function TodoList({ items }) {
  const [tasks, setTasks] = useState([])
  const [activeFilter, setActiveFilter] = useState(null)
  const [filteredTasks, setFilteredTasks] = useState([])
  const [stats, setStats] = useState([])

  const filters = [...new Set(items.map((el) => el.status))] // prendo solo gli status e rimuovo i duplicati

  // Add new task
  function addNewTask() {
    const newTasks = [
      ...tasks,
      { id: tasks.length + 1, text: '', status: 'pending', editable: true },
    ]
    setTasks(newTasks)

    handleFilters(activeFilter, newTasks)
  }
  function deleteTask(taskId) {
    const newTasks = tasks.filter((el) => el.id !== taskId)
    setTasks(newTasks)
    console.log('new', activeFilter)
    handleFilters(activeFilter, newTasks)
  }

  function toggleStatus(taskId) {
    const newTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
        : t
    )
    setTasks(newTasks)

    setTasks(newTasks)
    handleFilters(activeFilter, newTasks)
  }

  function editTask(e, taskId) {
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, text: e.target.value, editable: false } : t
    )
    setTasks(newTasks)
    handleFilters(activeFilter, newTasks)
  }
  // Filters handler
  function handleFilters(status, tasksArray = tasks) {
    if (status) {
      setFilteredTasks(tasksArray.filter((el) => el.status === status))
    } else {
      setFilteredTasks(tasksArray)
    }

    setActiveFilter(status)
  }

  useEffect(() => {
    if (items) {
      setTasks(items)
      setFilteredTasks(items)
    }
  }, [items])

  useEffect(() => {
    if (tasks) {
      const doneArr = tasks.filter((el) => el.status === 'done')

      const pendingArr = tasks.filter((el) => el.status === 'pending')
      setStats({ done: doneArr.length, pending: pendingArr.length })
    }
  }, [tasks])

  return (
    <div className='container my-10'>
      <h1 className='text-6xl my-4 text-cyan-900 flex items-center'>
        <img src={logo} width='100' />
        Le mie cose da fare
      </h1>
      <div className='lg:flex lg:justify-between items-end'>
        <div className='my-4 lg:mt-auto lg:mb-0'>
          <FilterButtons filters={filters} onFilterClick={handleFilters} />
        </div>
        <div className='my-4 lg:mt-auto'>
          <TodoStats stats={stats} />
        </div>
      </div>
      <div className='mb-3'>
        {filteredTasks?.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onDeleteTask={() => deleteTask(item.id)}
            onToggleStatus={() => toggleStatus(item.id)}
            onEditTask={(e) => editTask(e, item.id)}
          />
        ))}
      </div>
      <div className='my-8'>
        <button
          onClick={() => addNewTask()}
          className='bg-cyan-900 text-white px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer hover:bg-cyan-800 justify-center mx-auto'
        >
          <PlusIcon />
          Aggiungi una nuova task
        </button>
      </div>
    </div>
  )
}

export default TodoList
