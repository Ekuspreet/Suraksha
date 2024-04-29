import React from 'react'
import NavbarProfile from '../Components/NavbarProfile'
import SOS from '../Components/SOS'

const Dashboard = () => {
  return (
    <>
    <main className='px-2'>

        <NavbarProfile/>
        <SOS/>
        <div className="divider divider-neutral"></div>
    </main>
    </>
  )
}

export default Dashboard