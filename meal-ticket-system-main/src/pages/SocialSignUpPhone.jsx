import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/socialSignUpPhone.css';
import logo from '../assets/images/로고.png';

function SocialSignUpPhone() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // 소셜 로그인에서 전달받은 사용자 정보
  const socialProvider = location.state?.provider || 'Social';
  const userName = location.state?.name || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    // 전화번호 형식 검증
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('올바른 전화번호 형식을 입력해주세요.');
      return;
    }

    // 회원가입 완료 처리
    console.log(`${socialProvider} 로그인 완료`, {
      provider: socialProvider,
      name: userName,
      phoneNumber: phoneNumber
    });

    // 메인 페이지로 이동
    navigate('/');
  };

  return (
    <div className="social-phone-layout">
      <div className="social-phone-left">
        <img src={logo} alt="로고" className="social-phone-logo-image" />
      </div>

      <div className="social-phone-right">
        <div className="social-phone-form-container">
          <div className="social-phone-header">
            <h2 className="social-phone-title">추가 정보 입력</h2>
            <p className="social-phone-subtitle">
              {socialProvider} 로그인이 완료되었습니다.
              {userName && (
              <>
                  <br />
                  안녕하세요, {userName}님!
              </>
              )}
            </p>
            <p className="social-phone-description">
              서비스 이용을 위해 전화번호를 입력해주세요.
            </p>
          </div>

          <form className="social-phone-form" onSubmit={handleSubmit}>
            <label className="social-phone-label" htmlFor="social-phone-number">
              전화번호
            </label>
            <input 
              id="social-phone-number" 
              className="social-phone-input" 
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="010-1234-5678"
            />

            <div className="social-phone-buttons">
              <button className="social-phone-btn primary" type="submit">
                회원가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SocialSignUpPhone;