import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { useSettingsStore } from '../store/settingsStore';
import { useFriendsStore } from '../store/friendsStore';

export function exportAllData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    auth: useAuthStore.getState(),
    progress: useProgressStore.getState(),
    settings: useSettingsStore.getState(),
    friends: useFriendsStore.getState(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reinoup-dados-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function eraseAllData() {
  localStorage.removeItem('reinoup-auth');
  localStorage.removeItem('reinoup-progress');
  localStorage.removeItem('reinoup-settings');
  localStorage.removeItem('reinoup-friends');
  window.location.href = '/';
}
