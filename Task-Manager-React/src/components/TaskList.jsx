import React from 'react'
import "./style/tasklist.css"
import TaskItem from '../components/TaskItem'
const TaskList = ({users, onToggle, onDelete, tasks}) => {
        console.log("hello" ,users.name)

  return (
    <div className='tasklist'>
        {tasks.length === 0 && <p className='emptypara'>Task list is empty</p>}
        <ul>
            {
              tasks.map(task => {
                  const user = users.find(u => u.id === Number(task.userId))

                return (

                     <TaskItem 
                 user={user}
                 key={task.id}
                 task={task}
                 onToggle={onToggle}
                 onDelete={onDelete}
                 />
                )
                 
})
            }
        </ul>
    </div>
  )
}

export default TaskList