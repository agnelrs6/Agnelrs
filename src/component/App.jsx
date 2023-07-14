import React from 'react'
import './app.css'
import Register from './Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginpage from '../pages/Loginpage'
import Dashbord from '../pages/Dashbord'


function App() {
  return (
    <div>
     
      <BrowserRouter>
        <Routes>
    
          <Route path = "/register"element={<Register />} />
          <Route path = "/dashbord"element={<Dashbord/>} />
          <Route path = "/"element={<h1>vanakam da mapla</h1>} />
          <Route path = "/login"element={<Loginpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App