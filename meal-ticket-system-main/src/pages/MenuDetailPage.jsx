import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/menuDetailPage.css';

function MenuDetailPage() {
  const navigate = useNavigate();
  
  // 정적 데이터 (프로토타입용)
  const menu = { id: 1, name: '김치 치즈 돈까스', description: '진한 돼지고기 국물과 쫄깃한 면발', price: 6500 };
  const store = { name: '학생회관 식당' };
  
  const handleBack = () => {
    navigate('/kiosk');
  };

  const handlePurchase = () => {
    navigate('/payment', { state: { menu, store } });
  };

  return (
    <>
      <Navbar />
      <div className="menu-detail-container">
        <h1 className="menu-detail-title">{store.name} / 한식</h1>
        
        <div className="menu-detail-content">
          <h2 className="menu-detail-name">{menu.name}</h2>
          
          <div className="menu-detail-main">
            <div className="chart-section">
              <div className="chart-placeholder">
                <span className="chart-text">그래프 위치</span>
              </div>
            </div>
            
            <div className="info-cards-container">
              <div className="info-card tickets-card">
                <span className="info-label">잔여식권 수</span>
                <span className="info-value">5장</span>
              </div>
              <div className="info-card price-card">
                <span className="info-label">음식가격</span>
                <span className="info-value">{menu.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>
          
          <div className="menu-detail-buttons">
            <button className="menu-detail-back-btn" onClick={handleBack}>
              이전으로
            </button>
            <button className="menu-detail-purchase-btn" onClick={handlePurchase}>
              구매하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuDetailPage; 