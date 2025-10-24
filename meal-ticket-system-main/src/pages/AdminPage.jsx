import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ticketPurchase.css';
import 학생회관식당사진 from '../assets/images/학생회관식당 사진.png';
import 자연계식당사진 from '../assets/images/자연계식당 사진.png';
import 교직원식당사진 from '../assets/images/교직원식당 사진.png';

function AdminPage() {
  const navigate = useNavigate();

  // 매장 데이터
  const stores = [
    {
      id: 'student-hall',
      name: '학생회관 식당 관리',
      image: 학생회관식당사진
    },
    {
      id: 'natural-science',
      name: '자연계 식당 관리',
      image: 자연계식당사진
    },
    {
      id: 'faculty',
      name: '교직원 식당 관리',
      image: 교직원식당사진
    }
  ];

  const handleStoreClick = (store) => {
    navigate('/admin-menu-manage', { state: { store } });
  };

  return (
    <>
      <Navbar />
      <div className="ticket-purchase-container">
        <h1 className="ticket-purchase-title">매장을 선택하세요.</h1>
        <div className="ticket-purchase-list">
          {stores.map((store) => (
            <div key={store.id} className="ticket-purchase-item" onClick={() => handleStoreClick(store)}>
              <img src={store.image} alt={store.name} className="ticket-purchase-img" />
              <div className="ticket-purchase-label">{store.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPage; 