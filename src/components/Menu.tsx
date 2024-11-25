import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { mockApi } from '../services/mockData';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

function Menu({ onAddToCart }: MenuProps) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getMenu()
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
        setLoading(false);
      });
  }, []);

  const filteredMenu = selectedCategory === 'All'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-orange-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-orange-500 font-bold">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <button
                onClick={() => onAddToCart(item)}
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;