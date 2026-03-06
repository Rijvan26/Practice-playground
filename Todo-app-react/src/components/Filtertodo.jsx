function TodoInput({input,setInput,addTodo}) {
  return (
    <div className="inputsection">
      <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />

      <button onClick={addTodo}>
        Add
      </button>
    </div>
  )
}

export default TodoInput