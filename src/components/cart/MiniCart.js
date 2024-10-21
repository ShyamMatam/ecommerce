'use client';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniCart() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.product_price.replace('$', '')) * item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);

  return (
    <div className="relative" ref={cartRef}>
      <button 
        className="flex items-center space-x-1 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>{totalItems}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.asin} className="flex items-center mb-2 pb-2 border-b">
                        <div className="w-10 h-10 relative flex-shrink-0 mr-2">
                          <Image 
                            src={item.product_photo} 
                            alt={item.product_title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm truncate text-gray-600">{item.product_title.split(' ').slice(0, 3).join(' ')}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} x ${parseFloat(item.product_price.replace('$', '')).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-2 border-t">
                    <p className="font-semibold text-gray-600">Total: ${totalPrice.toFixed(2)}</p>
                  </div>
                </>
              )}
              <Link href="/cart" className="mt-4 block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                View Cart
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
