import React from 'react'
import UserList from './components/UserList'
import SearchBar from './components/SearchBar'

const App = () => {
  return (
    <div>
      <SearchBar />
      <UserList />
    </div>
  )
}

export default App