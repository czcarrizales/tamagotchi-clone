import { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/Adopt.css'

function Adopt() {

  const token = localStorage.getItem('token')
  const [adoptablePets, setAdoptablePets] = useState([])
  
  const authAxios = axios.create({
    baseUrl: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

useEffect(() => {
    setAdoptablePets([])
    authAxios.get(`http://localhost:5000/api/adoptable-pets`)
    .then((req, res) => {
        req.data.map(pet => {
          console.log(pet.name)
          setAdoptablePets(oldPets => [...oldPets, pet])
          console.log(adoptablePets)
        })
        
    })
}, [])


  return (
    <div className="adopt-component-container">
        <h1>You can view adoptable pets here.</h1>
        {adoptablePets && <div className="all-adoptable-pets-container">
          {adoptablePets.map(pet => {
            return (<div className="adoptable-pet" id={pet._id} key={pet._id}>
              <img src={pet.imageSrc}></img>
              <h2>{pet.name}</h2>
              <p>Personality: {pet.personality}</p>
              <button>Adopt!</button>
              </div>)
          })}
          </div>}
    </div>
  );
}

export default Adopt;
