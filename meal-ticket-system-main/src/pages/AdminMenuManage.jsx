import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MenuModal from '../components/MenuModal';
import '../styles/adminMenuManage.css';

function AdminMenuManage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 전달받은 매장 정보
  const store = location.state?.store || { name: '학생회관 식당' };

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  // 메뉴 목록 상태
  const [menuList, setMenuList] = useState([
    { id: 1, name: '짜장볶음밥', visible: true, price: 5000, tickets: 65, category: '중식' },
    { id: 2, name: '김치 볶음밥', visible: false, price: 5000, tickets: 20, category: '한식' },
    { id: 3, name: '부대찌개 세트', visible: true, price: 6500, tickets: 500, category: '정식' }
  ]);

  // 카테고리 옵션
  const categories = ['한식', '중식', '일식', '정식', '분식'];

  // 메뉴 등록/수정 핸들러
  const handleMenuSubmit = (menuData) => {
    if (editingMenu) {
      // 수정
      setMenuList(prev => prev.map(menu => 
        menu.id === editingMenu.id 
          ? { ...menu, ...menuData, id: editingMenu.id, visible: menu.visible }
          : menu
      ));
      setEditingMenu(null);
    } else {
      // 신규 등록
      const newMenu = {
        id: Date.now(),
        ...menuData
      };
      setMenuList(prev => [...prev, newMenu]);
    }
  };

  // 모달 열기/닫기 핸들러
  const handleOpenModal = () => {
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMenu(null);
  };

  // 메뉴 삭제 핸들러
  const handleDelete = (id) => {
    setMenuList(prev => prev.filter(menu => menu.id !== id));
  };

  // 메뉴 수정 핸들러
  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  // visible 토글 핸들러
  const handleToggleVisible = (id) => {
    setMenuList(prev => prev.map(menu => 
      menu.id === id ? { ...menu, visible: !menu.visible } : menu
    ));
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
          {/* 메뉴 현황 섹션 */}
          <div className="admin-menu-status-section">
            <div className="admin-menu-status-header">
              <h2 className="admin-menu-status-title">메뉴 현황</h2>
              <button className="admin-menu-add-btn" onClick={handleOpenModal}>
                등록하기
              </button>
            </div>
            <div className="admin-menu-table-container">
              <table className="admin-menu-table">
                <thead>
                  <tr>
                    <th>menu</th>
                    <th>표시상태</th>
                    <th>price</th>
                    <th>tickets</th>
                    <th>category</th>
                    <th>수정</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {menuList.map(menu => (
                    <tr key={menu.id}>
                      <td>{menu.name}</td>
                      <td>
                        <button 
                          className={`admin-menu-toggle-btn ${menu.visible ? 'visible' : 'hidden'}`}
                          onClick={() => handleToggleVisible(menu.id)}
                        >
                          {menu.visible ? '표시중' : '숨김'}
                        </button>
                      </td>
                      <td>{menu.price.toLocaleString()}</td>
                      <td>{menu.tickets}</td>
                      <td>{menu.category}</td>
                      <td>
                        <button 
                          className="admin-menu-edit-btn"
                          onClick={() => handleEdit(menu)}
                        >
                          ✏️ 수정
                        </button>
                      </td>
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

        {/* 버튼 그룹 */}
        <div className="admin-menu-button-group">
          <button className="admin-menu-back-btn" onClick={handleBack}>
            이전으로
          </button>
          <button className="admin-menu-confirm-btn" onClick={() => alert('변경사항이 저장되었습니다!')}>
            완료
          </button>
        </div>
      </div>

      {/* 모달 */}
      <MenuModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleMenuSubmit}
        initialData={editingMenu}
      />
    </>
  );
}

export default AdminMenuManage;
