import { useEffect, useState } from "react";
import axios from 'axios'
import jwtDecode from 'jwt-decode'

function ViewPet() {

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const petId = decodedToken.pet
    const [petData, setPetData] = useState()

    const authAxios = axios.create({
        baseUrl: 'http://localhost:5000',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    useEffect(() => {
        authAxios.get(`http://localhost:5000/api/pet`)
        .then((req, res) => {
            console.log('got pet!')
            console.log(req.data.pet, 'request')
            setPetData(req.data.pet)
            console.log(res)
        })
    }, [])


    console.log(token)
    console.log(decodedToken)
    console.log(petData)

    

  return (
    <div>
        <h1>Viewing Pet</h1>
        {petData && <div>
            {petData.name}
            <br/>
            Personality: {petData.personality}
            <br/>
            Happiness: {petData.happiness}
            <br/>
            Up for adoption? {String(petData.adoptable)}
            </div>}
    </div>
  );
}

export default ViewPet;
