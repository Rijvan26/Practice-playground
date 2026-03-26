import { BrowserRouter,Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
        <h4>TASK MANAGER </h4>
        <nav className="nav">
        <Link to="/"> Home</Link>
        <Link to="/users"> users</Link>

      </nav>
    </div>
  )
}

export default Navbar