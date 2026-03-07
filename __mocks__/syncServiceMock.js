// Mock for src/utils/syncService.js
export const localToCloud = {
  profile: jest.fn(),
  completedClues: jest.fn(),
  achievements: jest.fn(),
};

export const cloudToLocal = {
  profile: jest.fn(),
  completedClues: jest.fn(),
  achievements: jest.fn(),
};

export const fetchCloudData = jest.fn().mockResolvedValue({ data: null, error: null });
export const uploadLocalData = jest.fn().mockResolvedValue({ error: null });
export const mergeData = jest.fn().mockImplementation((local, cloud) => local);
export const hasLocalOnlyData = jest.fn().mockReturnValue(false);
export const syncCompletedClue = jest.fn().mockResolvedValue({ error: null });
export const syncProfile = jest.fn().mockResolvedValue({ error: null });
export const syncAchievement = jest.fn().mockResolvedValue({ error: null });
