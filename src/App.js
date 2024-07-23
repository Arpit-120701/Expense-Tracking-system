import React from 'react'
import {Routes , Route, Navigate } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Register from './Components/Pages/Register'
import Login from './Components/Pages/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute>}></Route>
      <Route path='/register' element={<Register/> }></Route>
      <Route path='/login' element={<Login /> }></Route>
    </Routes>
  )
}


export function ProtectedRoute(props)
{
  if(localStorage.getItem('user')){
    return props.children
  }
  else{
    return <Navigate to='/login' />
  }
}

export default App
