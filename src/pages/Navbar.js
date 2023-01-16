import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function Navbar() {
  
  const token = localStorage.getItem('token')

  const [userData, setUserData] = useState(null)

  console.log(jwtDecode(token))
  console.log(Date.now())

  useEffect(() => {

    console.log('user data updated')
  }, [])

  function isLoggedIn() {
    if (jwtDecode(token).exp * 1000 < Date.now()) {
      return (
        <div>
        <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </div>
      )
    } else {
      return (
        <div>
          <li><a href="#">Logout</a></li>
        </div>
      )
    }
  }

  


  return (
    <div>
        <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/play">Play</a></li>
            <li><a href="/view-pet">Pet</a></li>
            <li><a href="/adopt">Adopt</a></li>
            {isLoggedIn()}
        </ul>
    </div>
  );
}

export default Navbar;