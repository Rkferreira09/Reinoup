/**
 * Armazém genérico de blobs (áudio) em IndexedDB — usado por qualquer recurso
 * que precise guardar gravações localmente, sem nunca subir para o servidor
 * (ex.: narração da "Voz da Família", pedidos do Diário de Orações).
 *
 * localStorage é pequeno demais e síncrono demais para áudio; IndexedDB é o
 * jeito certo de guardar isso apenas no aparelho.
 */
export interface BlobStore {
  save(key: string, blob: Blob): Promise<void>;
  get(key: string): Promise<Blob | undefined>;
  remove(key: string): Promise<void>;
}

function openDb(dbName: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB não suportado'));
      return;
    }
    const req = indexedDB.open(dbName, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function createBlobStore(dbName: string, storeName = 'blobs'): BlobStore {
  return {
    async save(key, blob) {
      const db = await openDb(dbName, storeName);
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(blob, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    },

    async get(key) {
      const db = await openDb(dbName, storeName);
      const blob = await new Promise<Blob | undefined>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).get(key);
        req.onsuccess = () => resolve(req.result as Blob | undefined);
        req.onerror = () => reject(req.error);
      });
      db.close();
      return blob;
    },

    async remove(key) {
      const db = await openDb(dbName, storeName);
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    },
  };
}
