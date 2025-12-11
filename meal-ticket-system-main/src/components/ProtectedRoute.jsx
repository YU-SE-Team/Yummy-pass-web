import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const userRole = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  // 로그인하지 않은 경우
  if (!accessToken || !userRole) {
    alert('로그인이 필요한 서비스입니다.');
    return <Navigate to="/" replace />;
  }

  // 역할이 있지만 페이지와 맞지 않는 경우
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    alert('허가되지 않은 접근입니다.');
    const redirectPath = userRole === 'ADMIN' ? '/admin' : '/ticket-purchase';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
