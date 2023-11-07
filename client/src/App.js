import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import ContactUs from './pages/ContactUs';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}/>
        <Route path="/user" element={<Dashboard/>}/>
      <Route />
      <Route path="/register" element={<Register/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>

  )
}
export default App;