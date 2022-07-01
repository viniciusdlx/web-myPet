import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import MyPets from './pages/MyPets'
import CadastroTutor from './pages/CadastroTutor'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from './components/Loading'
import LoginAuth0 from './components/LoginAuth0'
import Profile from './pages/Profile'
// import Profile from './components/Profile'

export function AppRoutes() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  isAuthenticated ? console.log('logado') : localStorage.clear()
  if (isLoading) {
    return <Loading />
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meus-pets" element={<MyPets />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/cadastro" element={<CadastroTutor />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Router>
  )
}
