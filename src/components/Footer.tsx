import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative py-12 bg-cover bg-center text-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/footer_background.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 w-fit">
              <img
                src="/assets/Gold HA negative background (1).svg"
                alt="Psychiatric & Mental Health Nurse Practitioner"
                className="w-28 h-28 object-contain"
                style={{ transform: "scale(1.4)" }}
              />
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F8F4EF",
              }}
            >
              Own your Power. Shape your Story.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold"
              style={{
                fontFamily: "Raleway, sans-serif",
                color: "#F8F4EF",
              }}
            >
              Navigate
            </h4>
            <div className="flex flex-col space-y-3">
              <Link
                to="/about"
                className="text-white hover:text-[#F8F4EF] transition-colors duration-300 text-sm"
              >
                About
              </Link>
              <Link
                to="/transform"
                className="text-white hover:text-[#F8F4EF] transition-colors duration-300 text-sm"
              >
                Transform
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-[#F8F4EF] transition-colors duration-300 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#F8F4EF",
              }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@awakenherpower.com"
                className="block text-white hover:text-[#F8F4EF] transition-colors duration-300 text-sm"
              >
                hello@awakenherpower.com
              </a>

              {/* Social Icons */}
              <div className="flex space-x-3 pt-2">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#F8F4EF]/20 hover:bg-[#F8F4EF]/30 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-[#F8F4EF]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#F8F4EF]/20 hover:bg-[#F8F4EF]/30 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5 text-[#F8F4EF]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm">
            © 2025 High Agency Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
