import React, { useEffect } from 'react'
import {useState} from 'react'
const Addtodo = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos")
        return saved?JSON.parse(saved):[]
    })
    const [input, setInput] = useState("")
    const [filter, setFilter] = useState("all")

    const addtodo = () => {
        if(!input.trim()) return
        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false
        }
        setTodos([...todos,newTodo])
        
        setInput("")
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])

    const toggoletodo = (id) => {
        setTodos(
            todos.map(todo => {
                return todo.id === id ? {...todo, completed: !todo.completed}:todo
            })
        )
    }

    // deletetodo  
    const DeleteTodo = (id) => {
      setTodos(
        todos.filter(todo => todo.id !== id)
      )
    }

    const filteredTodos = todos.filter(todo => {
        if(filter === "completed") return todo.completed
        if(filter === "active") return !todo.completed
        return true
    })

    const activeCount = todos.filter(t => !t.completed).length
  return (
    <div>
           <div>
       <input value={input}
       onChange={(e) => {
        setInput(e.target.value)
       }}  />
       <button onClick={addtodo} >Add</button>
    </div>

     <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>active</button>
        <button onClick={() => setFilter("completed")}>completed</button>

     </div>
    <ul>
        {
            filteredTodos.map(todo => {
                return <li key={todo.id} 
                style={{textDecoration: todo.completed ? "line-through" : "none"}}
                >{todo.text}
                <button onClick={() => {
                    toggoletodo(todo.id)
                }}>Mark completed</button>
                <button onClick={() => {
                    DeleteTodo(todo.id)
                }}>Delete</button>
                </li>                
            })
        }
    </ul>
    <p>{activeCount} items left</p>
    </div>
    
  )
}

export default Addtodo