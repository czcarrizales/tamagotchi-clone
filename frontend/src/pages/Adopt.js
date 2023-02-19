import { useEffect, useState } from "react";
import axios from 'axios'
import jwtDecode from "jwt-decode";
import '../styles/Adopt.css'
import { useNavigate } from "react-router-dom";

function Adopt({getUserData, handleDataChange}) {

  const token = localStorage.getItem('token')
  let decodedToken;
  const navigate = useNavigate()
  const [adoptablePets, setAdoptablePets] = useState([])
  
  const authAxios = axios.create({
    baseUrl: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

useEffect(() => {
  if (token) {
    decodedToken = jwtDecode(token, 'token')
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  } else {
    navigate('/login')
  }
}, [])

useEffect(() => {
    setAdoptablePets([])
    authAxios.get(`http://localhost:5000/api/adoptable-pets`)
    .then((req, res) => {
      console.log(req)
        req.data.map(pet => {
          setAdoptablePets(oldPets => [...oldPets, pet])
        })
        
    })
}, [])

async function adoptPet(pet) {
  const confirmation = window.confirm(`Are you sure you want to adopt ${pet.name}?`)

  if (confirmation) {
    authAxios.put(`http://localhost:5000/adopt-pet`, {_id: pet._id})
    .then((req, res) => {
      handleDataChange('data changed from adopt-pet')
      getUserData()
      navigateToPet()
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
}

function navigateToPet() {
  navigate('/view-pet')
}


  return (
    <div className="adopt-component-container">
        <h1>adoptable pets</h1>
        {adoptablePets && <div className="all-adoptable-pets-container">
          {adoptablePets.map(pet => {
            return (<div className="adoptable-pet" id={pet._id} key={pet._id}>
              <img src={pet.imageSrc}></img>
              <h2>{pet.name}</h2>
              <button onClick={() => adoptPet(pet)}>Adopt!</button>
              </div>)
          })}
          </div>}
    </div>
  );
}

export default Adopt;
