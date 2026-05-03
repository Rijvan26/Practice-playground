function FilterButtons({setFilter}) {

  return (
    <div className="filterbtns">
      <button className="filterbtn btn" onClick={()=>setFilter("all")}>All</button>
      <button className="filterbtn btn" onClick={()=>setFilter("active")}>Active</button>
      <button className="filterbtn btn" onClick={()=>setFilter("completed")}>Completed</button>
    </div>

  )
}

export default FilterButtons