import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import {
  Download,
  Star,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Award,
  Heart,
  Brain,
  Crown,
  Sparkles,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";

const NewHome = () => {
  const { content, loading } = useContent("home");
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transformations every 4 seconds
  useEffect(() => {
    const transformations = content?.transformations?.stories || [];
    if (transformations.length > 0) {
      const timer = setInterval(() => {
        setActiveTransformation((prev) => (prev + 1) % transformations.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [content?.transformations?.stories]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const scrollToMicroShift = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #faf5ef 0%, #f5c8c4 100%)",
        }}
      >
        <div className="w-8 h-8 border-4 border-[#B47A5A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const transformations = content?.transformations?.stories || [
    {
      name: "Sarah M.",
      image: "/assets/testimonial_sarah.jpg",
      quote: "I finally feel like myself again",
      title: "Executive Director",
      rating: 5,
    },
    {
      name: "Jennifer K.",
      image: "/assets/testimonial_jennifer.jpg",
      quote: "The transformation has been incredible",
      title: "Business Owner",
      rating: 5,
    },
    {
      name: "Maria L.",
      image: "/assets/testimonial_maria.jpg",
      quote: "I'm living my authentic truth now",
      title: "Creative Leader",
      rating: 5,
    },
    {
      name: "Amanda R.",
      image: "/assets/testimonial_amanda.jpg",
      quote: "Best decision I ever made",
      title: "Entrepreneur",
      rating: 5,
    },
    {
      name: "Lisa T.",
      image: "/assets/testimonial_lisa.jpg",
      quote: "I found my inner strength",
      title: "Coach",
      rating: 5,
    },
    {
      name: "Rachel D.",
      image: "/assets/testimonial_rachel.jpg",
      quote: "Life-changing experience",
      title: "Consultant",
      rating: 5,
    },
  ];

  const visionPoints = [
    {
      title: "Heal subconscious patterns",
      icon: <Brain className="w-8 h-8" />,
      description: "Transform limiting beliefs at their root",
    },
    {
      title: "Lead with elegant self-assurance",
      icon: <Crown className="w-8 h-8" />,
      description: "Embody confidence that feels natural and authentic",
    },
    {
      title: "Embody intentional feminine power",
      icon: <Sparkles className="w-8 h-8" />,
      description: "Step into your power with grace and purpose",
    },
  ];

  const pillars = [
    {
      title: "Mindset Reset",
      description:
        "Reprogram limiting beliefs and transform your inner narrative for lasting change and empowerment.",
      icon: <Brain className="w-12 h-12" />,
      color: "bg-rose-100",
    },
    {
      title: "Strategic Reinvention",
      description:
        "Redesign your life with intention, aligning your choices with your authentic desires and values.",
      icon: <Crown className="w-12 h-12" />,
      color: "bg-orange-100",
    },
    {
      title: "Lifestyle Curation",
      description:
        "Create daily rituals and practices that support your highest self and elegant way of being.",
      icon: <Sparkles className="w-12 h-12" />,
      color: "bg-amber-100",
    },
  ];

  const microShiftTechniques = [
    "Practice the 5-minute morning intention ritual",
    "Reframe one limiting thought daily using cognitive restructuring",
    "Implement elegant boundary-setting in one relationship",
  ];

  const practitionerBio =
    content?.practitioner?.bio ||
    "As a Psychiatric and Mental Health Nurse Practitioner, I combine clinical expertise with transformational coaching to guide ambitious women into elegant self-leadership. My approach merges evidence-based psychiatric care with holistic feminine empowerment, creating lasting change that honors your whole being.";

  const impactStats = [
    { number: "1,000+", label: "Transformation Sessions" },
    { number: "95%", label: "Client Success Rate" },
  ];

  const testimonialsList = [
    {
      name: "Jessica Chen",
      image: "/assets/testimonial1.jpg",
      quote:
        "Working with her completely transformed my relationship with myself. I now lead with confidence and clarity I never knew I had.",
      title: "Executive Director",
    },
    {
      name: "Maria Rodriguez",
      image: "/assets/testimonial2.jpg",
      quote:
        "The combination of clinical expertise and intuitive coaching helped me heal patterns I'd carried for decades.",
      title: "Business Owner",
    },
    {
      name: "Sarah Thompson",
      image: "/assets/testimonial3.jpg",
      quote:
        "She helped me step into the leader I was meant to be. The mindset work was profound and transformational.",
      title: "Creative Director",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="High Agency Collective | Own your Power. Shape your Story."
        description="At THE High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership through holistic mindset transformation and refined lifestyle curation."
        canonicalUrl="/"
        keywords="psychiatric nurse practitioner, mental health transformation, women's empowerment, elegant self-leadership, feminine power"
      />
      <Schema type="organization" />
      <Schema type="medicalBusiness" />
      <Schema type="website" />

      {/* 1️⃣ Hero Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: content?.hero?.backgroundImage
              ? `url('${content.hero.backgroundImage}')`
              : "url('/assets/hero_woman_spa.jpg')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-left">
          <h1
            className="text-white mb-6 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 16px rgba(0,0,0,0.7)",
            }}
          >
            Own your Power. Shape your Story.
          </h1>
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl leading-relaxed drop-shadow-md"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Transform your mental health journey with personalized psychiatric
            care designed for women ready to step into their power.
          </p>
          <button
            onClick={scrollToMicroShift}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#B47A5A",
              fontFamily: "'Raleway', sans-serif",
              boxShadow: "0 6px 20px rgba(180, 122, 90, 0.4)",
            }}
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* 2️⃣ Welcome & Vision Section */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #faf5ef 0%, #f5c8c4 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-16">
            <p
              className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12"
              style={{ color: "#1A1A1A", fontFamily: "'Roboto Slab', serif" }}
            >
              At THE High Agency Collective, I help ambitious women stop playing
              small and step fully into elegant self-leadership. Through
              holistic mindset transformation, strategic reinvention, and
              refined lifestyle curation, I guide women in becoming the most
              authentic, self-led version of themselves—inside and out.
            </p>
          </div>

          {/* Vision Points */}
          <div className="grid md:grid-cols-3 gap-8">
            {visionPoints.map((point, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  backgroundColor: "#eed6c4",
                  border: "1px solid rgba(180, 122, 90, 0.2)",
                }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#B47A5A", color: "white" }}
                >
                  {point.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{
                    color: "#B47A5A",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {point.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    color: "#444444",
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ Client Transformations Carousel */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#fbeae3" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center mb-12 text-4xl md:text-5xl font-bold"
            style={{
              color: "#B47A5A",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Client Transformations
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{
                transform: `translateX(-${activeTransformation * (280 + 32)}px)`,
                width: `${transformations.length * (280 + 32)}px`,
              }}
            >
              {transformations.map((story, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: "#f5c8c4" }}
                >
                  <div className="h-48 bg-gradient-to-br from-rose-200 to-orange-200">
                    {story.image && (
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p
                      className="text-lg italic mb-4 leading-relaxed"
                      style={{
                        color: "#444444",
                        fontFamily: "'Roboto Slab', serif",
                      }}
                    >
                      "{story.quote}"
                    </p>
                    <div>
                      <h4
                        className="font-semibold text-lg"
                        style={{
                          color: "#1A1A1A",
                          fontFamily: "'Raleway', sans-serif",
                        }}
                      >
                        {story.name}
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          color: "#666666",
                          fontFamily: "'Roboto Slab', serif",
                        }}
                      >
                        {story.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Elegant Self-Leadership Framework (3 Pillars) */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#f5c8c4" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center mb-4 text-4xl md:text-5xl font-bold"
            style={{
              color: "#B47A5A",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            The 3 Pillars of Elegant Self‑Leadership
          </h2>
          <p
            className="text-center text-xl mb-16 max-w-3xl mx-auto"
            style={{ color: "#444444", fontFamily: "'Roboto Slab', serif" }}
          >
            A comprehensive framework for transforming your relationship with
            yourself and stepping into authentic feminine power.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${pillar.color}`}
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#B47A5A", color: "white" }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className="text-2xl font-semibold mb-4 text-center"
                  style={{
                    color: "#B47A5A",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-center leading-relaxed"
                  style={{
                    color: "#444444",
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Micro-Shift & Free PDF Download */}
      <section
        ref={scrollToRef}
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#faf5ef" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                color: "#B47A5A",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Begin With a Micro Shift
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto mb-8"
              style={{ color: "#444444", fontFamily: "'Roboto Slab', serif" }}
            >
              Transformation doesn't require dramatic gestures. Sometimes the
              most profound changes begin with the smallest, most intentional
              steps. Start where you are, with what you have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {microShiftTechniques.map((technique, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-md"
                style={{
                  backgroundColor: "#eed6c4",
                  border: "1px solid rgba(180, 122, 90, 0.2)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: "#B47A5A", color: "white" }}
                >
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <p
                  className="text-center font-medium"
                  style={{
                    color: "#444444",
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  {technique}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div
              className="inline-block p-8 rounded-2xl shadow-lg mb-8"
              style={{ backgroundColor: "#f5c8c4" }}
            >
              <h3
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "#B47A5A",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Free Clarity Journal
              </h3>
              <p
                className="mb-6 text-lg"
                style={{ color: "#444444", fontFamily: "'Roboto Slab', serif" }}
              >
                Download your free guided journal to begin your transformation
                journey with powerful reflection exercises and clarity prompts.
              </p>
              <a
                href="/assets/Clarity_Journal.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "#B47A5A",
                  color: "white",
                  fontFamily: "'Raleway', sans-serif",
                  boxShadow: "0 6px 20px rgba(180, 122, 90, 0.3)",
                }}
              >
                <Download size={20} />
                Download Free Journal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ About the Practitioner */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#fbeae3" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center text-4xl md:text-5xl font-bold mb-12"
            style={{
              color: "#B47A5A",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Meet Your Practitioner
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ backgroundColor: "#eed6c4" }}
            >
              <img
                src="/assets/guide_portrait.jpg"
                alt="Your Practitioner"
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#444444", fontFamily: "'Roboto Slab', serif" }}
              >
                {practitionerBio}
              </p>
              <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: "#f5c8c4" }}
              >
                <h4
                  className="text-xl font-semibold mb-3"
                  style={{
                    color: "#B47A5A",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  Professional Credentials
                </h4>
                <p
                  className="font-medium"
                  style={{
                    color: "#444444",
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  Board-Certified Psychiatric & Mental Health Nurse Practitioner
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Testimonials & Impact Section */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#faf5ef" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: "#B47A5A",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Proven Impact & Client Stories
          </h2>

          {/* Impact Stats */}
          <div className="flex justify-center gap-16 mb-16">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{
                    color: "#B47A5A",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {stat.number}
                </div>
                <p
                  className="text-lg font-medium"
                  style={{
                    color: "#444444",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsList.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "#eed6c4" }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p
                  className="italic mb-6 leading-relaxed"
                  style={{
                    color: "#444444",
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{
                        color: "#1A1A1A",
                        fontFamily: "'Raleway', sans-serif",
                      }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "#666666",
                        fontFamily: "'Roboto Slab', serif",
                      }}
                    >
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8️⃣ CTA Banner for Clarity Session */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/compare_sessions_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className="text-white mb-6 text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 16px rgba(0,0,0,0.7)",
            }}
          >
            Take the First Step
          </h2>
          <p
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Roboto Slab', serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Your transformation begins with a single conversation. Let's explore
            what's possible when you own your power and shape your story.
          </p>
          <a
            href="https://calendly.com/tashaniyi/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: "#B47A5A",
              color: "white",
              fontFamily: "'Raleway', sans-serif",
              boxShadow: "0 8px 24px rgba(180, 122, 90, 0.4)",
            }}
          >
            <Calendar size={24} />
            Book Your Clarity Session
          </a>
        </div>
      </section>
    </div>
  );
};

export default NewHome;
