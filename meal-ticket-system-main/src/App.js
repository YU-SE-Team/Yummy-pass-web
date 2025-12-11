import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import ProtectedRoute from './components/ProtectedRoute';
import NewLoginPage from './pages/NewLoginPage';
import TicketPurchase from './pages/TicketPurchase';
import PaymentPage from './pages/PaymentPage';
import PaymentCompletePage from './pages/PaymentCompletePage';
import MyTicketPage from './pages/MyTicketPage';
import AdminPage from './pages/AdminPage';
import AdminMenuManage from './pages/AdminMenuManage';
import QRCodePage from './pages/QRCodePage';
import SignUp from './pages/SignUp';
import SocialSignUpPhone from './pages/SocialSignUpPhone';
import KioskMenuPage from './pages/KioskMenuPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<NewLoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/social-signup-phone" element={<SocialSignUpPhone />} />
          
          {/* 학생 전용 페이지 */}
          <Route path="/kiosk" element={<ProtectedRoute allowedRoles={['STUDENT']}><KioskMenuPage /></ProtectedRoute>} />
          <Route path="/ticket-purchase" element={<ProtectedRoute allowedRoles={['STUDENT']}><TicketPurchase /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute allowedRoles={['STUDENT']}><PaymentPage /></ProtectedRoute>} />
          <Route path="/payment-complete" element={<ProtectedRoute allowedRoles={['STUDENT']}><PaymentCompletePage /></ProtectedRoute>} />
          <Route path="/my-ticket" element={<ProtectedRoute allowedRoles={['STUDENT']}><MyTicketPage /></ProtectedRoute>} />
          
          {/* 관리자 전용 페이지 */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminPage /></ProtectedRoute>} />
          <Route path="/admin-menu-manage" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminMenuManage /></ProtectedRoute>} />
          <Route path="/qr-code" element={<ProtectedRoute allowedRoles={['ADMIN']}><QRCodePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
