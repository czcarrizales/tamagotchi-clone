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
  if (token) {
    decodedToken = jwtDecode(token);
  }

  // axios.interceptors.request.use((config) => {
  //   config.headers.authorization = `Bearer ${token}`;
  //   return config;
  // });

  // const authAxios = axios.create({
  //   baseURL: "http://localhost:5000",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  

  // useEffect(() => {
  //   authAxios.get("/api/user-data").then((res) => {
  //     console.log(res.data.user, "user data fetched");
  //     console.log(res.data.user.pet === null)
  //   });
  //   console.log('user data fetched')
  // }, [])

  return (
    <div className="app-container">
      {token ? <h1 className="app-welcome">Welcome {decodedToken && decodedToken.name}!</h1> : <h1 className="app-welcome">Welcome!</h1> }
      {/* <h1 className="app-welcome">
        {token && Welcome {decodedToken && decodedToken.name}!}
      </h1> */}
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/create-pet" exact element={<CreatePet />} />
          <Route path="/view-pet" exact element={<ViewPet />} />
          <Route path="/adopt" exact element={<Adopt />} />
          {/* <Route path="/play" exact element={<Play />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
