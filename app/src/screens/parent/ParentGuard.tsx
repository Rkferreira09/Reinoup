import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { isParentAreaUnlocked } from '../../lib/parent-session';

export function ParentGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isParentAreaUnlocked()) return <Navigate to="/pais/pin" replace />;
  return <Outlet />;
}
