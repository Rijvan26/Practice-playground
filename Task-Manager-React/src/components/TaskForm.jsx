import React,{useState} from 'react'
import "./style/taskform.css"

const TaskForm = ( { addTask , users, loading,errors}) => {
    const [input, setinput] = useState("")
      const [selectedUser, setSelectedUser] = useState("unknown user")
    

     

        function handleAdd () {
            if(!input.trim() || !selectedUser)return
            addTask(input,selectedUser)
            setinput("")
        }

if (errors) {
  return (
    <>
      <p>Failed to load users</p>
      <button onClick={retryFetch}>Retry</button>
    </>
  )
}
        
  return (
    <div className='taskform'>
        <input type="text"
        className='taskinput'
      placeholder='enter task'
      value={input}
      onChange={(e) => setinput(e.target.value)}
      onKeyDown={(e) => {
        if(e.key === "Enter") {
          handleAdd()
        }
      }} />

      <select 
      className='userselect'
      disabled={loading}
      value={selectedUser}
      onChange={(e) => setSelectedUser(Number(e.target.value))}>
              <option value="">
                {loading ? "users laonding" : "Select user"}
                </option>

        {
          users.map(user => {

            return (
              <option value={user.id}>{user.name}</option>
            )
          })
        }
      </select>

      <button className='addtaskbtn btns' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TaskForm