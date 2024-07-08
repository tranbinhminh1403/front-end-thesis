import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Search from './components/search/Search';
import ProductDetails from './components/detail/ProductDetails';
import Comparison from './components/comparison/Comparison';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<ProductDetails />} />
            <Route path='/comparison' element={<Comparison/>} />
            <Route path='/' element={<Homepage/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
