import "../App.css";
import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import ViewPet from './ViewPet'
import Navbar from './Navbar'

function App() {

  return (
    <div>
      <h1>Tamagotchi Clone</h1>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/dashboard" exact element={<Dashboard/>}/>
          <Route path="/view-pet" exact element={<ViewPet />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
