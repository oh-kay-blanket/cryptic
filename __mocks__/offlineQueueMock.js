// Mock for src/utils/offlineQueue.js
export const OperationType = {
  SYNC_CLUE: 'SYNC_CLUE',
  SYNC_PROFILE: 'SYNC_PROFILE',
  SYNC_ACHIEVEMENT: 'SYNC_ACHIEVEMENT',
};

export const processQueue = jest.fn().mockResolvedValue({ processed: 0, failed: 0 });
export const setupOfflineListeners = jest.fn().mockReturnValue(() => {});
export const isOnline = jest.fn().mockReturnValue(true);
export const enqueue = jest.fn();
export const dequeue = jest.fn();
export const clearQueue = jest.fn();
export const getPendingOperations = jest.fn().mockReturnValue([]);
export const createOfflineSyncHandler = jest.fn().mockImplementation((handler) => handler);
