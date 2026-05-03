import React from 'react'
import useFetchUser from '../hooks/useFetchUser'

const UserList = () => {
    const {users:users , loading , errors,retry} = useFetchUser(
        "https://jsonplaceholder.typicode.com/users"
    )

     if(loading){
            return <h2>Loading...</h2>
        }

        if(errors) {
             return <div>
                <h2>Api Fetch failed</h2>
                <button onClick={() => setRetry(prev => prev+1)}>Retry</button>
             </div>
        }
       
  return (
       <div>
        <h3>user list</h3>
        {users.map(user => {
            return <li key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </li>
        })}
       </div>
  )
}

export default UserList