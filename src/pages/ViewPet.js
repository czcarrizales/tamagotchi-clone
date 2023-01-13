import { useEffect, useState } from "react";
import axios from 'axios'
import jwtDecode from 'jwt-decode'

function ViewPet() {

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
        })
    }, [])

    function putUpForAdoption() {
        authAxios.put('http://localhost:5000/api/pet')
            .then((req, res) => {
                console.log(req)
            })
        console.log('put up your pet for adoption!')
    }


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
            <br/>
            <button onClick={putUpForAdoption}>Put up for adoption</button>
            </div>
            
            }
        {petData == undefined && <div>You have no pets! Go adopt one!</div>}
    </div>
  );
}

export default ViewPet;
