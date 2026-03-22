import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Terms Rules</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">User Security</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Report a Bug</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Advertise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Socials Network</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Facebook</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">X (Platform)</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Youtube</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Web Tools</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Browser Extensions</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Desktop Software</a></li>
              <li><a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">API Services</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ToolsBD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
