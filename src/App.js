import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import ProgramAndServices from './pages/programandservices/ProgramAndServices';

function App() {
  return (
    <div className="App"> 
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/programs" element={<ProgramAndServices/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
