import React from 'react';

/**
 * 주문 요약 컴포넌트
 * @param {Object} props
 * @param {Array} props.order - 주문 목록
 * @param {Function} props.onCancelOrder - 전체 취소 핸들러
 * @param {Function} props.onCheckout - 결제하기 핸들러
 */
function OrderSummary({ order, onCancelOrder, onCheckout }) {
  // 주문 요약 계산
  const totalAmount = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
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
        <button className="kiosk-cancel-btn" onClick={onCancelOrder}>
          전체취소
        </button>
        <button className="kiosk-checkout-btn" onClick={onCheckout}>
          결제하기
        </button>
      </div>
    </>
  );
}

export default OrderSummary;
