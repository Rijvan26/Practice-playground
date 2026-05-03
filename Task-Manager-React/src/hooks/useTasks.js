import { useState,useEffect } from "react"

function useTasks() {
    const [tasks, settasks] = useState( () =>  {
        const saved = localStorage.getItem("tasks")
        try{
        return saved? JSON.parse(saved): []

        } catch (e) {
            console.error("failed to parse data")
            return []
        }
      }
      )


 function addTask (text,selectedUser) {
      if(!text.trim() || !selectedUser ) return
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      userId: selectedUser
    }
    settasks(prevTasks => [...prevTasks, newTask])
  }

  function deleteTask (id) {
        settasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  function toggleTask (id) {
    settasks(
      prevTasks => prevTasks.map(task => {
        if(task.id === id){
          return { ...task, completed: !task.completed}

        }
        return task
      } )
    )
  }

   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks))
  },[tasks])
  return{tasks, addTask, deleteTask, toggleTask}
}

export default  useTasks