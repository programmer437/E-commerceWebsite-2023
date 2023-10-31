import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import ContactUs from './pages/ContactUs';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
    </Routes>
  )
}
export default App;