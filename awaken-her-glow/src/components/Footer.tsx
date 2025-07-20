import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="relative py-12 bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/footer_background.jpg')",
        color: "var(--color-text-light)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/assets/Gold HA negative background (1).svg"
              alt="Awaken Her Power Logo"
              className="w-20 h-20 rounded-xl border border-[#B47A5A] shadow-md object-contain"
            />
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering women to embrace their feminine strength and create
              lives of purpose, balance, and authentic joy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold text-accent"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2">
              <Link
                to="/about"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                to="/transform"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                Transform
              </Link>
              <Link
                to="/contact"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold text-accent"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Connect
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:hello@awakenherpower.com"
                className="text-background/80 hover:text-accent transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2024 Awaken Her Power. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
