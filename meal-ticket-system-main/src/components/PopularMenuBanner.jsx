import React from 'react';
import '../styles/popularMenuBanner.css';

/**
 * 인기 메뉴 정보 배너 컴포넌트
 * @param {Object} props
 * @param {string} props.message - 표시할 메시지 (기본값: "현재 인기있는 메뉴 정보")
 */
function PopularMenuBanner({ message = "현재 인기있는 메뉴 정보" }) {
  return (
    <div className="popular-menu-banner">
      <div className="popular-menu-text">
        {message}
      </div>
    </div>
  );
}

export default PopularMenuBanner;
