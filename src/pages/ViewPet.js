import { useEffect, useState } from "react";
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import '../styles/ViewPet.css'

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

    function raiseHunger() {
        authAxios.put('http://localhost:5000/raise-hunger', {_id: petData._id})
            .then((req, res) => {
                console.log(res)
                console.log('hunger raised!')
            })
        console.log('hunger raised!')
    }

  return (
    <div className="view-pet-container">
        {petData && <div>
            <h1>{petData.name}</h1>
            <img src={petData.imageSrc}></img>
            <div className="pet-stats-container">
                <div className="pet-stat">
                Happiness: {petData.happiness}
                </div>
                <div className="pet-stat">
                Hunger: {petData.hunger}
                </div>
            </div>
            <br/>
            <button onClick={putUpForAdoption}>Put Up For Adoption</button>
            <br/>
            <button onClick={raiseHunger}>Feed</button>
            </div>
            
            }
        {petData == undefined && <div>You have no pets! Go adopt one!</div>}
    </div>
  );
}

export default ViewPet;
