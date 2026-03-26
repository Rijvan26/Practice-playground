import React , {useState} from 'react'

const FilterBtns = ({setFilter}) => {
    
  return (
    <div className='filterbtns'>
        <button className='btns' onClick={() => setFilter("all")}>All</button>
        <button className='btns' onClick={() => setFilter("active")}>Active</button>
        <button className='btns' onClick={() => setFilter("completed")}>Completed</button>

    </div>
  )
}

export default FilterBtns