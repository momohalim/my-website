import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContent } from "../hooks/useContent";
import { Loader2 } from "lucide-react";

const Home = () => {
  const { content, loading } = useContent("home");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (content?.testimonials?.testimonials?.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial(
          (prev) => (prev + 1) % content.testimonials.testimonials.length,
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content?.testimonials?.testimonials?.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unable to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${content.hero?.backgroundImage || "/assets/hero_woman_spa.jpg"}')`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.hero?.title || "Awaken Her Power"}
            <span className="block text-3xl md:text-4xl font-light text-accent-foreground mt-2">
              {content.hero?.subtitle || "Within"}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            {content.hero?.description ||
              "Embrace your feminine strength, align with your deepest truth, and create a life that flows with purpose and joy."}
          </p>
          <Link to="/contact" className="primary-button text-lg">
            {content.hero?.buttonText || "Start Your Journey"}
          </Link>
        </div>
      </section>

      {/* The 3 Pillars Section */}
      <section className="py-20 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-heading mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.pillars?.title || "The Three Pillars"}
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              {content.pillars?.subtitle ||
                "A holistic approach to awakening your feminine power through emotional wellness, career alignment, and authentic self-expression."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Emotional Wellness */}
            <div className="elegant-card p-8 text-center">
              <div
                className="w-32 h-32 bg-cover bg-center rounded-full mx-auto mb-6 shadow-lg border-4 border-accent/20"
                style={{
                  backgroundImage: `url('${content.pillars?.pillar1?.image || "/assets/pillar_emotion.jpg"}')`,
                }}
              ></div>
              <h3
                className="text-2xl font-bold text-primary mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.pillars?.pillar1?.title || "Emotional Wellness"}
              </h3>
              <p className="text-muted leading-relaxed">
                {content.pillars?.pillar1?.description ||
                  "Heal deep wounds, release limiting beliefs, and cultivate emotional intelligence that serves your highest self."}
              </p>
            </div>

            {/* Career Alignment */}
            <div className="elegant-card p-8 text-center">
              <div
                className="w-32 h-32 bg-cover bg-center rounded-full mx-auto mb-6 shadow-lg border-4 border-accent/20"
                style={{
                  backgroundImage: `url('/assets/pillar_career.jpg')`,
                }}
              ></div>
              <h3
                className="text-2xl font-bold text-primary mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Career Alignment
              </h3>
              <p className="text-muted leading-relaxed">
                Discover your soul's calling and create a career path that
                honors both your ambitions and your values.
              </p>
            </div>

            {/* Feminine Power Activation */}
            <div className="elegant-card p-8 text-center">
              <div
                className="w-32 h-32 bg-cover bg-center rounded-full mx-auto mb-6 shadow-lg border-4 border-accent/20"
                style={{
                  backgroundImage: `url('/assets/pillar_feminine.jpg')`,
                }}
              ></div>
              <h3
                className="text-2xl font-bold text-primary mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Feminine Power Activation
              </h3>
              <p className="text-muted leading-relaxed">
                Embrace your intuition, creativity, and natural cycles to live
                in harmony with your feminine essence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote & Visual Section */}
      <section
        className="relative py-32 text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/bubblebath_reflection.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote
            className="text-3xl md:text-4xl font-light text-white mb-8 leading-relaxed"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            "The most powerful thing you can do is to begin to honor the woman
            you're becoming while loving the woman you've been."
          </blockquote>
          <p className="text-xl text-white/80">
            — Your journey starts with self-compassion
          </p>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-heading mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Transformation Stories
            </h2>
            <p className="text-xl text-muted">
              Real women, real breakthroughs, real power awakened.
            </p>
          </div>

          <div className="relative">
            <div className="elegant-card p-12 max-w-4xl mx-auto text-center">
              <div
                className="w-20 h-20 bg-cover bg-center rounded-full mx-auto mb-6 shadow-lg border-4 border-accent/20"
                style={{
                  backgroundImage: `url('/assets/women_diverse_group.jpg')`,
                }}
              ></div>
              <blockquote
                className="text-2xl text-foreground mb-6 leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="text-primary font-semibold text-lg">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-muted text-sm">
                {testimonials[currentTestimonial].role}
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Banner */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/compare_sessions_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Take the First Step
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your transformation begins with a single conversation. Let's talk
            about where you are and where you want to be.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Your Clarity Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
