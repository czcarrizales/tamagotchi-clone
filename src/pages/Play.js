import { useEffect, useState } from "react";
import axios from 'axios'
import jwtDecode from 'jwt-decode'

function Play() {

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
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
            console.log(petData, 'pet data!')
        })
    }, [])

    function raiseHappiness() {
        authAxios.put('http://localhost:5000/raise-happiness', {_id: petData._id})
            .then(console.log('raised happiness!'))
        console.log('happiness raised!')
    }

  return (
    <div>
        <h1>Play with your pet here!</h1>
        {petData && <div>
            Your pet's happiness is currently at {petData.happiness}
            </div>}
        <button onClick={raiseHappiness}>Click to raise happiness!</button>
    </div>
  );
}

export default Play;