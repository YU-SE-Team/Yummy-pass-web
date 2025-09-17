import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/adminPage.css';

function AdminPage() {
  const navigate = useNavigate();

  // 매장 데이터
  const stores = [
    {
      id: 'student-hall',
      name: '학생회관 식당 관리',
      image: '학생회관 식당 이미지'
    },
    {
      id: 'natural-science',
      name: '자연계 식당 관리',
      image: '자연계 식당 이미지'
    },
    {
      id: 'faculty',
      name: '교직원 식당 관리',
      image: '교직원 식당 이미지'
    }
  ];

  const handleStoreClick = (store) => {
    navigate('/admin-menu-manage', { state: { store } });
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h1 className="admin-title">매장을 선택하세요.</h1>
        <div className="admin-list">
          {stores.map((store) => (
            <div key={store.id} className="admin-item" onClick={() => handleStoreClick(store)}>
              <div className="admin-img">{store.image}</div>
              <div className="admin-label">{store.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPage; 