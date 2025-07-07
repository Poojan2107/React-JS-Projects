//https://68527fd90594059b23cdce90.mockapi.io/api/products
// ${import.meta.env.VITE_API_URL}
import React from 'react'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Header from './Layout/Header'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import PageNotFound from './Pages/PageNotFound'
import SingleProduct from './Pages/SingleProduct'
import Update from './Pages/Update'
const App = () => {
  return (
    <Routers>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/View' element={<About />}></Route>
        <Route path='/Contact' element={<Contact />}></Route>
        <Route path='/SingleProduct/:id' element={<SingleProduct />}></Route>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </Routers>
  )
}

export default App