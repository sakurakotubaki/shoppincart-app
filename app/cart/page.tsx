'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { incrementQuantity, decrementQuantity } from '../store/cartSlice';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => 
    state.cart.items.filter(item => item.quantity > 0)
  );
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-orange-600 hover:text-orange-700">
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold text-orange-600">カート</h1>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">カートは空です</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">¥{item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
                      >
                        <FaMinus />
                      </button>
                      
                      <span className="text-xl font-semibold">{item.quantity}</span>
                      
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>合計:</span>
                <span>¥{total}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
