import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { mockApi } from '../services/mockData';

interface CartProps {
  cart: Array<{ item: MenuItem; quantity: number }>;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  setOrders: (orders: any) => void;
  setCart: (cart: any) => void;
  setActiveTab: (tab: string) => void;
}

function Cart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  setOrders,
  setCart,
  setActiveTab,
}: CartProps) {
  const totalAmount = cart.reduce(
    (total, { item, quantity }) => total + item.price * quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const newOrder = await mockApi.createOrder({
        items: cart.map(({ item, quantity }) => ({
          item,
          quantity,
        })),
        totalAmount,
      });
      
      const updatedOrders = await mockApi.getOrders();
      setOrders(updatedOrders);
      setCart([]);
      setActiveTab('orders');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
        <button
          onClick={() => setActiveTab('menu')}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Cart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map(({ item, quantity }) => (
          <div
            key={item._id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => quantity > 1 && onUpdateQuantity(item._id, quantity - 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item._id, quantity + 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => onRemoveItem(item._id)}
                className="p-1 rounded-md hover:bg-gray-100 ml-4"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;