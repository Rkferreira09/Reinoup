const PARENT_AREA_FLAG = 'reinoup-pais-unlocked';

export function unlockParentArea() {
  sessionStorage.setItem(PARENT_AREA_FLAG, 'true');
}

export function lockParentArea() {
  sessionStorage.removeItem(PARENT_AREA_FLAG);
}

export function isParentAreaUnlocked() {
  return sessionStorage.getItem(PARENT_AREA_FLAG) === 'true';
}
