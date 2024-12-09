'use client';

import { Product } from '../store/cartSlice';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductModal({ product, onClose, onIncrement, onDecrement }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-600 text-lg mb-6">¥{product.price}</p>
        
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onDecrement}
            className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 disabled:opacity-50"
            disabled={product.quantity === 0}
          >
            <FaMinus />
          </button>
          
          <span className="text-xl font-semibold">{product.quantity}</span>
          
          <button
            onClick={onIncrement}
            className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
