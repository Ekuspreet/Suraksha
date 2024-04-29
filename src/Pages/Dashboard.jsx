import React from 'react'
import NavbarProfile from '../Components/NavbarProfile'
import SOS from '../Components/SOS'
import EmergencyContacts from '../Components/EmergencyContacts'
import UserModal from '../Components/UserModal'

const Dashboard = () => {
  return (
    <>
    <main className='px-2'>

        <NavbarProfile/>
        <UserModal/>
        <SOS/>
        <div className="divider divider-neutral"></div>
        <EmergencyContacts/>
    </main>
    </>
  )
}

export default Dashboard