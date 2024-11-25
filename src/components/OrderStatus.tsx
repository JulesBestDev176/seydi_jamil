import React, { useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { mockApi } from '../services/mockData';
import { Order } from '../types';

interface OrderStatusProps {
  orders: Order[];
}

function OrderStatus({ orders }: OrderStatusProps) {
  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedOrders = await mockApi.getOrders();
      // Update orders through parent component
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h2>
        <p className="text-gray-600">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-gray-500">Order placed:</span>
                <p className="font-medium">{formatDate(order.createdAt)}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="border-t pt-4">
              {order.items.map((item) => (
                <div
                  key={item.item._id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.item.image}
                      alt={item.item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <p className="font-medium">{item.item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <div className="flex items-center">
                {order.status === 'delivered' ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <Clock className="h-5 w-5 text-orange-500 mr-2" />
                )}
                <span className="text-sm text-gray-600">
                  {order.status === 'delivered'
                    ? 'Order completed'
                    : 'Estimated delivery: 30-45 minutes'}
                </span>
              </div>
              <p className="text-lg font-semibold">
                Total: ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderStatus;