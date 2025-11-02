import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/main.css';
import logo from '../assets/images/로고.png';

// 상단 네비게이션 바
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  // 현재 경로가 해당 링크와 일치하는지 확인하는 함수
  const isActive = (menuType) => {
    const currentPath = location.pathname;
    
    switch (menuType) {
      case 'ticket-purchase':
        return ['/ticket-purchase', '/kiosk', '/payment', '/payment-complete'].includes(currentPath);
      case 'my-ticket':
        return currentPath === '/my-ticket';
      case 'admin':
        return ['/admin', '/admin-menu-manage'].includes(currentPath);
      case 'qr-code':
        return currentPath === '/qr-code';
      default:
        return false;
    }
  };

  return (
    <nav className="navbar">
      <Link to="/ticket-purchase" className="navbar__site-name">
        <img src={logo} alt="Yummy Pass 로고" className="navbar__logo" />
      </Link>
      <ul className="navbar__menu">
        <li><Link to="/ticket-purchase" className={`navbar__menu-link ${isActive('ticket-purchase') ? 'active' : ''}`}>식권 구매</Link></li>
        <li><Link to="/my-ticket" className={`navbar__menu-link ${isActive('my-ticket') ? 'active' : ''}`}>My 식권</Link></li>
        <li><Link to="/admin" className={`navbar__menu-link ${isActive('admin') ? 'active' : ''}`}>관리자 페이지</Link></li>
        <li><Link to="/qr-code" className={`navbar__menu-link ${isActive('qr-code') ? 'active' : ''}`}>QR 처리</Link></li>
      </ul>
      <button className="navbar__logout" onClick={handleLogout}>로그아웃</button>
    </nav>
  );
}

export default Navbar;