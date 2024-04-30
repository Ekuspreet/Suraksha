import React, { useEffect } from 'react'
import NavbarProfile from '../Components/NavbarProfile'
import UserModal from '../Components/UserModal'
import Map from '../Components/Map'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import NearestPolice from '../Components/NearestPolice'
const Emergency = () => {
  useEffect(
    ()=>{
      if(!Cookie.get('token')){
        Navigate("/")
      }
    },[]
  )
  
  return (
    <>
    <main className='p-2'>
    <NavbarProfile/>
    <UserModal/>
    <Map/>
    <div className="divider"></div>
    <NearestPolice/>
    </main>
    </>
  )
}

export default Emergency