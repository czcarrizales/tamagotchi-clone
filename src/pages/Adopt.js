import { useEffect, useState } from "react";
import axios from 'axios'

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
    <div>
        <h1>You can view adoptable pets here.</h1>
        {adoptablePets && <div>
          {adoptablePets.map(pet => {
            return (<div id={pet._id} key={pet._id}>{pet.name}</div>)
          })}
          </div>}
    </div>
  );
}

export default Adopt;
