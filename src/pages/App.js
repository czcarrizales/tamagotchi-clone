import "../App.css";
import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'

function App() {

  return (
    <div>
      <h1>Tamagotchi Clone</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/dashboard" exact element={<Dashboard/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
