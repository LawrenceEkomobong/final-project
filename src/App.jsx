import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import AuthModal from './components/Auth/AuthModal.jsx'
import AdminRoute from './components/Admin/AdminRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleAuthSuccess = () => {
    setIsAuthOpen(false)
    if (location.pathname === '/order') {
      navigate('/checkout')
    }
  }

  return (
    <div className="min-h-screen bg-cream text-[#1C1C1C] selection:bg-brand-red selection:text-white">
      <Navbar onAuthOpen={() => setIsAuthOpen(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<OrderPage onRequestAuth={() => setIsAuthOpen(true)} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={handleAuthSuccess} />
    </div>
  )
}
