import "../App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "./Login";
import Register from "./Register";
import CreatePet from "./CreatePet";
import ViewPet from "./ViewPet";
import Navbar from "./Navbar";
import Adopt from "./Adopt";
import Play from "./Play";
import axios from "axios";

function App() {
  const token = localStorage.getItem("token");
  let decodedToken;
  const [userData, setUserData] = useState()
  const [stateChange, setStateChange] = useState('')
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const authAxios = axios.create({
    baseUrl: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getUserData = () => {
    authAxios.get(`http://localhost:5000/api/user-data`).then((req, res) => {
      console.log(req.data.user, 'this is getting the user data from the server')
      console.log(userData, 'getting the user data from a function')
      setUserData(req.data.user)
    });
    
  }

  useEffect(() => {
    getUserData()
  }, []);

  const handleDataChange = (newState) => {
    setStateChange(newState)
  }

  const handleUserDataChange = (newUserData) => {
    setUserData(newUserData)
  }

  useEffect(() => {
    console.log(userData, 'checking user data')
  }, [userData])

  return (
    <div className="app-container">
      {token ? <h1 className="app-welcome">Welcome {decodedToken && decodedToken.name}!</h1> : <h1 className="app-welcome">Welcome!</h1> }
      {
        (userData || userData === undefined) && (
<BrowserRouter>
      <Navbar userData={userData} />
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/create-pet" exact element={<CreatePet userData={userData} handleDataChange={handleDataChange} getUserData={getUserData} handleUserDataChange={handleUserDataChange} />} />
          <Route path="/view-pet" exact element={<ViewPet userData={userData} getUserData={getUserData} handleDataChange={handleDataChange} />} />
          <Route path="/adopt" exact element={<Adopt getUserData={getUserData} handleDataChange={handleDataChange} />} />
          {/* <Route path="/play" exact element={<Play />} /> */}
        </Routes>
      </BrowserRouter>
        )
      }
      
    </div>
  );
}

export default App;
