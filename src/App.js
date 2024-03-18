import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import ProgramAndServices from './pages/programandservices/ProgramAndServices';
import SummerCamp from './pages/summercamp/SummerCamp';
import ChildRegistration from './pages/childregistration/ChildRegistration';
import Register from './pages/register/Register';
import Checkout from './pages/checkout/Checkout';

function App() {
  return (
    <div className="App"> 
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/programs" element={<ProgramAndServices/>}/>
        <Route path="/summercamp" element={<SummerCamp/>}/>
        <Route path="/child-registration" element={<ChildRegistration />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
