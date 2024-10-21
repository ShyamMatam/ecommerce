'use client';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>{item.name}</span>
          <div>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span className="mx-2">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500">
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Proceed to Checkout
      </button>
    </div>
  );
}
