'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const formatPrice = (price) => {
  const numericPrice = parseFloat(price.replace('$', ''));
  return `₹${(numericPrice.toFixed(0))*84}`;
};
export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex items-center mb-6 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <div className="w-24 h-24 mr-4 relative flex-shrink-0 overflow-hidden rounded-md">
        <Image 
          src={item.product_photo} 
          alt={item.product_title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md"
        />
      </div>
      <div className="flex-grow mr-4">
        <h2 className="text-lg font-semibold line-clamp-2 text-gray-600" title={item.product_title}>{item.product_title}</h2>
        {/* price to indian rupees */}
        <p className="text-violet-600 font-bold mt-1 ">{formatPrice(item.product_price)}</p>

      </div>
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(item.asin, item.quantity - 1)} 
          className="mx-1 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 text-gray-600"
        >
          -
        </button>
        <span className="mx-2 font-semibold text-gray-600">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.asin, item.quantity + 1)} 
          className="mx-1 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 text-gray-600"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => removeFromCart(item.asin)} 
        className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </motion.div>
  );
}
