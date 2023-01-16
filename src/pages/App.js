import "../App.css";
import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import ViewPet from './ViewPet'
import Navbar from './Navbar'
import Adopt from './Adopt'
import Play from './Play'

function App() {

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)

  return (
    <div>
      <h1>Welcome {decodedToken.name}!</h1>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/dashboard" exact element={<Dashboard/>}/>
          <Route path="/view-pet" exact element={<ViewPet />} />
          <Route path="/adopt" exact element={<Adopt />} />
          <Route path="/play" exact element={<Play />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
