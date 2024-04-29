import React from 'react'
import NavbarProfile from '../Components/NavbarProfile'
import UserModal from '../Components/UserModal'
import Map from '../Components/Map'
import NearestPolice from '../Components/NearestPolice'

const Emergency = () => {
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