import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/myTicketPage.css';

function MyTicketPage() {
  return (
    <>
      <Navbar />
      <div className="my-ticket-container">
        <h1 className="my-ticket-title">My 식권</h1>
        <div className="my-ticket-content">
          <div className="my-ticket-qr">
            <div className="qr-placeholder">QR</div>
          </div>
          <div className="my-ticket-info">
            <div className="info-row">
              <span className="info-label">상품</span>
              <span className="info-value">김치 치즈 돈까스</span>
            </div>
            <div className="info-row">
              <span className="info-label">수령 위치</span>
              <span className="info-value">학생회관 식당 00코너</span>
            </div>
            <div className="info-row">
              <span className="info-label">유효기간</span>
              <span className="info-value">XX.XX.XX~XX.XX.XX</span>
            </div>
            <div className="info-row">
              <span className="info-label">사용여부</span>
              <span className="info-value status-unused">미사용</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyTicketPage;