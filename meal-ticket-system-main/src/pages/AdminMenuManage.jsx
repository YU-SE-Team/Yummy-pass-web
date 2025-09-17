import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/adminMenuManage.css';

function AdminMenuManage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 전달받은 매장 정보
  const store = location.state?.store || { name: '학생회관 식당' };

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    menuName: '',
    price: '',
    tickets: '',
    category: '',
    visible: true
  });

  // 메뉴 목록 상태
  const [menuList, setMenuList] = useState([
    { id: 1, name: '짜장볶음밥', visible: true, price: 5000, tickets: 65, category: '중식' },
    { id: 2, name: '김치 볶음밥', visible: false, price: 5000, tickets: 20, category: '한식' },
    { id: 3, name: '부대찌개 세트', visible: true, price: 6500, tickets: 500, category: '정식' }
  ]);

  // 카테고리 옵션
  const categories = ['한식', '중식', '일식', '정식', '분식'];

  // 폼 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 메뉴 등록 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.menuName && formData.price && formData.tickets && formData.category) {
      const newMenu = {
        id: Date.now(),
        name: formData.menuName,
        visible: formData.visible,
        price: parseInt(formData.price),
        tickets: parseInt(formData.tickets),
        category: formData.category
      };
      setMenuList(prev => [...prev, newMenu]);
      setFormData({
        menuName: '',
        price: '',
        tickets: '',
        category: '',
        visible: true
      });
    }
  };

  // 메뉴 삭제 핸들러
  const handleDelete = (id) => {
    setMenuList(prev => prev.filter(menu => menu.id !== id));
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <>
      <Navbar />
      <div className="admin-menu-manage-container">
        <div className="admin-menu-manage-header">
          <h1 className="admin-menu-manage-title">{store.name} 학식메뉴 관리</h1>
        </div>

        <div className="admin-menu-manage-content">
          {/* 메뉴 등록/수정 섹션 */}
          <div className="admin-menu-form-section">
            <h2 className="admin-menu-form-title">메뉴 등록</h2>
            <form onSubmit={handleSubmit} className="admin-menu-form">
              <div className="admin-menu-form-group">
                <label className="admin-menu-form-label">추가할 메뉴</label>
                <input
                  type="text"
                  name="menuName"
                  value={formData.menuName}
                  onChange={handleInputChange}
                  placeholder="메뉴 이름을 입력하세요."
                  className="admin-menu-form-input"
                  required
                />
              </div>

              <div className="admin-menu-form-group">
                <label className="admin-menu-form-label">가격</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="가격을 입력하세요."
                  className="admin-menu-form-input"
                  required
                />
              </div>

              <div className="admin-menu-form-group">
                <label className="admin-menu-form-label">식권 매수</label>
                <input
                  type="number"
                  name="tickets"
                  value={formData.tickets}
                  onChange={handleInputChange}
                  placeholder="식권 매수를 입력하세요."
                  className="admin-menu-form-input"
                  required
                />
              </div>

              <div className="admin-menu-form-group">
                <label className="admin-menu-form-label">카테고리</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="admin-menu-form-select"
                  required
                >
                  <option value="">카테고리를 선택하세요</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="admin-menu-form-group">
                <label className="admin-menu-form-label">메뉴 표시하기 *</label>
                <div className="admin-menu-checkbox-group">
                  <label className="admin-menu-checkbox-label">
                    <input
                      type="checkbox"
                      name="visible"
                      checked={formData.visible}
                      onChange={handleInputChange}
                    />
                    메뉴 표시
                  </label>
                </div>
              </div>

              <button type="submit" className="admin-menu-submit-btn">
                등록하기
              </button>
            </form>
          </div>

          {/* 메뉴 현황 섹션 */}
          <div className="admin-menu-status-section">
            <h2 className="admin-menu-status-title">메뉴 현황</h2>
            <div className="admin-menu-table-container">
              <table className="admin-menu-table">
                <thead>
                  <tr>
                    <th>menu</th>
                    <th>visible</th>
                    <th>price</th>
                    <th>tickets</th>
                    <th>category</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {menuList.map(menu => (
                    <tr key={menu.id}>
                      <td>{menu.name}</td>
                      <td>{menu.visible ? 'Yes' : 'No'}</td>
                      <td>{menu.price.toLocaleString()}</td>
                      <td>{menu.tickets}</td>
                      <td>{menu.category}</td>
                      <td>
                        <button 
                          className="admin-menu-delete-btn"
                          onClick={() => handleDelete(menu.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button className="admin-menu-back-btn" onClick={handleBack}>
          이전으로
        </button>
      </div>
    </>
  );
}

export default AdminMenuManage;
