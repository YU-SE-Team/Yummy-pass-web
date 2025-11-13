import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RestaurantHeader from '../components/RestaurantHeader';
import CategoryTabs from '../components/CategoryTabs';
import MenuGrid from '../components/MenuGrid';
import OrderSummary from '../components/OrderSummary';
import MenuDetailModal from '../components/MenuDetailModal';
import PopularMenuBanner from '../components/PopularMenuBanner';
import { API_BASE_URL } from '../api';
import '../styles/kioskMenuPage.css';

function KioskMenuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { store } = location.state || {};
  
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [menus, setMenus] = useState([]);
  const [order, setOrder] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popularMenus, setPopularMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 카테고리 이름 매핑 (백엔드 enum -> 프론트 표시용)
  const categoryDisplayNames = {
    'KOREAN': '한식',
    'SPECIAL': '특식',
    'PORK': '돈가스',
    'A': 'A코너',
    'C1': 'C1코너',
    'C2': 'C2코너',
    'D': 'D코너',
    'SET': '세트'
  };

  // 한글 카테고리명 -> 영문 enum 매핑
  const categoryToEnum = {
    '한식': 'KOREAN',
    '특식': 'SPECIAL',
    '스페셜': 'SPECIAL',
    '돈가스': 'PORK',      // "돈가스" 추가
    'A코너': 'A',
    'C1코너': 'C1',
    'C2코너': 'C2',
    'D코너': 'D',
    '세트': 'SET'
  };
  
  // PaymentPage에서 돌아올 때 주문 정보 복원
  useEffect(() => {
    if (location.state && location.state.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  // 컴포넌트 마운트 시: 카테고리 목록 및 인기 메뉴 조회
  useEffect(() => {
    if (store && store.restaurantId) {
      fetchCategoriesAndPopularMenus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  // 카테고리 변경 시: 해당 카테고리의 메뉴 조회
  useEffect(() => {
    if (categories.length > 0 && store && store.restaurantId) {
      const currentCategory = categories[activeCategory];
      if (currentCategory) {
        fetchMenusByCategory(store.restaurantId, currentCategory);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, categories, store]);

  // 카테고리 목록 및 인기 메뉴 조회
  const fetchCategoriesAndPopularMenus = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 카테고리 목록 조회
      const categoriesResponse = await fetch(
        `${API_BASE_URL}/api/admin/menu/categories/${store.restaurantId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        // 한글 카테고리명을 영문 enum으로 변환
        const enumCategories = categoriesData.map(cat => categoryToEnum[cat] || cat);
        setCategories(enumCategories);
        
        // 첫 번째 카테고리의 메뉴 자동 로드
        if (enumCategories.length > 0) {
          await fetchMenusByCategory(store.restaurantId, enumCategories[0]);
        }
      }

      // 인기 메뉴 조회
      const popularResponse = await fetch(
        `${API_BASE_URL}/api/menus/sales-snapshots/restaurant/${store.restaurantId}/popular-menus`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (popularResponse.ok) {
        const popularData = await popularResponse.json();
        setPopularMenus(popularData.menuNames || []);
      }

    } catch (err) {
      console.error('카테고리 조회 오류:', err);
      setError('메뉴 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 특정 카테고리의 메뉴 목록 조회
  const fetchMenusByCategory = async (restaurantId, category) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/menus/${restaurantId}/${category}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formattedMenus = data.map(menu => ({
          id: menu.id,
          name: menu.name,
          imageUrl: menu.photoUrl,
          price: menu.price
        }));
        
        setMenus(formattedMenus);
      } else if (response.status === 404) {
        setMenus([]);
      } else {
        setError('메뉴를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('메뉴 조회 오류:', err);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = async (menu) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/menus/${menu.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.ok) {
        const detailData = await response.json();
        setSelectedMenu({
          ...menu,
          remainingTickets: detailData.remainingTickets
        });
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('메뉴 상세 조회 오류:', err);
      setSelectedMenu(menu);
      setIsModalOpen(true);
    }
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

  const handleQuantityChange = (itemId, change) => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === itemId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
          // 수량이 0 이하면 주문에서 제거
          return prevOrder.filter(item => item.id !== itemId);
        } else {
          // 수량 업데이트
          return prevOrder.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
        }
      }
      return prevOrder;
    });
  };

  // 로딩 중 UI
  if (isLoading && menus.length === 0) {
    return (
      <>
        <Navbar />
        <div className="kiosk-menu-container">
          <RestaurantHeader 
            restaurantName={store?.name || '식당'}
            onBackClick={handleBackToStores}
          />
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            로딩 중...
          </div>
        </div>
      </>
    );
  }

  // 에러 UI
  if (error) {
    return (
      <>
        <Navbar />
        <div className="kiosk-menu-container">
          <RestaurantHeader 
            restaurantName={store?.name || '식당'}
            onBackClick={handleBackToStores}
          />
          <div style={{ textAlign: 'center', padding: '50px', color: '#ff4444' }}>
            {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="kiosk-menu-container">
        <RestaurantHeader 
          restaurantName={store?.name || '식당'}
          onBackClick={handleBackToStores}
        />
        
        <CategoryTabs 
          categories={categories.map(cat => ({
            name: categoryDisplayNames[cat] || cat
          }))}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        
        {popularMenus.length > 0 && (
          <PopularMenuBanner menuNames={popularMenus} />
        )}

        <MenuGrid 
          menus={menus}
          onMenuClick={handleMenuClick}
        />

        <OrderSummary 
          order={order}
          onCancelOrder={handleCancelOrder}
          onCheckout={handleCheckout}
          onQuantityChange={handleQuantityChange}
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
          category={categoryDisplayNames[categories[activeCategory]] || categories[activeCategory]}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onPurchase={handleModalPurchase}
        />
      )}
    </>
  );
}

export default KioskMenuPage;

