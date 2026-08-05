import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BottomNav } from '../../components/ui/BottomNav';
import { AppLockOverlay } from '../../components/ui/AppLockOverlay';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { useAppLock } from '../../hooks/useAppLock';
import { useActivityTimer } from '../../hooks/useActivityTimer';
import { PageTransition } from '../../components/ui/PageTransition';

export function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const childProfile = useAuthStore((s) => s.childProfile);
  const ensureFreshDaily = useProgressStore((s) => s.ensureFreshDaily);
  const lock = useAppLock();
  const location = useLocation();

  useActivityTimer();

  useEffect(() => {
    ensureFreshDaily();
  }, [ensureFreshDaily]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!childProfile) return <Navigate to="/onboarding-crianca" replace />;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-cream">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
      <BottomNav />
      {lock.locked && lock.reason && <AppLockOverlay reason={lock.reason} />}
    </div>
  );
}
