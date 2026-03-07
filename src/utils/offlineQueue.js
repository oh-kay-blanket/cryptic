/**
 * Offline queue for sync operations
 * Stores operations when offline and processes them when back online
 */

const QUEUE_STORAGE_KEY = 'lcSyncQueue';

// Operation types
export const OperationType = {
  SYNC_CLUE: 'SYNC_CLUE',
  SYNC_PROFILE: 'SYNC_PROFILE',
  SYNC_ACHIEVEMENT: 'SYNC_ACHIEVEMENT',
};

/**
 * Get the current queue from localStorage
 */
const getQueue = () => {
  if (typeof window === 'undefined') return [];
  try {
    const queue = localStorage.getItem(QUEUE_STORAGE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch {
    return [];
  }
};

/**
 * Save queue to localStorage
 */
const saveQueue = (queue) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to save sync queue:', error);
  }
};

/**
 * Add an operation to the queue
 */
export const enqueue = (operation) => {
  const queue = getQueue();

  // Dedupe: remove existing operation with same type and ID
  const filteredQueue = queue.filter((op) => {
    if (op.type !== operation.type) return true;

    switch (op.type) {
      case OperationType.SYNC_CLUE:
        return op.data.clid !== operation.data.clid;
      case OperationType.SYNC_ACHIEVEMENT:
        return op.data.achievementId !== operation.data.achievementId;
      case OperationType.SYNC_PROFILE:
        return false; // Only keep one profile sync
      default:
        return true;
    }
  });

  filteredQueue.push({
    ...operation,
    timestamp: Date.now(),
  });

  saveQueue(filteredQueue);
};

/**
 * Remove an operation from the queue
 */
export const dequeue = (operation) => {
  const queue = getQueue();
  const filteredQueue = queue.filter((op) => {
    if (op.type !== operation.type || op.timestamp !== operation.timestamp) return true;
    return false;
  });
  saveQueue(filteredQueue);
};

/**
 * Clear the entire queue
 */
export const clearQueue = () => {
  saveQueue([]);
};

/**
 * Get all pending operations
 */
export const getPendingOperations = () => {
  return getQueue();
};

/**
 * Check if we're online
 */
export const isOnline = () => {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
};

/**
 * Process the queue
 */
export const processQueue = async (syncHandlers, userId) => {
  if (!isOnline() || !userId) return { processed: 0, failed: 0 };

  const queue = getQueue();
  if (queue.length === 0) return { processed: 0, failed: 0 };

  let processed = 0;
  let failed = 0;
  const failedOps = [];

  for (const operation of queue) {
    try {
      let result;

      switch (operation.type) {
        case OperationType.SYNC_CLUE:
          result = await syncHandlers.syncClue(userId, operation.data);
          break;
        case OperationType.SYNC_PROFILE:
          result = await syncHandlers.syncProfile(userId, operation.data);
          break;
        case OperationType.SYNC_ACHIEVEMENT:
          result = await syncHandlers.syncAchievement(
            userId,
            operation.data.achievementId,
            operation.data
          );
          break;
        default:
          console.warn('Unknown operation type:', operation.type);
          continue;
      }

      if (result?.error) {
        failedOps.push(operation);
        failed++;
      } else {
        processed++;
      }
    } catch (error) {
      console.error('Error processing queue operation:', error);
      failedOps.push(operation);
      failed++;
    }
  }

  // Save failed operations back to queue
  saveQueue(failedOps);

  return { processed, failed };
};

/**
 * Create a sync handler that queues when offline
 */
export const createOfflineSyncHandler = (onlineHandler, operationType) => {
  return async (userId, data) => {
    if (isOnline()) {
      const result = await onlineHandler(userId, data);
      if (result?.error) {
        // If online sync failed, queue it
        enqueue({ type: operationType, data, userId });
      }
      return result;
    } else {
      // Queue for later
      enqueue({ type: operationType, data, userId });
      return { error: null, queued: true };
    }
  };
};

/**
 * Set up online/offline event listeners
 */
export const setupOfflineListeners = (onOnline, onOffline) => {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => {
    console.log('Back online - processing sync queue');
    onOnline?.();
  };

  const handleOffline = () => {
    console.log('Gone offline - operations will be queued');
    onOffline?.();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
