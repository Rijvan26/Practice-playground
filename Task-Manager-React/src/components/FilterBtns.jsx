import React , {useState} from 'react'

const FilterBtns = ({setFilter}) => {
    
  return (
    <div className='filterbtns'>
      
        <button className='fbtns' onClick={() => setFilter("all")}>All</button>
        <button className='fbtns' onClick={() => setFilter("active")}>Active</button>
        <button className='fbtns' onClick={() => setFilter("completed")}>Completed</button>

    </div>
  )
}

export default FilterBtns