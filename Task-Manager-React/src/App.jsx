import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import UsersPage from './pages/UsersPage'
import Navbar from './components/Navbar'
import TaskDetail from './pages/TaskDetail'
import Aboutus from './pages/Aboutus'

const App = () => {
  return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path='/about' element={<Aboutus />}/>


      </Routes>
      </BrowserRouter>
  )
}

export default App