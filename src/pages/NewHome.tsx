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
  Music,
  FileText,
  Video,
  Headphones,
  PlayCircle,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";

const NewHome = () => {
  const { content, loading } = useContent("home");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollToRef = useRef<HTMLDivElement>(null);

  // Enhanced transformations data with 6 client cards
  const transformations = content?.transformations?.stories || [
    {
      name: "Sarah M.",
      image: "/assets/testimonial_sarah.jpg",
      quote:
        "The therapy sessions completely transformed my anxiety management. I feel empowered and confident again.",
      role: "Executive Director",
      rating: 5,
    },
    {
      name: "Jennifer K.",
      image: "/assets/testimonial_jennifer.jpg",
      quote:
        "Working with Dr. Smith helped me overcome years of depression. The medication management was life-changing.",
      role: "Marketing Manager",
      rating: 5,
    },
    {
      name: "Maria L.",
      image: "/assets/testimonial_maria.jpg",
      quote:
        "I finally understand my ADHD and have the tools to thrive. My productivity and focus have improved dramatically.",
      role: "Creative Director",
      rating: 5,
    },
    {
      name: "Amanda R.",
      image: "/assets/testimonial_amanda.jpg",
      quote:
        "The holistic approach to my bipolar disorder management has given me stability I never thought possible.",
      role: "Software Engineer",
      rating: 5,
    },
    {
      name: "Lisa T.",
      image: "/assets/testimonial_lisa.jpg",
      quote:
        "Trauma-informed care helped me heal from PTSD. I can finally sleep peacefully and enjoy life again.",
      role: "Teacher",
      rating: 5,
    },
    {
      name: "Rachel D.",
      image: "/assets/testimonial_rachel.jpg",
      quote:
        "The psychiatric evaluation and treatment plan addressed my eating disorder with compassion and expertise.",
      role: "Nurse Practitioner",
      rating: 5,
    },
  ];

  // Touch/mouse event handlers for mobile swiping and dragging

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

  const scrollToStartJourney = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-cream-light">
        <div className="w-8 h-8 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 3 Pillars with elegant icons and descriptions
  const pillars = [
    {
      title: "Mindset Reset",
      description:
        "Transform limiting beliefs and negative thought patterns through evidence-based cognitive approaches tailored to your unique mental health journey.",
      icon: <Brain className="w-12 h-12" />,
    },
    {
      title: "Strategic Reinvention",
      description:
        "Redesign your life with intention and clinical insight, aligning your choices with your authentic self and mental wellness goals.",
      icon: <Crown className="w-12 h-12" />,
    },
    {
      title: "Lifestyle Curation",
      description:
        "Develop sustainable daily practices and healthy boundaries that support your mental health and overall well-being.",
      icon: <Sparkles className="w-12 h-12" />,
    },
  ];

  // Wellness Resources section with 3 downloadable/embedded tools
  const wellnessResources = content?.wellnessResources || [
    {
      title: "Meditation Guide",
      description:
        "A comprehensive PDF guide with 10 powerful meditation techniques for anxiety relief and mental clarity.",
      type: "PDF",
      action: "Download",
      icon: <FileText className="w-8 h-8" />,
      image: "/assets/meditation_guide_preview.jpg",
      url: "/assets/Meditation_Guide.pdf",
    },
    {
      title: "Curated Spotify Playlist",
      description:
        "Carefully selected calming music and guided meditations to support your mental health journey.",
      type: "Playlist",
      action: "Listen",
      icon: <Music className="w-8 h-8" />,
      image: "/assets/spotify_playlist_cover.jpg",
      url: "https://open.spotify.com/playlist/your-wellness-playlist",
    },
    {
      title: "Breathing Exercise Video",
      description:
        "Professional breathing techniques and grounding exercises for managing stress and anxiety in daily life.",
      type: "Video",
      action: "Watch",
      icon: <Video className="w-8 h-8" />,
      image: "/assets/breathing_exercise_preview.jpg",
      url: "/assets/breathing_exercises_video.mp4",
    },
  ];

  const practitionerBio =
    content?.practitioner?.bio ||
    "As a Board-Certified Psychiatric and Mental Health Nurse Practitioner, I bring clinical expertise and compassionate care to help you navigate your mental health journey. My approach combines evidence-based psychiatric treatment with holistic wellness strategies, empowering you to own your power and shape your story with confidence and resilience.";

  return (
    <div className="min-h-screen">
      <SEO
        title="Own your Power. Shape your Story. | Psychiatric & Mental Health Nurse Practitioner"
        description="Transform your mental health journey with compassionate, evidence-based psychiatric care. Discover clarity, embrace healing, and step into your power with a Board-Certified Psychiatric & Mental Health Nurse Practitioner."
        canonicalUrl="/"
        keywords="psychiatric nurse practitioner, mental health care, anxiety treatment, depression therapy, trauma-informed care, psychiatric medication management"
      />
      <Schema type="organization" />
      <Schema type="medicalBusiness" />
      <Schema type="website" />

      {/* Hero Section - Keep background video, minimal text, "Start Your Journey" button */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        {content?.hero?.videoUrl && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setIsVideoPlaying(true)}
          >
            <source src={content.hero.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Fallback Background Image */}
        {!content?.hero?.videoUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: content?.hero?.backgroundImage
                ? `url('${content.hero.backgroundImage}')`
                : "url('/assets/hero_woman_spa.jpg')",
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* Content - Short, powerful introductory statement */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1
            className="heading-hero text-white mb-6 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 4px 16px rgba(0,0,0,0.7)" }}
          >
            Own your Power.
            <br />
            Shape your Story.
          </h1>
          <p
            className="body-text text-xl sm:text-2xl md:text-3xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            Transform your mental health with compassionate, evidence-based
            psychiatric care.
          </p>
          {/* Round, soft button in deeper cream color */}
          <button
            onClick={scrollToStartJourney}
            className="btn-start-journey animate-fade-in"
            aria-label="Start your mental health transformation journey"
          >
            Start Your Journey
          </button>
        </div>

        {/* Video Controls */}
        {content?.hero?.videoUrl && (
          <button
            onClick={toggleVideo}
            className="absolute bottom-8 right-8 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        )}
      </section>

      {/* The 3 Pillars Section - Darker creamy cards with soft shadows */}
      <section className="section-padding bg-gradient-cream-light">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-section text-4xl md:text-5xl font-bold mb-6">
              The 3 Pillars of Mental Wellness
            </h2>
            <p className="subheading-clean text-xl max-w-3xl mx-auto">
              A comprehensive, evidence-based approach to psychiatric care that
              honors your whole being
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="card-pillar text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-cream-warm"
                  style={{ color: "var(--accent-brown)" }}
                >
                  {pillar.icon}
                </div>
                <h3 className="subheading-clean text-2xl font-semibold mb-4">
                  {pillar.title}
                </h3>
                <p className="body-text leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Transformations Section - Auto-scrolling Horizontal Carousel */}
      <section
        className="section-padding-compact"
        style={{
          background: "linear-gradient(135deg, #EFE2D5, #F5C8C4, #EADCC4)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "Raleway, sans-serif",
                color: "var(--text-dark)",
              }}
            >
              Client Transformations
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{
                fontFamily: "Roboto, sans-serif",
                color: "var(--text-medium)",
              }}
            >
              Real stories of healing and empowerment from our mental health
              community
            </p>
          </div>

          {/* Auto-scrolling Carousel Container */}
          <div className="carousel-container overflow-hidden relative">
            <div className="flex animate-scroll-slow space-x-6">
              {/* Duplicate the testimonials array to create seamless infinite scroll */}
              {[...transformations, ...transformations].map((story, index) => (
                <div
                  key={`testimonial-${index}`}
                  className="min-w-[300px] max-w-md rounded-2xl shadow-lg p-6 flex-shrink-0"
                  style={{
                    backgroundColor: "#EFE2D5",
                    boxShadow: "0 8px 25px rgba(180, 122, 90, 0.15)",
                  }}
                >
                  {/* Client Image */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={story.image || "/assets/testimonial_placeholder.jpg"}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white/50"
                      loading="lazy"
                    />
                  </div>

                  {/* 5-star Rating */}
                  <div className="flex justify-center mb-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p
                    className="text-center text-base italic mb-4 leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "var(--text-medium)",
                    }}
                  >
                    "{story.quote}"
                  </p>

                  {/* Client Info */}
                  <div className="text-center">
                    <h4
                      className="font-bold text-lg mb-1"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        color: "var(--text-dark)",
                      }}
                    >
                      {story.name}
                    </h4>
                    <p
                      className="text-sm opacity-80"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        color: "var(--text-medium)",
                      }}
                    >
                      {story.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional: Scroll indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {transformations.slice(0, 3).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-[var(--accent-brown)]/40"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Wellness Resources Section - 3 downloadable/embedded tools */}
      <section className="section-padding bg-gradient-cream-rich">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-section text-4xl md:text-5xl font-bold mb-6">
              Wellness Resources
            </h2>
            <p className="subheading-clean text-xl max-w-3xl mx-auto">
              Complementary tools and resources to support your mental health
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {wellnessResources.map((resource, index) => (
              <div
                key={index}
                className="card-wellness text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-48 bg-gradient-cream-warm rounded-xl mb-6 overflow-hidden">
                  {resource.image && (
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-cream-light"
                  style={{ color: "var(--accent-brown)" }}
                >
                  {resource.icon}
                </div>
                <h3 className="subheading-clean text-xl font-semibold mb-4">
                  {resource.title}
                </h3>
                <p className="body-text mb-6 leading-relaxed">
                  {resource.description}
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-3"
                  aria-label={`${resource.action} ${resource.title}`}
                >
                  {resource.action === "Download" && <Download size={20} />}
                  {resource.action === "Listen" && <Headphones size={20} />}
                  {resource.action === "Watch" && <PlayCircle size={20} />}
                  {resource.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Practitioner Section - Rounded square portrait, short bio, "Book a Clarity Session" button */}
      <section
        ref={scrollToRef}
        className="section-padding bg-gradient-cream-light"
      >
        <div className="container-responsive">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="heading-section text-4xl md:text-5xl font-bold mb-6">
                Meet Your Practitioner
              </h2>
              <div className="body-text text-lg leading-relaxed mb-8">
                <p>{practitionerBio}</p>
              </div>
              <div className="mb-8 p-6 bg-gradient-cream-warm rounded-xl border border-[var(--accent-cream)]">
                <h4 className="subheading-clean text-xl font-semibold mb-3">
                  Professional Credentials
                </h4>
                <p className="body-text font-medium">
                  Board-Certified Psychiatric & Mental Health Nurse Practitioner
                  (PMHNP-BC)
                </p>
                <p className="body-text-alt text-sm opacity-75 mt-2">
                  Licensed to provide comprehensive psychiatric care, medication
                  management, and psychotherapy
                </p>
              </div>
              <button
                onClick={() =>
                  window.open("https://calendly.com/tashaniyi/30min", "_blank")
                }
                className="btn-primary"
                aria-label="Book a clarity session with our psychiatric nurse practitioner"
              >
                Book a Clarity Session
              </button>
            </div>

            <div className="order-1 md:order-2">
              <div className="portrait-frame max-w-md mx-auto">
                <img
                  src={
                    content?.practitioner?.image || "/assets/guide_portrait.jpg"
                  }
                  alt="Psychiatric and Mental Health Nurse Practitioner"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Section - Updated background to booking_bg_dark.jpg, ensure text readability */}
      <section
        className="relative section-padding overflow-hidden"
        style={{
          backgroundImage: content?.finalCTA?.backgroundImage
            ? `url('${content.finalCTA.backgroundImage}')`
            : "url('/assets/booking_bg_dark.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className="heading-hero text-white mb-6 text-4xl md:text-5xl font-bold"
            style={{ textShadow: "0 4px 16px rgba(0,0,0,0.8)" }}
          >
            Take the First Step Toward Healing
          </h2>
          <p
            className="body-text text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            Your mental health journey begins with compassionate, professional
            care. Let's explore how psychiatric treatment can help you own your
            power and shape your story.
          </p>
          <a
            href="https://calendly.com/tashaniyi/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 text-xl px-12 py-5"
            style={{
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              backgroundColor: "var(--accent-brown)",
              border: "2px solid var(--accent-cream)",
            }}
            aria-label="Schedule your initial psychiatric consultation"
          >
            <Calendar size={24} />
            Schedule Your Consultation
          </a>
          <p className="body-text-alt text-white/80 mt-4 text-sm">
            PMHNP-BC • Evidence-Based Care • Compassionate Treatment
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewHome;
