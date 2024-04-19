import './App.css'
import { Routes,Route } from 'react-router-dom'

import Landing from './Pages/Landing'

function App() {

  return (
    <>
    {/* Setting Up All The Client Routes Here */}
    <Routes>
    {/* Default Route */}
    <Route 
    path='/'
    element={<Landing/>}
    />
    </Routes>
    </>
  )
}

export default App
