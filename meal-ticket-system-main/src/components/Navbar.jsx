import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';
import logo from '../assets/images/로고.png';

// 상단 네비게이션 바
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/ticket-purchase" className="navbar__site-name">
        <img src={logo} alt="Yummy Pass 로고" className="navbar__logo" />
      </Link>
      <ul className="navbar__menu">
        <li><Link to="/ticket-purchase" className="navbar__menu-link">식권 구매</Link></li>
        <li><Link to="/my-ticket" className="navbar__menu-link">My 식권</Link></li>
        <li><Link to="/admin" className="navbar__menu-link">관리자 페이지</Link></li>
        <li><Link to="/qr-code" className="navbar__menu-link">QR 처리</Link></li>
      </ul>
      <button className="navbar__logout" onClick={handleLogout}>로그아웃</button>
    </nav>
  );
}

export default Navbar;