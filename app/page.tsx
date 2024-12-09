'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { incrementQuantity, decrementQuantity } from './store/cartSlice';
import ProductModal from './components/ProductModal';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">ショッピングカート</h1>
          <Link href="/cart" className="text-orange-600 hover:text-orange-700">
            <FaShoppingCart className="text-2xl" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product.id)}
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">¥{product.price}</p>
              <div className="flex items-center justify-between">
                <span className="text-orange-600">数量: {product.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={products.find(p => p.id === selectedProduct)!}
            onClose={() => setSelectedProduct(null)}
            onIncrement={() => dispatch(incrementQuantity(selectedProduct))}
            onDecrement={() => dispatch(decrementQuantity(selectedProduct))}
          />
        )}
      </div>
    </main>
  );
}
