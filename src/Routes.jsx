import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import MyPets from './pages/MyPets'
import LoginUser from './pages/LoginUser'
import CadastroUser from './pages/CadastroUser'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meus-pets" element={<MyPets />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/cadastro" element={<CadastroUser />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Router>
  )
}
