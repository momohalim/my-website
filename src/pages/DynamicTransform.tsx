import { useState } from "react";
import { useContent } from "../hooks/useContent";
import { ConfigurationBanner } from "../components/ConfigurationBanner";
import { Loader2, Star, Play } from "lucide-react";
import SEO from "@/components/SEO";

const DynamicTransform = () => {
  const { content, loading } = useContent("transform");
  const [activePhase, setActivePhase] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

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

  const tools = content.awakeningPower?.tools || [];
  const phases = content.transformationTimeline?.phases || [];
  const testimonials = content.testimonials?.stories || [];
  const questions = content.innerStruggle?.questions || [];

  return (
    <div className="min-h-screen bg-[#F8F4EF]">
      <SEO
        title="Transform | High Agency Collective"
        description="Experience a powerful transformation journey. Discover the 5-phase timeline from awakening to agency and unlock your inner power to create lasting change."
        canonicalUrl="/transform"
        keywords="transformation journey, personal growth, awakening power, high agency, transformation timeline, inner work"
      />
      <ConfigurationBanner />

      {/* The Threshold - Hero Video Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        {/* Video Background */}
        {content.threshold?.videoUrl && !videoPlaying ? (
          <>
            <img
              src={
                content.threshold?.fallbackImage ||
                "/assets/threshold_hero_bg.jpg"
              }
              alt="Transformation begins"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={() => setVideoPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group z-10"
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="h-6 w-6 text-[#B47A5A] ml-1" />
              </div>
            </button>
          </>
        ) : videoPlaying ? (
          <video
            autoPlay
            muted
            controls
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={content.threshold?.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${content.threshold?.fallbackImage || "/assets/threshold_hero_bg.jpg"}')`,
            }}
          />
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.threshold?.title || "The Threshold – Where It Begins"}
          </h1>
          <p
            className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.threshold?.overlayText ||
              "Every transformation begins with an inner whisper. The moment you know things must change—even if you don't yet know how."}
          </p>
          <button
            className="bg-[#B47A5A] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.threshold?.buttonText || "Begin the Journey"}
          </button>
        </div>
      </section>

      {/* The Inner Struggle - Reflective Questions */}
      <section className="py-12 bg-[#F8F4EF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.innerStruggle?.title || "The Inner Struggle"}
            </h2>
            <p
              className="text-lg text-[#6A6A6A]"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.innerStruggle?.subtitle ||
                "Questions that awaken your truth"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2CDB3]/30 hover:shadow-md transition-shadow duration-300"
              >
                <p
                  className="text-base font-medium text-[#1A1A1A] leading-relaxed"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awakening Her Power - Tools Grid */}
      <section className="py-12 bg-[#E2CDB3]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.awakeningPower?.title || "Awakening Her Power"}
            </h2>
            <p
              className="text-lg text-[#6A6A6A]"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.awakeningPower?.subtitle ||
                "The tools and frameworks for transformation"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md border border-[#DCC5A8]/30">
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <h3
                  className="text-lg font-semibold text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {tool.name}
                </h3>
                <p
                  className="text-sm text-[#6A6A6A] leading-relaxed"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Shift - Interactive Timeline */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.transformationTimeline?.title ||
                "The Shift – Transformation Timeline"}
            </h2>
            <p
              className="text-lg text-[#6A6A6A]"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.transformationTimeline?.subtitle ||
                "Five phases of profound change"}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#DCC5A8]"></div>

            {/* Timeline points */}
            <div className="flex justify-between items-start relative">
              {phases.map((phase, index) => (
                <div key={index} className="flex flex-col items-center w-1/5">
                  <button
                    onClick={() => setActivePhase(index)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300 z-10 ${
                      activePhase === index
                        ? "bg-[#B47A5A] border-[#B47A5A] text-white shadow-lg scale-110"
                        : "bg-white border-[#DCC5A8] text-[#B47A5A] hover:border-[#B47A5A]"
                    }`}
                  >
                    {index + 1}
                  </button>
                  <h3
                    className={`text-sm font-medium mt-3 text-center transition-colors duration-300 ${
                      activePhase === index
                        ? "text-[#B47A5A]"
                        : "text-[#6A6A6A]"
                    }`}
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {phase.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Phase description */}
            <div className="mt-8 min-h-[80px]">
              {phases[activePhase] && (
                <div className="bg-[#F8F4EF] p-6 rounded-2xl border border-[#E2CDB3]/30">
                  <h4
                    className="text-xl font-semibold text-[#1A1A1A] mb-3"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {phases[activePhase].name}
                  </h4>
                  <p
                    className="text-base text-[#4A4A4A] leading-relaxed"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {phases[activePhase].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real Women, Real Change - Testimonials */}
      <section className="py-12 bg-[#E2CDB3]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.testimonials?.title || "Real Women, Real Change"}
            </h2>
            <p
              className="text-lg text-[#6A6A6A]"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.testimonials?.subtitle ||
                "Stories of transformation from women who've walked this path"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-[#DCC5A8]/30 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-sm border-2 border-[#E2CDB3]/30">
                  <img
                    src={
                      testimonial.image ||
                      "/assets/transform_testimonial_placeholder.jpg"
                    }
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote
                  className="text-base text-[#4A4A4A] mb-4 leading-relaxed italic"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  "{testimonial.text}"
                </blockquote>
                <div className="text-[#1A1A1A] font-semibold mb-1">
                  {testimonial.name}
                </div>
                <div className="text-sm text-[#6A6A6A] mb-3">
                  {testimonial.role}
                </div>
                <div className="flex justify-center">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Prompt - Are You Ready? */}
      <section className="py-12 bg-gradient-to-br from-[#B47A5A] to-[#DCC5A8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.finalPrompt?.title ||
              "Transformation isn't a luxury. It's your birthright."}
          </h2>
          <p
            className="text-lg text-white/90 mb-6 leading-relaxed"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.finalPrompt?.description ||
              "You were born to live fully, love deeply, and lead authentically. The only question is: are you ready to begin?"}
          </p>
          <a
            href={
              content.finalPrompt?.calendlyUrl ||
              "https://calendly.com/tashaniyi/30min"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#B47A5A] px-8 py-3 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.finalPrompt?.buttonText || "Book Your First Session"}
          </a>
        </div>
      </section>
    </div>
  );
};

export default DynamicTransform;
