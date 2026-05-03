import React from 'react'
import Navbar from './components/Navbar'
import Mainpage from './components/Mainpage'
import Secondpage from './components/Secondpage'
import Thirdpage from './components/Thirdpage'
import Fourpage from './components/Fourpage'
const App = () => {
  return (
    <div className='lg:px-15 px-3 lg:py-5 py-3 w-full'>
      <Navbar />
      <Mainpage />
      <Secondpage />
      <Thirdpage />
      <Fourpage />
    </div>
  )
}

export default App