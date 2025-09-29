import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RestaurantHeader from '../components/RestaurantHeader';
import CategoryTabs from '../components/CategoryTabs';
import MenuGrid from '../components/MenuGrid';
import OrderSummary from '../components/OrderSummary';
import MenuDetailModal from '../components/MenuDetailModal';
import '../styles/kioskMenuPage.css';

function KioskMenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [order, setOrder] = useState([]); // 주문 목록
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  
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
    // 메뉴 클릭 시 모달 열기
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleAddToOrder = (menu) => {
    // 메뉴를 주문 목록에 추가 (수량 증가)
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
    // 결제 페이지로 이동
    navigate('/payment', { state: { order, store } });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const handleModalPurchase = (menu, store) => {
    // 모달에서 구매하기 클릭 시 주문 목록에 추가
    handleAddToOrder(menu);
    // 모달 닫기
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  return (
    <>
      <Navbar />
      <div className="kiosk-menu-container">
        <RestaurantHeader 
          restaurantName={store.name}
          onBackClick={handleBackToStores}
        />
        
        <CategoryTabs 
          categories={store.categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        
        <MenuGrid 
          menus={store.categories[activeCategory].menus}
          onMenuClick={handleMenuClick}
        />

        <OrderSummary 
          order={order}
          onCancelOrder={handleCancelOrder}
          onCheckout={handleCheckout}
        />
        
        <div className="kiosk-instruction">
          메뉴를 확인하고 주문할 수 있는 화면으로 터치하여 선택합니다.
        </div>
      </div>

      {/* 메뉴 상세 모달 */}
      {selectedMenu && (
        <MenuDetailModal
          menu={selectedMenu}
          store={store}
          category={store.categories[activeCategory].name}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onPurchase={handleModalPurchase}
        />
      )}
    </>
  );
}

export default KioskMenuPage;

