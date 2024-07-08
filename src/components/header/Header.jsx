import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="app-name">Netracking</Link>
        </div>
        <div className="header-right">
        <Link to="/search" className="nav-link">Tìm kiếm</Link>
        <Link to="/comparison" className="nav-link">So sánh</Link>
          {!token ? (
            <>
              <Link to="/login" className="nav-link">Đăng nhập</Link>
              <Link to="/register" className="nav-link">Đăng ký</Link>
            </>
          ) : (
            <>
                        {/* <Link to="/wishlist" className="nav-link">Wishlist</Link> */}
            

            <Link to="/profile" className="nav-link">Thông tin cá nhân</Link>
            <div onClick={handleLogout} className="nav-link">Đăng xuất</div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
