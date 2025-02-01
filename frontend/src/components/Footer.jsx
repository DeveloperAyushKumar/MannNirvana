import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="footer"
      className="bg-light text-white py-6 px-4 text-center w-full z-50 bg-opacity-90 backdrop-blur-md"
    >
      <div className="max-w-4xl mx-auto">
        {/* Links */}
        <ul className="flex justify-center gap-6 mb-4 text-sm">
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#resources" className="hover:underline">
              Resources
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 text-lg mb-4">
          <a href="#" className="hover:text-gray-300">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs opacity-75">
          &copy; {new Date().getFullYear()} MannNirvana. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
