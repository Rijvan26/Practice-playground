import React, { useEffect } from 'react'
import {useState} from 'react'
const App = () => {
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
    <div className='main'>
           <div className='inputsection'>
       <input className='todoinput' value={input}
       onChange={(e) => {
        setInput(e.target.value)
       }}  />
       <button className='btn addbtn' onClick={addtodo} >Add</button>
    </div>

     <div className='filterbtns'>
        <button className='btn filterbtn' onClick={() => setFilter("all")}>All</button>
        <button className='btn filterbtn' onClick={() => setFilter("active")}>active</button>
        <button className='btn filterbtn' onClick={() => setFilter("completed")}>completed</button>

     </div>
    <ul>
        {
            filteredTodos.map(todo => {
                return <li className='itemlist' key={todo.id} 
                style={{textDecoration: todo.completed ? "line-through" : "none"}}
                >{todo.text}
                <button className='btn markbtn' onClick={() => {
                    toggoletodo(todo.id)
                }}>Mark completed</button>
                <button className=' btn delbtn' onClick={() => {
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

export default App