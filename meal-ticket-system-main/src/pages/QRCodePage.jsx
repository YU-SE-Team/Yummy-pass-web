import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/qrCodePage.css';

function QRCodePage() {
  return (
    <>
      <Navbar />
      <div className="qr-code-container">
        <div className="qr-code-card">
          <h1 className="qr-code-title">QR코드 승인 페이지</h1>
          <p className="qr-code-instruction">
            카메라 접근 설정을 허용으로 변경한 뒤 인식해주세요.
          </p>
          <div className="qr-code-camera-area">
            <span className="camera-placeholder">여기에 카메라 인식</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default QRCodePage;
