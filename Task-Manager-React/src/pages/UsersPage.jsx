import React from 'react'
import useUsers from '../hooks/useUsers'
import "./style/userpage.css"
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
       <div className="table-container">
        <h2>Users Available for work~</h2>

      {/* The "Excel" Header */}
      <div className="table-row table-header">
        <div className="table-cell">User Name</div>
        <div className="table-cell">Email Address</div>
        <div className="table-cell-city">City</div>

      </div>

      {/* The Data Rows */}
      {users.map(user => (
        <div className="table-row" key={user.id}>
          <div className="table-cell">{user.username}</div>
          <div className="table-cell">{user.email}</div>
          <div className="table-cell-city">{user.address.city}</div>

        </div>
      ))}
    </div>
    </div>
  )
}

export default UsersPage