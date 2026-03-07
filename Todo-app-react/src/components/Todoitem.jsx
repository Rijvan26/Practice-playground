function TodoItem({todo,toggleTodo,deleteTodo}) {

  return (
    <li 
    className="itemcontainer"
      style={{
        textDecoration:todo.completed ? "line-through":"none",
        display:"flex",
        width:"450px",
        marginTop:"30px",
        justifyContent:"start",
        gap:"150px"

      }}
    >
      <h3 style={{
                textDecoration:todo.completed ? "line-througn":"none",
                maxWidth:"200px",
                overflow:"auto",
                WebkitScrollSnapType:"block"

      }}>{todo.text}</h3>

      <div id="itembtns" 
      
      >
        
        <button className=" togglebtn btn" onClick={()=>toggleTodo(todo.id)}>
        Toggle
      </button>

      <button className="deletebtn btn" onClick={()=>deleteTodo(todo.id)}>
        Delete
      </button>

      </div>
    </li>
  )
}

export default TodoItem