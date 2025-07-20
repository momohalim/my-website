
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/assets/contact_background.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your transformation journey begins with a conversation. I'm here to listen, support, and guide you forward.
          </p>
        </div>
      </section>

      <div className="py-20" style={{ background: 'linear-gradient(135deg, #E6E0D9 0%, #D8CFC4 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Send me a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B47A5A]/20 rounded-2xl focus:ring-2 focus:ring-[#B47A5A] focus:border-transparent bg-[#E6E0D9] transition-all duration-200 shadow-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B47A5A]/20 rounded-2xl focus:ring-2 focus:ring-[#B47A5A] focus:border-transparent bg-[#E6E0D9] transition-all duration-200 shadow-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[#B47A5A]/20 rounded-2xl focus:ring-2 focus:ring-[#B47A5A] focus:border-transparent bg-[#E6E0D9] transition-all duration-200 resize-none shadow-sm"
                    placeholder="Tell me about what you're experiencing and what kind of support you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cta-button text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info & Booking */}
            <div className="space-y-12">
              {/* Direct Booking */}
              <div className="elegant-card p-8">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Ready to Book?
                </h3>
                <p className="text-[#6A6A6A] mb-6 leading-relaxed">
                  If you're ready to schedule a session, you can book directly through my calendar below.
                </p>
                <div className="bg-[#E6E0D9] p-6 rounded-2xl shadow-sm border border-[#B47A5A]/20">
                  <p className="text-center text-[#6A6A6A] mb-4">
                    Calendly booking widget would be embedded here
                  </p>
                  <div className="bg-[#D8CFC4] p-4 rounded-xl text-center">
                    <p className="text-sm text-[#6A6A6A]">
                      [Calendly Integration Placeholder]
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Connect with me
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://instagram.com/awakenherpower"
                    className="flex items-center p-4 elegant-card hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold">IG</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">Instagram</p>
                      <p className="text-sm text-[#6A6A6A]">Daily inspiration & insights</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/awakenherpower"
                    className="flex items-center p-4 elegant-card hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C69C84] to-[#B47A5A] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold">LI</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">LinkedIn</p>
                      <p className="text-sm text-[#6A6A6A]">Professional insights & articles</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@awakenherpower.com"
                    className="flex items-center p-4 elegant-card hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold">@</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">Email</p>
                      <p className="text-sm text-[#6A6A6A]">hello@awakenherpower.com</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Alt CTA */}
              <div className="elegant-card p-8 text-center">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Not ready to talk?
                </h3>
                <p className="text-[#6A6A6A] mb-6">
                  That's perfectly okay. Sometimes we need to dip our toes in the water first.
                </p>
                <button className="bg-[#E6E0D9] text-[#B47A5A] px-6 py-3 rounded-full font-medium hover:bg-[#D8CFC4] transition-all duration-300 transform hover:scale-105 shadow-lg border border-[#B47A5A]/20">
                  Try a Clarity Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
