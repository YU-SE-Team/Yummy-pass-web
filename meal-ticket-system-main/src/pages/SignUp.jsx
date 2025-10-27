import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signUp.css';
import logo from '../assets/images/로고.png';
import googleLogo from '../assets/images/구글로고.png';
import naverLogo from '../assets/images/네이버로고.png';
import kakaoLogo from '../assets/images/카카오로고.png';

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    // 실제 소셜 로그인 API가 여기에 들어갈 예정
    // 지금은 전화번호 입력 페이지로 이동
    navigate('/social-signup-phone', { 
      state: { 
        provider: provider,
        name: provider === 'Google' ? '김구글' : 
              provider === 'Naver' ? '이네이버' : '박카카오'
      } 
    });
  };

  return (
    <div className="signup2-layout">
      <div className="signup2-left">
        <img src={logo} alt="로고" className="signup2-logo-image" />
      </div>

      <div className="signup2-right">
        <div className="signup2-form-container">
          <form className="signup2-form" onSubmit={handleSubmit}>
            <label className="signup2-label" htmlFor="signup2-name">NAME</label>
            <input id="signup2-name" className="signup2-input" type="text" />

            <label className="signup2-label" htmlFor="signup2-id">ID</label>
            <input id="signup2-id" className="signup2-input" type="text" />

            <label className="signup2-label" htmlFor="signup2-pwd">PWD</label>
            <input id="signup2-pwd" className="signup2-input" type="password" />

            <label className="signup2-label" htmlFor="signup2-phone">PHONE NUMBER</label>
            <input id="signup2-phone" className="signup2-input" type="tel" />

            <button className="signup2-btn" type="submit">SIGN UP</button>
          </form>

          <div className="divider">
            <span>또 다른 방법</span>
          </div>

          <div className="social-login">
            <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
              <img className="social-logo" alt="Google" src={googleLogo} />
              <span className="social-text">Google로 시작하기</span>
            </button>
            <button className="social-btn naver" onClick={() => handleSocialLogin('Naver')}>
              <img className="social-logo" alt="Naver" src={naverLogo} />
              <span className="social-text">Naver로 시작하기</span>
            </button>
            <button className="social-btn kakao" onClick={() => handleSocialLogin('Kakao')}>
              <img className="social-logo" alt="Kakao" src={kakaoLogo} />
              <span className="social-text">Kakao로 시작하기</span>
            </button>
          </div>

          <div className="signup2-login-link">
            <span>이미 회원이신가요?</span>
            <button className="signup2-login-btn" onClick={() => navigate('/')}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
