import React from 'react'
import useUsers from '../hooks/useUsers'
const UsersPage = () => {
    const {users, errors, retryFetch, loading} = useUsers(
        "https://jsonplaceholder.typicode.com/users"

    )

    if(loading){
        return (
            <h2>Loading...</h2>
        )
    }

    if(errors){
        
        return (
            <div>
                <h4>Error in fetching try again</h4>
            <button onClick={() => retryFetch}>Rrtry</button>
            </div>
        )
    }
  return (
    <div>
       <h3>Users on Site</h3>
       <ul>
        {users.map(user => {
            return (
                <h2>{user.name}</h2>
            )
        })}
       </ul>
    </div>
  )
}

export default UsersPage