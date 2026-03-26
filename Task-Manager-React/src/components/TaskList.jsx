import React from 'react'
import TaskItem from '../components/TaskItem'
const TaskList = ({users, onToggle, onDelete, tasks}) => {
        console.log("hello" ,users.name)

  return (
    <div className='tasklist'>
        <h2>My Tasks</h2>
        {tasks.length === 0 && <p>Task list is empty</p>}
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