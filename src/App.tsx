import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import {ProfilePage, AddUserPage} from './pages/ProfilePage';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setAdmin(data);
      console.log("data : ",data)
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  useEffect(() => {
    
    fetchAdmin();
  }, []);

  const LogoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');  // Retirer le token
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onLogout={LogoutHandler}
          admin={admin}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin setIsLoggedIn={setIsLoggedIn}  />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users/add" element={<AddUserPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;