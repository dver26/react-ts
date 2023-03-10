import React, { useState } from 'react'
import { Footer } from './components/Footer'
import Todos from './components/Todos'
import { TODO_FILTERS } from './consts'
import { type FilterValue, type Todo as TodoType, type TodoId } from './types'

const mockTodos = [
  {
    id: '1',
    title: 'Ver el Twitch de midu',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React con Typescript',
    completed: false
  },
  {
    id: '3',
    title: 'Sacar ticket de la miduFest',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  )

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({
    id,
    completed
  }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className='todoapp'>
      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
        onComplete={handleCompleted}
      />
      <Footer
        onClearCompleted={() => {}}
        activeCount={activeCount}
        completedCount={todos.length - activeCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
