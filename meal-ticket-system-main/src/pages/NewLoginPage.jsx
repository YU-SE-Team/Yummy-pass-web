import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/newLoginPage.css';

function NewLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // 나중에 DB 연결 시 여기서 사용자 타입을 확인하고 적절한 페이지로 리다이렉트
    // 임시로 학생 로그인으로 처리
    navigate('/ticket-purchase');
  };


  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="new-login-container">
      <div className="new-login-left">
        <div className="content-section">
          <h1 className="main-title">학식 생활에<br />새로운 길을 열다</h1>
          <p className="subtitle">편리하고 빠른 온라인 식권 구매로 학식 이용을 더욱 간편하게</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-number">1</span>
              <div className="feature-content">
                <h3>스마트한 식권 관리</h3>
                <p>온라인으로 간편하게 식권을 구매하고 관리하세요. 언제든지 잔여 식권을 확인할 수 있습니다.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-number">2</span>
              <div className="feature-content">
                <h3>빠르고 편리한 구매</h3>
                <p>현장 대기 없이 온라인에서 바로 식권을 구매하고, QR코드로 간편하게 이용하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="new-login-right">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">PWD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="submit" className="login-btn">LOGIN</button>
          </form>

          <div className="divider">
            <span>간편하게 시작하기</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">구글</button>
            <button className="social-btn naver">네이버</button>
          </div>

          <div className="signup-link">
            <span>아직 회원이 아니신가요?</span>
            <button className="signup-btn" onClick={handleSignUp}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLoginPage;
