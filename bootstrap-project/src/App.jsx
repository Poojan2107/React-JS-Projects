import { useState } from 'react'
import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import Home from './Pages/Home'
import CounterBanner from './Pages/Banner'
import Course from './Pages/Courses/Coursee'
import Location from './Pages/We Are/Location'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Header />
   <Home  />
   <CounterBanner />
    <Course/>
   <Location />
   <Footer />
    </>
  )
}

export default App
