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
    path='/'
    element={<Emergency/>}
    />
    <Route 
    path='/dashboard'
    element={<Dashboard/>}
    />
    <Route 
    path='/login'
    element={<LoginPage/>}
    />
    <Route 
    path='/signup'
    element={<Registration/>}
    />
    </Routes>
    </>
  )
}

export default App
