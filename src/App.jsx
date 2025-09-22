import './App.css'
import TodoList from './components/TodoList'

// fake contente
import dummyTasks from '../data/dummyTasks'

function App() {
  return (
    <>
      <TodoList items={dummyTasks} />
    </>
  )
}

export default App
