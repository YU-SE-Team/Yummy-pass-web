import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/kioskMenuPage.css';

function KioskMenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [order, setOrder] = useState([]); // 주문 목록
  
  // 정적 데이터
  const store = {
    id: 'student-hall',
    name: '학생회관 식당',
    categories: [
      {
        name: '한식',
        menus: [
          { id: 1, name: '된장찌개', price: 7500, imageUrl: null },
          { id: 2, name: '김치찌개', price: 8000, imageUrl: null },
          { id: 3, name: '순두부찌개', price: 8000, imageUrl: null },
          { id: 4, name: '부대찌개', price: 8000, imageUrl: null },
          { id: 5, name: '낙지덮밥', price: 8500, imageUrl: null },
          { id: 6, name: '산채비빔밥', price: 8500, imageUrl: null }
        ]
      },
      {
        name: '양식',
        menus: [
          { id: 7, name: '스테이크', price: 12000, imageUrl: null },
          { id: 8, name: '파스타', price: 9000, imageUrl: null },
          { id: 9, name: '피자', price: 10000, imageUrl: null }
        ]
      },
      {
        name: '중식',
        menus: [
          { id: 10, name: '짜장면', price: 6000, imageUrl: null },
          { id: 11, name: '짬뽕', price: 7000, imageUrl: null },
          { id: 12, name: '탕수육', price: 15000, imageUrl: null }
        ]
      },
      {
        name: '음료',
        menus: [
          { id: 13, name: '콜라', price: 2000, imageUrl: null },
          { id: 14, name: '사이다', price: 2000, imageUrl: null },
          { id: 15, name: '커피', price: 3000, imageUrl: null }
        ]
      }
    ]
  };

  const handleMenuClick = (menu) => {
    // 메뉴 클릭 시 주문 목록에 추가 (수량 증가)
    // 메뉴명을 기준으로 탐색
    // 메뉴가 존재할 경우(existingItem), 수량(quantity) 증가
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === menu.id);
      if (existingItem) {
        return prevOrder.map(item =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevOrder, { ...menu, quantity: 1 }];
    });
  };

  const handleBackToStores = () => {
    navigate('/ticket-purchase');
  };

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
  };

  const handleCancelOrder = () => {
    setOrder([]);
  };

  const handleCheckout = () => {
    // 상세 메뉴 페이지로 이동
    navigate('/menu-detail');
  };

  // 주문 요약(주문 내역 + 총 금액)
  const totalAmount = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="kiosk-menu-container">
        <div className="kiosk-header">
          <button className="kiosk-back-btn" onClick={handleBackToStores}>
            <span className="kiosk-back-icon">←</span>
            이전으로
          </button>
        </div>
        
        {/* 카테고리 탭 */}
        <div className="kiosk-category-tabs">
          {store.categories.map((category, index) => (
            <button
              key={index}
              className={`kiosk-category-tab ${activeCategory === index ? 'active' : ''}`}
              onClick={() => handleCategoryClick(index)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* 메뉴 콘텐츠 영역 */}
        <div className="kiosk-menu-content">
          <div className="kiosk-menu-grid">
            {store.categories[activeCategory].menus.map((menu) => (
              <div key={menu.id} className="kiosk-menu-item" onClick={() => handleMenuClick(menu)}>
                <div className="kiosk-menu-image">
                  {menu.imageUrl ? (
                    <img src={menu.imageUrl} alt={menu.name} className="kiosk-menu-image-img" />
                  ) : (
                    <div className="kiosk-menu-image-placeholder">이미지</div>
                  )}
                </div>
                <h3 className="kiosk-menu-name">{menu.name}</h3>
                <div className="kiosk-menu-price">{menu.price.toLocaleString()}원</div>
              </div>
            ))}
          </div>
        </div>

        {/* 주문 요약 */}
        <div className="kiosk-order-summary">
          <div className="order-summary-header">
            <h2 className="summary-title">주문메뉴</h2>
            <div className="summary-stats">
              <span className="summary-quantity">수량 {totalQuantity}개</span>
              <span className="summary-amount">금액 {totalAmount.toLocaleString()}원</span>
            </div>
          </div>
          
          <div className="summary-list">
            {order.length === 0 ? (
              <div className="empty-order">메뉴를 선택해주세요</div>
            ) : (
              order.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 액션 바 */}
        <div className="kiosk-action-bar">
          <button className="kiosk-cancel-btn" onClick={handleCancelOrder}>
            전체취소
          </button>
          <button className="kiosk-checkout-btn" onClick={handleCheckout}>
            결제하기
          </button>
        </div>
        
        <div className="kiosk-instruction">
          메뉴를 확인하고 주문할 수 있는 화면으로 터치하여 선택합니다.
        </div>
      </div>
    </>
  );
}

export default KioskMenuPage;

