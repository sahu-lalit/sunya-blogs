"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const topNavLinks = [
    { href: "https://www.sunyaiashindi.com/notes", label: "Notes" },
    { href: "https://www.sunyaiashindi.com/prelims-tests", label: "Prelims Tests" },
    { href: "https://www.sunyaiashindi.com/mains-tests", label: "Mains Tests" },
    { href: "https://www.sunyaiashindi.com/video-courses", label: "Video Courses" },
    { href: "https://www.sunyaiashindi.com/optionals", label: "Optionals" },
    { href: "https://www.sunyaiashindi.com/pcs", label: "PCS" },
  ];

  // const bottomNavLinks = [
  //   { href: "/csat", label: "CSAT*" },
  //   { href: "/vajra", label: "VAJRA" },
  //   { href: "/optional-test-series", label: "Optional Test Series" },
  //   { href: "/ica", label: "ICA" },
  //   { href: "/brahmastra-2026", label: "BRAHMASTRA 2026" },
  //   { href: "/daw", label: "DAW*" },
  // ];

  return (
    <nav
      className="bg-[#FFFFFF] shadow-sm sticky top-0 z-50 border-b-2 border-[#FBC158]"
      style={{ fontFamily: "Poppins-Medium, sans-serif" }}
    >
      {/* Top Row */}
      <div className="border-b border-gray-100 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Sunya IAS Logo"
                  width={120}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Top Navigation Links - Desktop & Tablet */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-1 justify-center ml-4 lg:ml-16">
              {topNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#AA1650] hover:text-[#AA1650] px-2 lg:px-3 py-2 text-sm lg:text-base font-medium relative group transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute left-0 right-0 bottom-0 h-1 bg-[#FBC158] rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                </Link>
              ))}
            </div>

            {/* Sign Up/Login - Desktop */}
            {/* <div className="hidden lg:flex items-center space-x-4 ml-auto">
              <Link
                href="/signup"
                className="text-[#AA1650] hover:text-[#AA1650] px-3 py-2 text-base font-medium relative group transition-colors duration-200"
                style={{ fontSize: '16px' }}
              >
                Sign Up
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#FBC158] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
              <Link
                href="/login"
                className="text-[#AA1650] hover:text-[#AA1650] px-3 py-2 text-base font-medium relative group transition-colors duration-200"
                style={{ fontSize: '16px' }}
              >
                Login
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#FBC158] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
            </div> */}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="bg-[#FFFFFF] inline-flex items-center justify-center p-2 rounded-md text-[#AA1650] hover:text-[#AA1650] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FBC158] transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-5 w-5 sm:h-6 sm:w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-5 w-5 sm:h-6 sm:w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Desktop
      <div className="hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 h-12">
            {bottomNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-pink-600 hover:text-pink-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4 bg-[#FFFFFF] shadow-lg border-t border-gray-200">
          <div className="pb-3 mb-3 border-b border-gray-200">
            <p className="text-[#AA1650] font-medium text-base mb-3 px-2">Main Menu</p>
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#AA1650] hover:text-[#AA1650] hover:bg-gray-50 block px-3 py-3 text-base font-medium transition-colors duration-200 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* <div className="pb-3 mb-3 border-b border-gray-200">
            <p className="text-pink-600 font-medium text-sm mb-2 px-3">Test Series</p>
            {bottomNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-pink-600 hover:text-pink-700 hover:bg-gray-50 block px-3 py-2 text-sm font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div> */}
          {/* <div className="pt-3">
            <Link
              href="/signup"
              className="text-[#AA1650] hover:text-[#AA1650] hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
              style={{ fontSize: '16px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="text-[#AA1650] hover:text-[#AA1650] hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
              style={{ fontSize: '16px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
