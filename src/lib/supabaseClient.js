import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/;$/, '')
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/;$/, '')

const hasCredentials =
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your_supabase') &&
  !supabaseAnonKey.includes('your_supabase') &&
  supabaseAnonKey.startsWith('eyJ') // Real Supabase keys are JWTs starting with eyJ

let supabaseClient

if (hasCredentials) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase credentials missing or placeholder/mock key. Using mock client.')

  const loadMockStore = () => {
    let storedProducts = localStorage.getItem('mock_products')
    if (!storedProducts) {
      const defaultProducts = [
        {
          id: 'prod-1',
          name: 'Signature Red Velvet Cake',
          description: 'Rich cocoa layers, velvety cream cheese frosting, and signature red crumbs.',
          price: 25000,
          category: 'Cakes',
          image_url: '/src/assets/Product1.png',
          is_featured: true,
          created_at: new Date('2026-06-01T12:00:00Z').toISOString()
        },
        {
          id: 'prod-2',
          name: 'Chocolate Fudge Delight',
          description: 'Decadent dark chocolate fudge, moist sponge, and premium chocolate curls.',
          price: 28000,
          category: 'Cakes',
          image_url: '/src/assets/Product2.png',
          is_featured: true,
          created_at: new Date('2026-06-02T12:00:00Z').toISOString()
        },
        {
          id: 'prod-3',
          name: 'Coconut Lemon Cake',
          description: 'Zesty lemon curd filled sponge covered with toasted organic coconut flakes.',
          price: 22000,
          category: 'Cakes',
          image_url: '/src/assets/Product3.png',
          is_featured: false,
          created_at: new Date('2026-06-03T12:00:00Z').toISOString()
        },
        {
          id: 'prod-4',
          name: 'Strawberry Vanilla Cream',
          description: 'Moist vanilla layers stuffed with fresh strawberries and whipped cream.',
          price: 24000,
          category: 'Cakes',
          image_url: '/src/assets/Product4.png',
          is_featured: true,
          created_at: new Date('2026-06-04T12:00:00Z').toISOString()
        },
        {
          id: 'prod-5',
          name: 'Salted Caramel Drip',
          description: 'Sweet and salty caramel buttercream, rich sponge, and dark caramel drip.',
          price: 26000,
          category: 'Cakes',
          image_url: '/src/assets/Product5.png',
          is_featured: false,
          created_at: new Date('2026-06-05T12:00:00Z').toISOString()
        },
        {
          id: 'prod-6',
          name: 'Classic Carrot Cake',
          description: 'Spiced carrot sponge with walnuts, raisins, and traditional cream cheese glaze.',
          price: 23000,
          category: 'Cakes',
          image_url: '/src/assets/Product6.png',
          is_featured: false,
          created_at: new Date('2026-06-06T12:00:00Z').toISOString()
        },
        {
          id: 'prod-7',
          name: 'Oreo Cookies & Cream',
          description: 'Crushed Oreo infusion, sweet cream frosting, and double chocolate drizzle.',
          price: 27000,
          category: 'Cakes',
          image_url: '/src/assets/Product7.png',
          is_featured: false,
          created_at: new Date('2026-06-07T12:00:00Z').toISOString()
        },
        {
          id: 'prod-8',
          name: 'Spiced Peppered Snail',
          description: 'Jumbo African land snails sautéed in hot habanero and bell pepper sauce.',
          price: 15000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product8.png',
          is_featured: true,
          created_at: new Date('2026-06-08T12:00:00Z').toISOString()
        },
        {
          id: 'prod-9',
          name: 'Gourmet Seafood Okra',
          description: 'Traditional rich okra soup loaded with fresh prawns, crabs, fish, and calamari.',
          price: 18000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product9.jpg',
          is_featured: true,
          created_at: new Date('2026-06-09T12:00:00Z').toISOString()
        },
        {
          id: 'prod-10',
          name: 'Native Jollof Rice',
          description: 'Smoky firewood-style native rice cooked with dried fish, prawns, and local spices.',
          price: 12000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product10.jpg',
          is_featured: false,
          created_at: new Date('2026-06-10T12:00:00Z').toISOString()
        },
        {
          id: 'prod-11',
          name: 'Slow-Cooked Goat Meat Asun',
          description: 'Tender goat meat cubes chargrilled and tossed in spicy crushed peppers.',
          price: 10000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product11.jpg',
          is_featured: false,
          created_at: new Date('2026-06-11T12:00:00Z').toISOString()
        },
        {
          id: 'prod-12',
          name: 'Creamy Seafood Pasta',
          description: 'Al dente penne pasta tossed in rich garlic cream sauce with prawns and herbs.',
          price: 14000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product12.jpg',
          is_featured: false,
          created_at: new Date('2026-06-12T12:00:00Z').toISOString()
        },
        {
          id: 'prod-13',
          name: 'Chef\'s Special Salad',
          description: 'Crisp garden greens, avocado, grilled chicken breast, and honey mustard dressing.',
          price: 8000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product13.jpg',
          is_featured: false,
          created_at: new Date('2026-06-13T12:00:00Z').toISOString()
        },
        {
          id: 'prod-14',
          name: 'Premium Beef Ribs',
          description: 'Fall-off-the-bone beef ribs glazed in homemade hickory BBQ sauce.',
          price: 19000,
          category: 'Culinary Dishes',
          image_url: '/src/assets/Product14.jpg',
          is_featured: true,
          created_at: new Date('2026-06-14T12:00:00Z').toISOString()
        }
      ]
      localStorage.setItem('mock_products', JSON.stringify(defaultProducts))
      storedProducts = JSON.stringify(defaultProducts)
    }

    return {
      profiles: JSON.parse(localStorage.getItem('mock_profiles') || '[]'),
      orders: JSON.parse(localStorage.getItem('mock_orders') || '[]'),
      products: JSON.parse(storedProducts),
    }
  }

  const saveMockStore = ({ profiles, orders, products }) => {
    localStorage.setItem('mock_profiles', JSON.stringify(profiles))
    localStorage.setItem('mock_orders', JSON.stringify(orders))
    if (products) {
      localStorage.setItem('mock_products', JSON.stringify(products))
    }
  }

  const createMockId = (email) => {
    return `mock-user-${email.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 12)}`
  }

  const ensureMockProfile = (user, partial = {}) => {
    const { profiles, orders, products } = loadMockStore()
    const existing = profiles.find((profile) => profile.id === user.id)
    const role = partial.role || existing?.role || (user.email === 'admin@kbifood.com' ? 'admin' : 'user')
    const profile = {
      id: user.id,
      email: user.email,
      full_name: existing?.full_name || partial.full_name || '',
      phone: existing?.phone || partial.phone || '',
      role,
    }

    const updatedProfiles = existing
      ? profiles.map((item) => (item.id === profile.id ? { ...item, ...profile } : item))
      : [...profiles, profile]

    saveMockStore({ profiles: updatedProfiles, orders, products })
    return profile
  }

  const createQuery = (table) => {
    let filter = null
    return {
      select: () => ({
        eq: (column, value) => {
          filter = { column, value }
          return {
            single: async () => {
              const data = loadMockStore()[table]
              const item = data.find((entry) => entry[filter.column] === filter.value) || null
              return { data: item, error: null }
            },
          }
        },
        order: async (column, { ascending = true } = {}) => {
          const data = [...loadMockStore()[table]]
          data.sort((a, b) => {
            const left = a[column]
            const right = b[column]
            if (left === right) return 0
            if (left == null) return 1
            if (right == null) return -1
            return ascending ? (left < right ? -1 : 1) : left > right ? -1 : 1
          })
          return { data, error: null }
        },
        then: (resolve) => Promise.resolve({ data: loadMockStore()[table], error: null }).then(resolve),
      }),
    }
  }

  const listeners = new Set()

  supabaseClient = {
    isMock: true,
    auth: {
      getSession: async () => {
        const user = JSON.parse(localStorage.getItem('mock_user') || 'null')
        return {
          data: { session: user ? { user, access_token: 'mock-token' } : null },
          error: null,
        }
      },
      onAuthStateChange: (callback) => {
        listeners.add(callback)
        const user = JSON.parse(localStorage.getItem('mock_user') || 'null')
        const session = user ? { user, access_token: 'mock-token' } : null
        callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', session)
        return {
          data: {
            subscription: {
              unsubscribe: () => listeners.delete(callback),
            },
          },
        }
      },
      signUp: async ({ email }) => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        const user = {
          id: createMockId(email),
          email,
          created_at: new Date().toISOString(),
        }
        localStorage.setItem('mock_user', JSON.stringify(user))
        ensureMockProfile(user)
        const session = { user, access_token: 'mock-token' }
        listeners.forEach((callback) => callback('SIGNED_IN', session))
        return { data: { user, session }, error: null }
      },
      signInWithPassword: async ({ email }) => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        const user = {
          id: createMockId(email),
          email,
          created_at: new Date().toISOString(),
        }
        localStorage.setItem('mock_user', JSON.stringify(user))
        ensureMockProfile(user)
        const session = { user, access_token: 'mock-token' }
        listeners.forEach((callback) => callback('SIGNED_IN', session))
        return { data: { user, session }, error: null }
      },
      signOut: async () => {
        localStorage.removeItem('mock_user')
        listeners.forEach((callback) => callback('SIGNED_OUT', null))
        return { error: null }
      },
    },
    from: (table) => ({
      select: () => createQuery(table).select(),
      eq: () => createQuery(table).eq(),
      upsert: async (payload) => {
        if (table === 'profiles') {
          const [profile] = payload
          const saved = ensureMockProfile(profile, profile)
          return { data: [saved], error: null }
        }
        return { data: payload, error: null }
      },
      insert: async (payload) => {
        if (table === 'orders') {
          const { profiles, orders, products } = loadMockStore()
          const order = {
            id: 'mock-order-' + Math.random().toString(36).slice(2, 10),
            ...payload[0],
            created_at: new Date().toISOString(),
          }
          saveMockStore({ profiles, orders: [...orders, order], products })
          return { data: [order], error: null }
        }
        return { data: payload, error: null }
      },
    }),
  }
}

export const supabase = supabaseClient
