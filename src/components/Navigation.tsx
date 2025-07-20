import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Transform", path: "/transform" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-cream-lightest)] backdrop-blur-sm shadow-lg border-b border-[var(--accent-cream)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Enlarged and rounded corners */}
          <Link to="/" className="flex items-center">
            <div className="bg-[var(--bg-cream-light)] rounded-2xl p-2 shadow-lg border border-[var(--accent-cream)]">
              <img
                src="/assets/Gold HA negative background (1).svg"
                alt="Psychiatric & Mental Health Nurse Practitioner"
                className="w-[70px] h-[70px] rounded-xl object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-all duration-300 relative group ${
                  isScrolled
                    ? "text-[var(--text-dark)] hover:text-[var(--accent-brown)]"
                    : "text-[var(--text-light)] hover:text-[var(--accent-cream)]"
                } ${isActive(item.path) ? "text-[var(--accent-brown)]" : ""}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-brown)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link to="/contact" className="btn-primary ml-4">
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                isScrolled
                  ? "text-[var(--text-dark)] hover:text-[var(--accent-brown)]"
                  : "text-[var(--text-light)] hover:text-[var(--accent-cream)]"
              }`}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-[var(--accent-cream)]/30 bg-[var(--bg-cream-lightest)] rounded-b-xl"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors duration-200 text-[var(--text-dark)] hover:text-[var(--accent-brown)] ${
                    isActive(item.path) ? "text-[var(--accent-brown)]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-fit"
              >
                Book Your Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
