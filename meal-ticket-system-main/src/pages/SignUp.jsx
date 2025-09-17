import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signUp.css';

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="signup2-layout">
      <div className="signup2-left">
        <span className="signup2-logo-text">로고<br />or<br />이미지</span>
      </div>
      <div className="signup2-right">
        <form className="signup2-form" onSubmit={handleSubmit}>
          <label className="signup2-label" htmlFor="signup2-name">NAME</label>
          <input id="signup2-name" className="signup2-input" type="text" />
          <label className="signup2-label" htmlFor="signup2-id">ID</label>
          <input id="signup2-id" className="signup2-input" type="text" />
          <label className="signup2-label" htmlFor="signup2-pwd">PWD</label>
          <input id="signup2-pwd" className="signup2-input" type="password" />
          <button className="signup2-btn" type="submit">SIGN UP</button>
        </form>
        <div className="signup2-divider-row">
          <div className="signup2-divider" />
          <span className="signup2-divider-text">또 다른 방법</span>
          <div className="signup2-divider" />
        </div>
        <div className="signup2-socials">
          <button className="signup2-social signup2-social-google">구글로 시작</button>
          <button className="signup2-social signup2-social-naver">네이버로 시작</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
