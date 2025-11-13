import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../api';
import '../styles/paymentPage.css';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  //정보
  const { order, store, menu, categoryName } = location.state || {};
  
  //총액
  const totalAmount = order ? 
    order.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 
    menu.price;
  
  const totalItems = order ? 
    order.reduce((sum, item) => sum + item.quantity, 0) : 
    1;


  const userName = localStorage.getItem('userName') || '사용자';
  const accessToken = localStorage.getItem('accessToken');
  
  const currentDate = new Date().toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleBack = () => {
    navigate('/kiosk', { state: { order, store } });
  };

  const handlePurchase = async () => {
    setIsLoading(true);

    try {
      // 주문 데이터 구성
      const orderData = {
        restaurantId: store.restaurantId,
        items: order.map(item => ({
          menuId: item.id,
          quantity: item.quantity
        })),
        totalAmount: totalAmount,
        paymentMethod: 'NAVER_PAY'
      };

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        // 성공 시 완료 페이지로 이동
        navigate('/payment-complete', { 
          state: { 
            order, 
            store, 
            menu,
            orderId: result.orderId,
            tickets: result.tickets 
          } 
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || '결제에 실패했습니다.');
      }
    } catch (err) {
      console.error('결제 오류:', err);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="payment-container">
        <div className="payment-header">
          <h1 className="payment-title">주문 결제</h1>
          <div className="payment-divider"></div>
        </div>
        
        <div className="payment-layout">
          <div className="payment-left">
            <div className="payment-section">
              <h2 className="section-title">구매자 정보</h2>
              <div className="section-divider"></div>
              <div className="info-row">
                <span className="info-label">이름</span>
                <span className="info-value">{userName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">날짜</span>
                <span className="info-value">{currentDate}</span>
              </div>
            </div>

            <div className="payment-section">
              <h2 className="section-title">상품 정보</h2>
              <div className="section-divider"></div>
              {order && order.length > 0 ? (
                <>
                  {order.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="info-row">
                        <span className="info-label">메뉴</span>
                        <span className="info-value">{item.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">수량</span>
                        <span className="info-value">{item.quantity}개</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">금액</span>
                        <span className="info-value">{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                      {index < order.length - 1 && <div className="order-divider"></div>}
                    </div>
                  ))}
                  <div className="info-row">
                    <span className="info-label">수령 위치</span>
                    <span className="info-value">{store.name} {categoryName}코너</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-row">
                    <span className="info-label">이름</span>
                    <span className="info-value">{menu.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">금액</span>
                    <span className="info-value">{menu.price.toLocaleString()}원</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">수령 위치</span>
                    <span className="info-value">{store.name} {categoryName}코너</span>
                  </div>
                </>
              )}
            </div>

            <div className="payment-section">
              <h2 className="section-title">결제 방식</h2>
              <div className="section-divider"></div>
              <div className="payment-methods-grid">
                <button className="payment-method-btn active">네이버 페이</button>
                <button className="payment-method-btn">신용카드</button>
                <button className="payment-method-btn empty"></button>
                <button className="payment-method-btn empty"></button>
              </div>
            </div>

            <div className="payment-notice">
              실제 음식이 나오기까지는 시간이 00분 소요될 수 있습니다.
            </div>
          </div>  

          <div className="payment-right">
            <div className="payment-summary-box">
              <h2 className="section-title">결제 금액</h2>
              <div className="section-divider"></div>
              <div className="summary-content">
                <div className="summary-item">구매 금액</div>
                <div className="summary-item">관련 정보</div>
              </div>
              <div className="summary-total">
                <span className="total-count">총 {totalItems}건</span>
                <span className="total-amount">{totalAmount.toLocaleString()}원</span>
              </div>
              <div className="summary-buttons">
                <button 
                  className="summary-purchase-btn" 
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? '처리 중...' : '구매하기'}
                </button>
                <button className="summary-back-btn" onClick={handleBack} disabled={isLoading}>
                  이전으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage; 