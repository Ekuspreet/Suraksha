import './App.css'
import { Routes,Route } from 'react-router-dom'
import Registration from './Pages/Registration'
import LoginPage from './Pages/LoginPage'
import Dashboard from './Pages/Dashboard'
import Emergency from './Pages/Emergency'



function App() {

  return (
    <>
{/* <Registration/> */}
{/* <LoginPage/> */}
    {/* Setting Up All The Client Routes Here */}
    <Routes>
    {/* Default Route */}
    <Route 
    path='/emergency'
    element={<Emergency/>}
    />
    <Route 
    path='/dashboard'
    element={<Dashboard/>}
    />
    <Route 
    path='/'
    element={<LoginPage/>}
    />
    <Route 
    path='/register'
    element={<Registration/>}
    />
    </Routes>
    </>
  )
}

export default App
