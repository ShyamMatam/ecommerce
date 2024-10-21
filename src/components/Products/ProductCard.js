'use client';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-48 relative mb-4">
        <Image 
          src={product.product_photo} 
          alt={product.product_title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="rounded"
        />
      </div>
      <h3 className="text-lg font-semibold truncate">{product.product_title.split(' ').slice(0, 3).join(' ')}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className="text-gray-600 text-sm h-12 overflow-hidden">{product.product_description}</p>
      <p className="text-xl font-bold mt-2 text-blue-600">{product.product_price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}



