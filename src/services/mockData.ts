import { MenuItem, Order } from '../types';

export const mockMenuItems: MenuItem[] = [
  {
    _id: '1',
    name: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil on our signature crust',
    price: 14.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop'
  },
  {
    _id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and our house-made Caesar dressing',
    price: 9.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop'
  },
  {
    _id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop'
  },
  {
    _id: '4',
    name: 'Craft Lemonade',
    description: 'Fresh-squeezed lemons, mint, and house-made simple syrup',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop'
  },
  {
    _id: '5',
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
    price: 7.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&auto=format&fit=crop'
  },
  {
    _id: '6',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon herb butter, served with seasonal vegetables',
    price: 24.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop'
  }
];

let mockOrders: Order[] = [];

export const mockApi = {
  getMenu: async (): Promise<MenuItem[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockMenuItems;
  },

  createOrder: async (orderData: Omit<Order, '_id' | 'status' | 'createdAt'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder: Order = {
      _id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    mockOrders = [newOrder, ...mockOrders];
    
    // Simulate order status updates
    setTimeout(() => {
      mockOrders = mockOrders.map(order => 
        order._id === newOrder._id ? { ...order, status: 'confirmed' } : order
      );
    }, 3000);
    
    setTimeout(() => {
      mockOrders = mockOrders.map(order => 
        order._id === newOrder._id ? { ...order, status: 'preparing' } : order
      );
    }, 6000);
    
    setTimeout(() => {
      mockOrders = mockOrders.map(order => 
        order._id === newOrder._id ? { ...order, status: 'ready' } : order
      );
    }, 9000);
    
    setTimeout(() => {
      mockOrders = mockOrders.map(order => 
        order._id === newOrder._id ? { ...order, status: 'delivered' } : order
      );
    }, 12000);

    return newOrder;
  },

  getOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockOrders;
  }
};