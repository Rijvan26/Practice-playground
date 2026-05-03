
function TodoInput({input,setInput,addTodo}) {
  return (
    <div className="inputsection">
      <input 
      className="todoinput"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />

      <button className="addbtn btn" onClick={addTodo}>
        Add
      </button>
    </div>
  )
}

export default TodoInput