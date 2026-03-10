// Mock implementation of @supabase/supabase-js for tests
const mockAuth = {
  getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
  onAuthStateChange: jest.fn().mockReturnValue({
    data: { subscription: { unsubscribe: jest.fn() } }
  }),
  signUp: jest.fn().mockResolvedValue({ data: null, error: null }),
  signInWithPassword: jest.fn().mockResolvedValue({ data: null, error: null }),
  signOut: jest.fn().mockResolvedValue({ error: null }),
  resetPasswordForEmail: jest.fn().mockResolvedValue({ error: null }),
  updateUser: jest.fn().mockResolvedValue({ error: null }),
};

const mockSupabaseClient = {
  auth: mockAuth,
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  }),
};

export const createClient = jest.fn().mockReturnValue(mockSupabaseClient);
