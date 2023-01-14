import { useEffect, useState } from "react";

function Navbar() {
  



  return (
    <div>
        <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/play">Play</a></li>
            <li><a href="/view-pet">Pet</a></li>
            <li><a href="/adopt">Adopt</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="#">Logout</a></li>
        </ul>
    </div>
  );
}

export default Navbar;