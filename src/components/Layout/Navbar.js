// 'use client';
// import Link from 'next/link';
// import { useCart } from '../../context/CartContext';
// import MiniCart from '../cart/MiniCart';

// export default function Navbar() {
//   const { user, setUser } = useCart();

//   const handleLogout = async () => {
//     await fetch('/api/auth/logout', { method: 'POST' });
//     setUser(null);
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 fixed top-0 w-full z-10 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <Link href="/" className="hover:text-blue-200 transition-colors">
//             Home
//           </Link>
//           {/* <Link href="/products" className="hover:text-blue-200 transition-colors">
//             Products
//           </Link> */}
//         </div>
//         <div className="flex items-center space-x-4">
//           <MiniCart />
//           {user ? (
//             <>
//               <span>Welcome, {user.email}</span>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="hover:text-blue-200 transition-colors">
//                 Login
//               </Link>
//               <Link href="/register" className="hover:text-blue-200 transition-colors">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



'use client';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import MiniCart from '../cart/MiniCart';
import { useState } from 'react';

export default function Navbar() {
  const { user, setUser } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <nav className="bg-violet-600 text-white p-4 fixed top-0 w-full z-10 shadow-2xl">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="hover:text-blue-200 hover:underline transition-colors">
            Home
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-auto md:items-center mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <MiniCart />
            {user ? (
              <>
                <span className="my-2 md:my-0">welcome {user.email}</span>
                <button onClick={handleLogout} className="my-2 md:my-0 hover:text-blue-200 hover:underline transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="my-2 md:my-0 hover:text-blue-200 hover:underline transition-colors">
                  Login
                </Link>
                <Link href="/register" className="my-2 md:my-0 hover:text-blue-200 hover:underline transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

