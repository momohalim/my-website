
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      title: "Clarity Session",
      subtitle: "Single Deep Dive",
      description: "A focused 90-minute session to gain clarity on your current challenges and create a pathway forward.",
      features: [
        "Deep exploration of your current situation",
        "Identification of core limiting beliefs",
        "Personalized action plan",
        "Resource recommendations"
      ],
      price: "$197",
      icon: "🌿",
      gradient: "from-[#A4BBA3] to-[#D4A373]",
      image: "/assets/service_clarity.jpg"
    },
    {
      title: "Monthly Deep Work",
      subtitle: "4 Sessions Package",
      description: "Consistent monthly support for ongoing transformation and accountability in your feminine power journey.",
      features: [
        "Four 75-minute coaching sessions",
        "Email support between sessions",
        "Customized practices and exercises",
        "Progress tracking and adjustments"
      ],
      price: "$697",
      icon: "🌙",
      gradient: "from-[#D4A373] to-[#A4BBA3]",
      popular: true,
      image: "/assets/service_monthly.jpg"
    },
    {
      title: "Feminine Flow Package",
      subtitle: "3-Month Transformation",
      description: "A comprehensive journey of feminine awakening, career alignment, and deep inner work over three months.",
      features: [
        "Twelve 75-minute sessions",
        "Unlimited email and voice message support",
        "Custom meditation and journaling practices",
        "Feminine cycle alignment guidance",
        "Career transition support",
        "Integration practices for lasting change"
      ],
      price: "$1,997",
      icon: "🌸",
      gradient: "from-[#D4A373]/80 to-[#A4BBA3]/80",
      image: "/assets/service_flow.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F3EEE8 0%, #E8E1D8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1D1D1D] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Coaching Services
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed">
            Choose the path that resonates with your heart and honors where you are in your journey right now.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #E8E1D8 0%, #F3EEE8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${service.gradient} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  boxShadow: hoveredCard === index 
                    ? '0 25px 50px rgba(212, 163, 115, 0.3)' 
                    : '0 15px 30px rgba(212, 163, 115, 0.2)' 
                }}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#1D1D1D] text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-lg font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <div className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {service.price}
                  </div>
                </div>

                <p className="text-white/90 text-center mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <span className="text-white mr-3 mt-1">✓</span>
                      <span className="text-white/90 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="w-full h-64 bg-cover bg-center rounded-2xl mb-6 opacity-90 shadow-lg"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                  }}
                ></div>

                <Link
                  to="/contact"
                  className={`w-full block text-center bg-[#F3EEE8] text-[#D4A373] px-6 py-4 rounded-full font-medium hover:bg-[#E8E1D8] transition-all duration-300 transform ${
                    hoveredCard === index ? 'scale-105' : ''
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Block */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F3EEE8 0%, #E8E1D8 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Which Path is Right for You?
            </h2>
            <p className="text-xl text-[#B0B0B0] max-w-2xl mx-auto">
              Understanding the difference between single sessions and comprehensive packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Single Sessions */}
            <div className="elegant-card p-8">
              <h3 className="text-2xl font-bold text-[#1D1D1D] mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                Single Sessions
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-[#A4BBA3] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Perfect for gaining immediate clarity</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#A4BBA3] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Quick breakthrough on specific issues</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#A4BBA3] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">No long-term commitment</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#A4BBA3] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Great for trying out the coaching style</span>
                </div>
              </div>
            </div>

            {/* Package Sessions */}
            <div className="elegant-card p-8 border-2 border-[#D4A373]/20">
              <h3 className="text-2xl font-bold text-[#1D1D1D] mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                Package Programs
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-[#D4A373] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Deep, lasting transformation</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#D4A373] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Ongoing support and accountability</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#D4A373] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Time to integrate new patterns</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#D4A373] mr-3 mt-1">✓</span>
                  <span className="text-[#B0B0B0]">Comprehensive feminine awakening journey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D4A373] to-[#A4BBA3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Choose Your Path?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Still not sure which option is right for you? Let's have a conversation to explore what would serve you best.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#F3EEE8] text-[#D4A373] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#E8E1D8] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Schedule a Discovery Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
