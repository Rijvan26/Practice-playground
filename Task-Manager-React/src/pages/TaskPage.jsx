import React, {useState} from 'react'
import useTasks from '../hooks/useTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import FilterBtns from '../components/FilterBtns'
import useUsers from '../hooks/useUsers'
import "./style/taskpage.css"

const TaskPage = () => {
    const {tasks, addTask, deleteTask, toggleTask} = useTasks()
    const [filter, setFilter] = useState("all")
    
const filterTasks = tasks.filter(task => {
        if(filter === "completed") return task.completed
        if(filter === "active") return !task.completed
        return true

        
    }) 
    const {users, errors, retryFetch, loading} = useUsers(
        "https://jsonplaceholder.typicode.com/users"

    )

  return (
    <div className='main'>

      <TaskForm 
       addTask={addTask}
       users={users}
       loading={loading}
       errors={errors}
       retryFetch={retryFetch}
      />

  <FilterBtns
  setFilter={setFilter}
  />
    <TaskList 
    users={users}
    tasks={filterTasks}
    onToggle={toggleTask}
    onDelete={deleteTask}
    />
      

    </div>
  )
}

export default TaskPage