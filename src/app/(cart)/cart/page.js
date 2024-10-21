'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import CartItem from '../../../components/cart/CartItem';
import Spinner from '../../../components/Spinner';

export default function Cart() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + parseFloat(item.product_price.replace('$', '')) * item.quantity, 0);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      clearCart();
    }
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  if (!cart) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-xl text-gray-600">Your cart is empty.</p>
          <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            
            {cart.map((item) => (
              <CartItem key={item.asin} item={item} />
            ))}
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">Total: ${total.toFixed(2)}</h2>
              <div className="space-x-4">
                <button 
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  Clear Cart
                </button>
                <button 
                  onClick={handleProceedToCheckout}
                  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
