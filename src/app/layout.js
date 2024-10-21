import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Layout/Navbar';
import './globals.css';



export const metadata = {
  title: 'Your E-commerce Store',
  description: 'Shop the latest products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>

            <Navbar />
            <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}


