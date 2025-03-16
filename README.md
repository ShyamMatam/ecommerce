
# NextCommerce

NextCommerce is a full-stack e-commerce application built with Next.js 13, leveraging the new App Router for enhanced performance and developer experience.

## Features

- **User Authentication**: Secure login and registration system
- **Product Catalog**: Dynamic product listings with attractive card layouts
- **Shopping Cart**: Persistent cart functionality using local storage and React Context
- **Checkout Process**: Integrated with Stripe for secure payments
- **Admin Panel**: Manage products and view orders
- **Responsive Design**: Seamless experience across desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 13, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe
- **State Management**: React Context API
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nextcommerce.git
   ```

2. Install dependencies:
   ```
   cd nextcommerce
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application can be easily deployed on Vercel, the platform created by the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/nextcommerce)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
