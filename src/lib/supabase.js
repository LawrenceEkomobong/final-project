import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials are valid (not empty and not placeholders)
const hasCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== import.meta.env.VITE_SUPABASE_URL && 
  supabaseAnonKey !== import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient;

if (hasCredentials) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

// Fallback Mock Client if credentials are not configured
if (!supabaseClient) {
  console.warn('Supabase credentials missing or placeholder. Running in Mock Client Mode.');
  
  // Helper to get/set mock state
  const getMockState = () => {
    const defaultUser = JSON.parse(localStorage.getItem('mock_user')) || null;
    return { user: defaultUser };
  };

  const listeners = new Set();

  supabaseClient = {
    isMock: true,
    auth: {
      getSession: async () => {
        const { user } = getMockState();
        if (user) {
          return { data: { session: { user, access_token: 'mock-token' } }, error: null };
        }
        return { data: { session: null }, error: null };
      },
      
      onAuthStateChange: (callback) => {
        listeners.add(callback);
        const { user } = getMockState();
        const session = user ? { user, access_token: 'mock-token' } : null;
        
        // Initial call
        callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', session);
        
        return {
          data: {
            subscription: {
              unsubscribe: () => {
                listeners.delete(callback);
              }
            }
          }
        };
      },
      
      signUp: async ({ email }) => {
        await new Promise(r => setTimeout(r, 1000)); // Simulate network latency
        
        const mockUser = {
          id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
          email,
          created_at: new Date().toISOString()
        };
        
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        const session = { user: mockUser, access_token: 'mock-token' };
        
        listeners.forEach(cb => cb('SIGNED_IN', session));
        return { data: { user: mockUser, session }, error: null };
      },
      
      signInWithPassword: async ({ email }) => {
        await new Promise(r => setTimeout(r, 1000)); // Simulate network latency
        
        // Simple mock login validation (any password works for demo)
        const mockUser = {
          id: 'mock-user-12345',
          email,
          created_at: new Date().toISOString()
        };
        
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        const session = { user: mockUser, access_token: 'mock-token' };
        
        listeners.forEach(cb => cb('SIGNED_IN', session));
        return { data: { user: mockUser, session }, error: null };
      },
      
      signOut: async () => {
        localStorage.removeItem('mock_user');
        listeners.forEach(cb => cb('SIGNED_OUT', null));
        return { error: null };
      }
    },
    
    from: (table) => {
      return {
        select: () => ({
          eq: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
            then: (resolve) => resolve({ data: [], error: null })
          }),
          then: (resolve) => resolve({ data: [], error: null })
        }),
        insert: (data) => {
          // Log order details or save them in localStorage
          if (table === 'orders') {
            const currentOrders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
            const newOrder = {
              id: 'mock-order-' + Math.random().toString(36).substr(2, 9),
              ...data,
              created_at: new Date().toISOString()
            };
            currentOrders.push(newOrder);
            localStorage.setItem('mock_orders', JSON.stringify(currentOrders));
            
            return {
              select: () => ({
                single: () => Promise.resolve({ data: newOrder, error: null }),
                then: (resolve) => resolve({ data: [newOrder], error: null })
              }),
              then: (resolve) => resolve({ data: [newOrder], error: null })
            };
          }
          return {
            then: (resolve) => resolve({ data, error: null })
          };
        }
      };
    }
  };
}

export const supabase = supabaseClient;
