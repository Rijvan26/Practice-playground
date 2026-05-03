import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

const SearchBar = () => {
    const [users, setusers] = useState([])
    const [search, setSearch] = useState("")


    const debounceValue = useDebounce(search,500)
    useEffect(() => {
if(!debounceValue) return

fetch(`https://jsonplaceholder.typicode.com/users?name_like=${debounceValue}`)
.then(res => res.json())
.then(data => setusers(data))
    },[debounceValue])
  return (
    <div>
        <input
type="text"
placeholder="Search user"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

{users.map(user => (
<p key={user.id}>{user.name}</p>
))}
    </div>
  )
}

export default SearchBar