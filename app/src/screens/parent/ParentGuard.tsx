import { Navigate, Outlet } from 'react-router-dom';

const FLAG = 'reinoup-pais-unlocked';

export function unlockParentArea() {
  sessionStorage.setItem(FLAG, 'true');
}

export function lockParentArea() {
  sessionStorage.removeItem(FLAG);
}

function isParentAreaUnlocked() {
  return sessionStorage.getItem(FLAG) === 'true';
}

export function ParentGuard() {
  if (!isParentAreaUnlocked()) return <Navigate to="/pais/pin" replace />;
  return <Outlet />;
}
