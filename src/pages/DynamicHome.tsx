import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContent } from "../hooks/useContent";
import { ConfigurationBanner } from "../components/ConfigurationBanner";
import { Loader2, Download, Star, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";

const DynamicHome = () => {
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

  const testimonials = content.testimonials?.testimonials || [];
  const services = [
    content.services?.service1,
    content.services?.service2,
    content.services?.service3,
  ].filter(Boolean);
  const questions = content.clarityQuestions?.questions || [];

  return (
    <div className="min-h-screen">
      <SEO
        title="High Agency Collective | Psychiatric Mental Health Nurse Practitioner"
        description="Transform your mental health journey with personalized psychiatric care. Own your Power. Shape your Story. Expert guidance for clarity, reinvention, and high agency living."
        canonicalUrl="/"
        keywords="psychiatric nurse practitioner, mental health, therapy, wellness, high agency, transformation, clarity path, reinvention experience"
      />
      <Schema type="organization" />
      <Schema type="medicalBusiness" />
      <Schema type="website" />
      <ConfigurationBanner />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Video Background */}
        {content.hero?.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={content.hero.videoUrl} type="video/mp4" />
            {/* Fallback image if video fails */}
            <img
              src={
                content.hero?.backgroundImage || "/assets/hero_woman_spa.jpg"
              }
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${content.hero?.backgroundImage || "/assets/hero_woman_spa.jpg"}')`,
            }}
          />
        )}

        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-bg-overlay-dark)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.hero?.title || "Own your Power. Shape your Story."}
          </h1>
          {content.hero?.subtitle && (
            <span className="block text-3xl md:text-4xl font-light text-accent-foreground mt-4 mb-6">
              {content.hero.subtitle}
            </span>
          )}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
            {content.hero?.description ||
              "At THE High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership. Transform your mindset, reclaim your power, and create the life you truly desire."}
          </p>
          <Link to="/contact" className="primary-button text-lg">
            {content.hero?.buttonText || "Book Your Clarity Session"}
          </Link>
        </div>
      </section>

      {/* Meet Your Guide Section */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-heading mb-6"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.introduction?.title || "Meet Your Guide"}
              </h2>
              <p className="text-xl text-muted leading-relaxed mb-8">
                {content.introduction?.content ||
                  "At THE High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership. As a Psychiatric and Mental Health Nurse Practitioner, I combine clinical expertise with transformational coaching to guide you through deep mindset shifts and feminine empowerment."}
              </p>
              <Link
                to={content.introduction?.buttonLink || "/about"}
                className="inline-flex items-center bg-[#B47A5A] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {content.introduction?.buttonText || "Learn More About Me"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={
                    content.introduction?.image || "/assets/guide_portrait.jpg"
                  }
                  alt="Your Guide"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-heading mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.services?.title || "Core Services"}
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              {content.services?.subtitle ||
                "Transform your life through evidence-based approaches and holistic healing."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="elegant-card p-8 text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clarity Journal Section */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={
                    content.clarityJournal?.image ||
                    "/assets/clarity_journal_preview.jpg"
                  }
                  alt="Clarity Journal Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-heading mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.clarityJournal?.title || "Clarity Journal"}
              </h2>
              <p
                className="text-2xl text-primary mb-6"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.clarityJournal?.subtitle ||
                  "Your Free Guide to Inner Transformation"}
              </p>
              <p className="text-xl text-muted leading-relaxed mb-8">
                {content.clarityJournal?.description ||
                  "Explore your inner world with this free guided journal to ignite clarity and confidence. Discover powerful questions and exercises designed to help you reconnect with your authentic self."}
              </p>
              <a
                href={
                  content.clarityJournal?.pdfUrl ||
                  "/assets/Clarity_Journal.pdf"
                }
                download
                className="inline-flex items-center bg-[#B47A5A] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Download className="mr-3 h-5 w-5" />
                {content.clarityJournal?.downloadText ||
                  "Download Your Free Journal"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-heading mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.testimonials?.title || "Client Transformations"}
            </h2>
            <p className="text-xl text-muted">
              {content.testimonials?.subtitle ||
                "Real stories of profound change and empowerment."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="elegant-card p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-accent/20">
                  <img
                    src={
                      testimonial.image || "/assets/testimonial_placeholder.jpg"
                    }
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote
                  className="text-lg text-foreground mb-6 leading-relaxed italic"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  "{testimonial.text}"
                </blockquote>
                <div className="text-primary font-semibold text-lg mb-2">
                  {testimonial.name}
                </div>
                <div className="text-muted text-sm mb-4">
                  {testimonial.role}
                </div>
                <div className="flex justify-center">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clarity Questions Section */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-heading mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.clarityQuestions?.title || "Clarity Questions"}
          </h2>
          <p className="text-xl text-muted mb-8">
            {content.clarityQuestions?.subtitle ||
              "Take a moment to reflect on where you are and where you want to be."}
          </p>
          <p className="text-lg text-muted leading-relaxed mb-12">
            {content.clarityQuestions?.introduction ||
              "These questions are designed to help you gain clarity about your current situation and desires. Take your time with each one, or book a session to explore them together."}
          </p>

          <div className="space-y-6 mb-12">
            {questions.map((question, index) => (
              <div key={index} className="elegant-card p-6 text-left">
                <p
                  className="text-xl font-medium text-primary"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {index + 1}. {question}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-muted mb-6">
              {content.clarityQuestions?.ctaText ||
                "Ready to dive deeper? Book your clarity session."}
            </p>
            <Link to="/contact" className="primary-button text-lg">
              {content.clarityQuestions?.buttonText || "Book Your Session"}
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('${content.cta?.backgroundImage || "/assets/compare_sessions_bg.jpg"}')`,
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
            {content.cta?.title || "Take the First Step"}
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            {content.cta?.description ||
              "Your transformation begins with a single conversation. Let's explore what's possible when you own your power and shape your story."}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {content.cta?.buttonText || "Book Your Clarity Session"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DynamicHome;
