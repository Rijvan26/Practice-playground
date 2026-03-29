import React from 'react'
import { useParams } from 'react-router-dom'
import useTasks from '../hooks/useTasks'
import useUser from "../hooks/useUsers"
import "./style/taskdetail.css"

const TaskDetail = () => {
  const { id } = useParams(); // Ensure this matches your App.js (:taskid)
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { users, isLoading: usersLoading } = useUser("https://jsonplaceholder.typicode.com/users");


  console.log(users)
  // 1. Wait for both to finish loading
  if (tasksLoading || usersLoading) return <div>Loading details...</div>;

  // 2. Find the specific task
  const task = tasks.find(t => String(t.id) === String(id));

  if (!task) return <div>Task not found.</div>;

  // 3. Find the owner of this task
  // Note: JSONPlaceholder uses numbers for IDs. Your task.userId might be a string.
  const user = users.find(u => String(u.id) === String(task.userId));

  return (
    <div className='taskdetail' >
      <h1>Task Detail</h1>
      <hr />
      
      <h3>Task: {task.text}</h3>
      <p>Status: {task.completed ? "✅ Completed" : "⏳ Pending"}</p>

      <div className='taskuserdetail'>
        <h4>Assigned To:</h4>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}  {user.company.bs} </p>
            <p><strong>Address:</strong> <strong>City:</strong> {user.address.city}, {user.address.street}, <strong>Zipcode:</strong> {user.address.zipcode}</p>
  
          </>
        ) : (
          <p>User details unavailable (ID: {task.userId})</p>
        )}
      </div>
    </div>
  );
}
export default TaskDetail