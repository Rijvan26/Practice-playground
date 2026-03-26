import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import UsersPage from './pages/UsersPage'
import Navbar from './components/Navbar'
import TaskDetail from './pages/TaskDetail'

const App = () => {
  return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/task/:id" element={<TaskDetail />} />


      </Routes>
      </BrowserRouter>
  )
}

export default App