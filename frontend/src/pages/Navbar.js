import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "../styles/Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  console.log(token, 'token')

  const [userData, setUserData] = useState(null);

  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
    axios.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    });
  }

  

  const authAxios = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      await authAxios.get("/api/user-data").then((res) => {
        setUserData(res.data.user);
      });
    }
    fetchUserData();
    console.log("fetched user data");
    return () => {};
  }, []);

  function logout() {
    localStorage.clear()
    axios.get('http://localhost:5000/logout')
      .then(
        console.log('logged out from front end')
        )
        .then(navigate('/login'))
  }

  function isLoggedIn() {
    if (token == null) {
      return (<div className="login-register">
        <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
      </div>)
    } else if (token) {
      return (
        <div>
          <li>
            <a href="#" onClick={logout}>Logout</a>
          </li>
        </div>
      )
    }
  }

  function hasPet() {
    if (token && userData) {
      if (userData.pet === null) {
        return (
          <div>
            <li>
              <a href="/create-pet">Create</a>
            </li>
          </div>
        );
      }
    }
  }

  return (
    <div className="navbar-container">
      <ul className="navbar-ul-container">
        {hasPet()}
        <li>
          <a href="/view-pet">Pet</a>
        </li>
        <li>
          <a href="/adopt">Adopt</a>
        </li>
        {isLoggedIn()}
      </ul>
    </div>
  );
}

export default Navbar;
