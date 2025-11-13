import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/myTicketPage.css';

function MyTicketPage() {
  const [activeTab, setActiveTab] = useState(0); // 0: 미사용, 1: 만료

  // 정적 데이터 (서버 연동 시 API로 대체)
  const tickets = useMemo(() => ([
    {
      id: 'TIC-001',
      status: 'UNUSED',
      title: '순두부 찌개',
      quantity: 1,
      place: '학생회관 식당 00코너',
      expiresAt: '2025-09-22 15:00'
    },
    {
      id: 'TIC-002',
      status: 'USED',
      title: '된장 찌개',
      quantity: 1,
      place: '학생회관 식당 00코너',
      expiresAt: '2025-09-22 15:00'
    },
    {
      id: 'TIC-003',
      status: 'UNUSED',
      title: '김치 찌개',
      quantity: 1,
      place: '자연계 식당 01코너',
      expiresAt: '2025-09-23 18:00'
    }
  ]), []);

  // 분류 규칙: 미사용, 만료
  const filtered = useMemo(() => {
    if (activeTab === 0) {
      return tickets.filter((t) => t.status === 'UNUSED');
    }
    return tickets.filter((t) => t.status !== 'UNUSED');
  }, [activeTab, tickets]);

  return (
    <>
      <Navbar />
      <div className="my-ticket-container">
        <h1 className="my-ticket-title">MY식권</h1>
        
        {/* 캡슐 탭 버튼 */}
        <div className="ticket-tab-container">
          <div className={`ticket-tab-slider ${activeTab === 1 ? 'active-1' : ''}`}>
            <button
              className={`ticket-tab-btn ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            >
              미사용 식권
            </button>
            <button
              className={`ticket-tab-btn ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              만료된 식권
            </button>
          </div>
        </div>

        {/* 티켓 리스트 */}
        <div className="ticket-list">
          {!Array.isArray(filtered) || filtered.length === 0 ? (
            <div className="no-ticket-message">식권이 없습니다.</div>
          ) : (
            filtered.map((t) => {
                    const expired = t.status !== 'UNUSED';
                    return (
                      <div key={t.id} className="ticket-item">
                        <div className="ticket-card-qr">
                          <div className="ticket-qr-placeholder">QR</div>
                        </div>
                        <div className="ticket-item-table">
                          <div className="ticket-row ticket-row-head">
                            <span className="ticket-label">사용 여부</span>
                            <span className="ticket-value">{expired ? '만료' : '미사용'}</span>
                          </div>
                          <div className="ticket-row">
                            <span className="ticket-label">상품명</span>
                            <div className="ticket-value">
                              <div className="ticket-line">
                                {t.title} <span className="ticket-pill">{t.quantity}개</span>
                              </div>
                            </div>
                          </div>
                          <div className="ticket-row ticket-row-thick">
                            <span className="ticket-label">유효 기간</span>
                            <span className="ticket-value">{t.expiresAt}까지</span>
                          </div>
                          <div className="ticket-row">
                            <span className="ticket-label">수령 위치</span>
                            <span className="ticket-value">{t.place}</span>
                          </div>
                        </div>
                      </div>
                    );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default MyTicketPage;