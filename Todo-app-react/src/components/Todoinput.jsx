import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import FilterButtons from "./components/FilterButtons"
import TodoList from "./components/TodoList"
import Footer from "./components/Footer"

function App() {

  const [todos,setTodos] = useState([])
  const [input,setInput] = useState("")
  const [filter,setFilter] = useState("all")

  const addTodo = () => {
    if(!input.trim()) return

    const newTodo = {
      id:Date.now(),
      text:input,
      completed:false
    }

    setTodos([...todos,newTodo])
    setInput("")
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
        ? {...todo,completed:!todo.completed}
        : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  const filteredTodos = todos.filter(todo=>{
    if(filter==="active") return !todo.completed
    if(filter==="completed") return todo.completed
    return true
  })

  const activeCount = todos.filter(t=>!t.completed).length

  return (
    <div className="main">

      <TodoInput
        input={input}
        setInput={setInput}
        addTodo={addTodo}
      />

      <FilterButtons
        setFilter={setFilter}
      />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      <Footer
        activeCount={activeCount}
      />

    </div>
  )
}

export default App