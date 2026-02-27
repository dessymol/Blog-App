import React from 'react'
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Add from  './Components/Add'
import Login from './Components/Login'
import Edit from './Components/Edit'
import PrivateRoutes from './Components/PrivateRoutes'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route element={<PrivateRoutes/>}>
        <Route path='/blogsadd' element={<Add/>}/> 
        <Route path='/edit/:id' element={<Edit/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App