export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-blue-400 mr-4">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 mr-4">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
