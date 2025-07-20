
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #E6E0D9 0%, #D8CFC4 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Meet Your Coach
              </h1>
              <blockquote className="text-2xl md:text-3xl text-[#B47A5A] font-light mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                "I walked this path too... now I guide others."
              </blockquote>
              <p className="text-lg text-[#6A6A6A] leading-relaxed mb-8">
                After years of feeling disconnected from my true self, trying to fit into boxes that never quite felt right, I embarked on my own journey of feminine awakening. What I discovered changed everything – not just how I saw myself, but how I moved through the world.
              </p>
              <p className="text-lg text-[#6A6A6A] leading-relaxed">
                Now, I'm here to guide other women through their own transformation, helping them reclaim their power, embrace their authentic selves, and create lives that truly align with their deepest values and desires.
              </p>
            </div>
            <div className="relative">
              <div 
                className="w-full h-96 bg-cover bg-center rounded-3xl shadow-2xl"
                style={{
                  backgroundImage: `url('/assets/coach_portrait.jpg')`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #D8CFC4 0%, #E6E0D9 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Core Values
            </h2>
            <p className="text-xl text-[#6A6A6A] max-w-2xl mx-auto">
              The principles that guide every session, every conversation, and every transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Authenticity */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span className="text-3xl text-white font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>A</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Authenticity
              </h3>
              <p className="text-[#6A6A6A] leading-relaxed">
                Your truth matters. We create space for you to express who you really are, without masks or pretense.
              </p>
            </div>

            {/* Balance */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#C69C84] to-[#B47A5A] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span className="text-3xl text-white font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>B</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Balance
              </h3>
              <p className="text-[#6A6A6A] leading-relaxed">
                Honoring both your strength and softness, your ambition and your need for rest, your giving and receiving.
              </p>
            </div>

            {/* Empowerment */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span className="text-3xl text-white font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>E</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Empowerment
              </h3>
              <p className="text-[#6A6A6A] leading-relaxed">
                You already have everything you need within you. I simply help you remember and access your innate power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #E6E0D9 0%, #D8CFC4 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Credentials & Training
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="elegant-card p-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Certified Life Coach
              </h3>
              <p className="text-[#6A6A6A]">
                International Coach Federation (ICF)
              </p>
            </div>
            
            <div className="elegant-card p-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Feminine Leadership Certification
              </h3>
              <p className="text-[#6A6A6A]">
                Institute for Feminine Leadership
              </p>
            </div>
            
            <div className="elegant-card p-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Inner Child Healing
              </h3>
              <p className="text-[#6A6A6A]">
                Trauma-Informed Healing Methods
              </p>
            </div>
            
            <div className="elegant-card p-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Sacred Feminine Studies
              </h3>
              <p className="text-[#6A6A6A]">
                Divine Feminine Academy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Session CTA */}
      <section className="py-20 bg-gradient-to-r from-[#B47A5A] to-[#C69C84]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ready to Begin?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Every transformation starts with a single step. Let's take that step together.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#E6E0D9] text-[#B47A5A] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#D8CFC4] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
