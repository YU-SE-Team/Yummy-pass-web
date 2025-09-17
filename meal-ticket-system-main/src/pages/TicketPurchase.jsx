import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ticketPurchase.css';

function TicketPurchase() {
  const navigate = useNavigate();

  // 샘플 데이터
  const stores = [
    {
      id: 'student-hall',
      name: '학생회관 식당',
      image: '학생회관 식당 이미지',
      categories: [
        {
          name: '한식',
          menus: [
            { id: 1, name: '돼지국밥', description: '진한 돼지고기 국물과 쫄깃한 면발', price: 6500 },
            { id: 2, name: '김치볶음밥', description: '신선한 김치와 고슬고슬한 밥', price: 5500 }
          ]
        },
        {
          name: '중식',
          menus: [
            { id: 3, name: '짬뽕밥', description: '해산물이 가득한 매콤한 짬뽕', price: 7000 },
            { id: 4, name: '짜장면', description: '진한 춘장 소스의 짜장면', price: 6000 }
          ]
        },
        {
          name: '일식',
          menus: [
            { id: 5, name: '돈까스', description: '바삭한 튀김옷의 돈까스', price: 6500 }
          ]
        }
      ]
    },
    {
      id: 'natural-science',
      name: '자연계 식당',
      image: '자연계 식당 이미지',
      categories: [
        {
          name: '한식',
          menus: [
            { id: 6, name: '비빔밥', description: '다양한 나물과 고추장', price: 6000 }
          ]
        }
      ]
    },
    {
      id: 'faculty',
      name: '교직원 식당',
      image: '교직원 식당 이미지',
      categories: [
        {
          name: '한식',
          menus: [
            { id: 7, name: '정식', description: '다양한 반찬이 있는 정식', price: 8000 }
          ]
        }
      ]
    }
  ];

        const handleStoreClick = (store) => {
          navigate('/kiosk', { state: { store } });
        };

  return (
    <>
      <Navbar />
      <div className="ticket-purchase-container">
        <h1 className="ticket-purchase-title">매장을 선택하세요.</h1>
        <div className="ticket-purchase-list">
          {stores.map((store) => (
            <div key={store.id} className="ticket-purchase-item" onClick={() => handleStoreClick(store)}>
              <div className="ticket-purchase-img">{store.image}</div>
              <div className="ticket-purchase-label">{store.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TicketPurchase;