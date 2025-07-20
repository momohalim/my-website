
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Transform = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const stages = [
    {
      title: "Feeling Lost",
      description: "You know something needs to change, but you're not sure what or how. The path forward feels unclear.",
      image: "/assets/transform_1_lost.jpg",
      emotion: "Confusion",
      color: "from-gray-400 to-gray-600"
    },
    {
      title: "Discovery",
      description: "Through gentle exploration, you begin to uncover your authentic self and what truly matters to you.",
      image: "/assets/transform_2_discovery.jpg",
      emotion: "Curiosity",
      color: "from-[#C69C84] to-[#B47A5A]"
    },
    {
      title: "Confidence",
      description: "As clarity emerges, you start taking aligned action and trusting your inner wisdom more deeply.",
      image: "/assets/transform_3_confidence.jpg",
      emotion: "Strength",
      color: "from-[#B47A5A] to-[#C69C84]"
    },
    {
      title: "Empowered",
      description: "You now move through life with purpose, embracing your feminine power and creating meaningful change.",
      image: "/assets/transform_4_empowered.jpg",
      emotion: "Freedom",
      color: "from-[#B47A5A] to-[#E6E0D9]"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
      
      const stageIndex = Math.floor(progress * stages.length);
      setCurrentStage(Math.min(stageIndex, stages.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#D8CFC4] z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#B47A5A] to-[#C69C84] transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E6E0D9 0%, #D8CFC4 100%)' }}>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Your Transformation
            <span className="block text-3xl md:text-4xl font-light text-[#B47A5A] mt-2">
              Journey
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#6A6A6A] mb-8 max-w-2xl mx-auto">
            Every woman's path is unique, but the journey of awakening follows a beautiful pattern.
          </p>
          <p className="text-lg text-[#6A6A6A]/80">
            Scroll to experience the transformation ↓
          </p>
        </div>
      </section>

      {/* Transformation Stages */}
      {stages.map((stage, index) => (
        <section 
          key={index}
          className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
            index === currentStage ? 'opacity-100' : 'opacity-60'
          }`}
          style={{
            background: `linear-gradient(135deg, ${stage.color.replace('from-', '').replace(' to-', ', ')})`,
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${stage.image}')`,
            }}
          />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className={`transform transition-all duration-1000 ${
              index === currentStage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-70'
            }`}>
              <div className="text-6xl md:text-8xl font-light mb-4 opacity-80" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {stage.title}
              </h2>
              
              <div className="text-lg md:text-xl font-medium mb-8 opacity-90">
                {stage.emotion}
              </div>
              
              <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto opacity-95">
                {stage.description}
              </p>
              
              {index === stages.length - 1 && (
                <div className="mt-12 animate-fade-in">
                  <Link
                    to="/contact"
                    className="inline-block bg-[#E6E0D9] text-[#B47A5A] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#D8CFC4] transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    Let's Begin Your Journey
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA Section */}
      <section className="py-32" style={{ background: 'linear-gradient(135deg, #E6E0D9 0%, #D8CFC4 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Your Journey Awaits
          </h2>
          <p className="text-xl md:text-2xl text-[#6A6A6A] mb-12 leading-relaxed">
            Every transformation begins with a single step. What stage resonates most with where you are right now?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link
              to="/services"
              className="cta-button text-lg"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="bg-[#E6E0D9] text-[#B47A5A] border-2 border-[#B47A5A] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B47A5A] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transform;
