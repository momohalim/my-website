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

  const scrollToSection6 = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-cream-light)]">
        <div className="w-8 h-8 border-4 border-[var(--brand-pink)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const transformations = content?.transformations?.stories || [];
  const experiences = content?.experiences || [
    {
      title: "Mindset Reset",
      description: "Transform limiting beliefs into empowering truths",
    },
    {
      title: "Self-Leadership",
      description: "Develop unshakeable confidence and clarity",
    },
    {
      title: "Feminine Power",
      description: "Embrace your authentic strength and wisdom",
    },
  ];
  const tools = content?.tools || [
    { name: "Cognitive Reframing", icon: "🧠" },
    { name: "Mindfulness", icon: "🧘‍♀️" },
    { name: "Lifestyle Redesign", icon: "✨" },
    { name: "Trauma-Informed Reflection", icon: "💚" },
  ];
  const clarityPrompts = content?.clarityPrompts?.prompts || [
    "What would you do if you knew you couldn't fail?",
    "What story are you telling yourself that's keeping you small?",
    "What would your most confident self do in this situation?",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="High Agency Collective | Own your Power. Shape your Story."
        description="Transform your mental health journey with personalized psychiatric care. Discover clarity, embrace reinvention, and step into your power."
        canonicalUrl="/"
        keywords="psychiatric nurse practitioner, mental health transformation, women's empowerment, high agency living"
      />
      <Schema type="organization" />
      <Schema type="medicalBusiness" />
      <Schema type="website" />

      {/* Section 1: Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        {content?.hero?.videoUrl ? (
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
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-[var(--bg-cream-mid)]"
            style={{
              backgroundImage: content?.hero?.backgroundImage
                ? `url('${content.hero.backgroundImage}')`
                : "none",
            }}
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--overlay-dark) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-left">
          <h1 className="text-[var(--text-light)] mb-4 md:mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {content?.hero?.headline || "Own your Power. Shape your Story."}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-light)]/90 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            {content?.hero?.subheading ||
              "Transform your mental health journey with personalized psychiatric care designed for women ready to step into their power."}
          </p>
          <button
            onClick={scrollToSection6}
            className="btn-primary text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5"
          >
            {content?.hero?.ctaText || "Begin Your Transformation"}
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

      {/* Section 2: Intro Statement */}
      <section
        className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, var(--bg-cream-light) 0%, var(--bg-rose-dust) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[var(--text-dark)] italic leading-relaxed border-l-4 border-[var(--brand-pink)] pl-4 sm:pl-6 md:pl-8 py-4 sm:py-6 md:py-8 bg-white/60 rounded-2xl backdrop-blur-sm">
            {content?.introStatement ||
              "\"You deserve to live a life that feels as beautiful on the inside as it appears on the outside. Together, we'll unlock the woman who's been waiting to emerge.\""}
          </blockquote>
        </div>
      </section>

      {/* Section 3: What You'll Experience */}
      <section className="section-padding-compact bg-[var(--bg-cream-light)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-[var(--text-dark)] mb-12">
            What You'll Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="card-elegant text-center transform hover:scale-105 transition-all duration-300"
                style={{ boxShadow: "0 10px 30px rgba(213, 159, 160, 0.3)" }}
              >
                <h3 className="text-[var(--brand-brown)] mb-4">
                  {experience.title}
                </h3>
                <p className="text-[var(--text-soft)]">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Client Transformations */}
      <section className="section-padding-compact bg-[var(--bg-cream-mid)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[var(--text-dark)] mb-12">
            Client Transformations
          </h2>

          {transformations.length > 0 && (
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeTransformation * (200 + 32)}px)`,
                }}
              >
                {transformations.map((story, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[200px] h-[260px] mx-4 bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="h-32 bg-[var(--bg-cream-dark)]">
                      {story.image && (
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[var(--text-dark)] mb-1">
                        {story.name}
                      </h4>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-[var(--text-soft)] italic">
                        "{story.quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Awakening Her Power Framework */}
      <section className="section-padding-compact bg-[var(--bg-cream-light)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-[var(--text-dark)] mb-12">
            Awakening Her Power Framework
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: "var(--bg-rose-dust)" }}
                >
                  {tool.icon}
                </div>
                <h4 className="text-[var(--text-dark)] font-medium">
                  {tool.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Let's Begin Together (Clarity Prompts) */}
      <section
        ref={scrollToRef}
        className="section-padding bg-[var(--bg-cream-mid)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[var(--text-dark)] mb-4">
              Ready for your next chapter?
            </h2>
            <p className="text-lg text-[var(--text-soft)] max-w-2xl mx-auto">
              These powerful prompts will help you gain clarity on what's
              holding you back and what's calling you forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {clarityPrompts.map((prompt, index) => (
              <div
                key={index}
                className="card-elegant h-48 flex items-center justify-center text-center cursor-pointer group perspective-1000"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 backface-hidden transition-transform duration-500 group-hover:rotate-y-180 flex items-center justify-center">
                    <p className="text-lg font-medium text-[var(--text-dark)] px-4">
                      Prompt {index + 1}
                    </p>
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 transition-transform duration-500 group-hover:rotate-y-0 flex items-center justify-center bg-[var(--brand-pink)] text-white rounded-2xl">
                    <p className="text-sm font-medium px-4">{prompt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/assets/Clarity_Journal.pdf"
              download
              className="btn-secondary inline-flex items-center gap-3"
            >
              <Download size={20} />
              Download Clarity Journal
            </a>
          </div>
        </div>
      </section>

      {/* Section 7: Booking CTA */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage: content?.bookingCTA?.backgroundImage
            ? `url('${content.bookingCTA.backgroundImage}')`
            : "url(/assets/compare_sessions_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--overlay-dark)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-[var(--text-light)] mb-6">
            {content?.bookingCTA?.heading || "Take the First Step"}
          </h2>
          <p className="text-xl text-[var(--text-light)]/90 mb-8 max-w-2xl mx-auto">
            {content?.bookingCTA?.description ||
              "Your transformation begins with a single conversation. Let's explore what's possible for you."}
          </p>
          <a
            href={
              content?.bookingCTA?.buttonUrl ||
              "https://calendly.com/tashaniyi/30min?month=2025-07"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 text-xl px-10 py-5"
          >
            <Calendar size={24} />
            {content?.bookingCTA?.buttonText ||
              "Book Your Free 30-min Clarity Call"}
          </a>
        </div>
      </section>

      {/* Section 8: Testimonials (if kept) */}
      {content?.testimonials?.testimonials &&
        content.testimonials.testimonials.length > 0 && (
          <section className="section-padding-compact bg-[var(--bg-cream-light)]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center text-[var(--text-dark)] mb-12">
                What Clients Say
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.testimonials.testimonials
                  .slice(0, 3)
                  .map((testimonial, index) => (
                    <div key={index} className="card-elegant">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-[var(--text-soft)] italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        {testimonial.image && (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-[var(--text-dark)]">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-[var(--text-soft)]">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}
    </div>
  );
};

export default NewHome;
