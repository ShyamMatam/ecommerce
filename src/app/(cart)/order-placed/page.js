'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderPlaced() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-8 text-green-600">Order Placed Successfully!</h1>
      <p className="text-xl mb-4">Thank you for your order.</p>
      <p className="text-lg mb-8">Your order number is: <strong>{orderNumber}</strong></p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue Shopping
      </Link>
    </div>
  );
}