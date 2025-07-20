import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { ConfigurationBanner } from "../components/ConfigurationBanner";
import { Loader2, Check, Navigation, Sparkles, Crown } from "lucide-react";
import SEO from "@/components/SEO";

const DynamicServices = () => {
  const { content, loading } = useContent("services");

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

  const tracks = content.tracks || {};
  const { clarityPath, reinventionExperience, highAgencyMethod } = tracks;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E2CDB3]/20 to-white">
      <SEO
        title="Services | High Agency Collective"
        description="Discover our transformational tracks: Clarity Path, Reinvention Experience, and High Agency Method. Personalized mental health services for women ready to transform."
        canonicalUrl="/services"
        keywords="mental health services, transformational tracks, clarity path, reinvention experience, high agency method, women's wellness"
      />
      <ConfigurationBanner />

      {/* Hero Section - Clean and Minimal */}
      <section className="py-20 bg-gradient-to-br from-[#E2CDB3]/30 to-[#D4C5B0]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.hero?.title || "Your Transformation Journey"}
          </h1>
          <p
            className="text-2xl md:text-3xl text-[#B47A5A] mb-8 font-light"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.hero?.subtitle || "Three Pathways to Self-Leadership"}
          </p>
          <p
            className="text-xl text-[#4A4A4A] leading-relaxed max-w-4xl mx-auto"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.hero?.description ||
              "Choose the path that honors where you are right now while guiding you toward the woman you're becoming. Each track is designed to meet you exactly where you are in your journey of self-discovery and transformation."}
          </p>
        </div>
      </section>

      {/* Service Tracks Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {/* The Clarity Path */}
            {clarityPath?.active && (
              <div className="group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#E2CDB3] to-[#D4C5B0] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Navigation className="h-8 w-8 text-[#B47A5A]" />
                      </div>
                      <div>
                        <h3
                          className="text-3xl md:text-4xl font-bold text-[#1A1A1A]"
                          style={{ fontFamily: "Cormorant Garamond, serif" }}
                        >
                          {clarityPath.title || "The Clarity Path"}
                        </h3>
                        <p
                          className="text-lg text-[#B47A5A] font-medium"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {clarityPath.subtitle ||
                            "For women who are just beginning their inner journey"}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-xl text-[#4A4A4A] leading-relaxed mb-6"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {clarityPath.description ||
                        "Perfect for women feeling overwhelmed or mentally scattered, ready to gain clarity and direction. This is your starting point to understanding what you really want and need."}
                    </p>

                    {clarityPath.highlightNote && (
                      <div className="bg-[#E2CDB3]/20 border-l-4 border-[#B47A5A] p-4 mb-6">
                        <p
                          className="text-[#B47A5A] font-medium italic"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {clarityPath.highlightNote}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 mb-8">
                      {clarityPath.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Check className="h-5 w-5 text-[#B47A5A] flex-shrink-0" />
                          <span
                            className="text-lg text-[#1A1A1A]"
                            style={{ fontFamily: "Lora, serif" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6 p-6 bg-white rounded-2xl shadow-sm border border-[#E2CDB3]/30">
                      <span
                        className="text-3xl font-bold text-[#B47A5A]"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        {clarityPath.price || "$297"}
                      </span>
                      <span
                        className="text-sm text-[#6A6A6A] uppercase tracking-wide"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        {clarityPath.duration || "Single Session"}
                      </span>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-block bg-gradient-to-r from-[#B47A5A] to-[#C69C84] text-white px-8 py-4 rounded-full text-lg font-medium hover:from-[#A06847] hover:to-[#B47A5A] transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {clarityPath.buttonText || "Book Your Clarity Session"}
                    </Link>
                  </div>

                  <div className="order-1 lg:order-2 relative">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                      <img
                        src={clarityPath.image || "/assets/clarity_path.jpg"}
                        alt="The Clarity Path"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#E2CDB3] to-[#D4C5B0] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">🧭</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* The Reinvention Experience */}
            {reinventionExperience?.active && (
              <div className="group bg-gradient-to-br from-[#B47A5A]/5 to-[#C69C84]/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                {reinventionExperience.popular && (
                  <div className="absolute top-8 right-8 bg-[#B47A5A] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                    Most Popular
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                      <img
                        src={
                          reinventionExperience.image ||
                          "/assets/reinvention_experience.jpg"
                        }
                        alt="The Reinvention Experience"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">🦋</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-3xl md:text-4xl font-bold text-[#1A1A1A]"
                          style={{ fontFamily: "Cormorant Garamond, serif" }}
                        >
                          {reinventionExperience.title ||
                            "The Reinvention Experience"}
                        </h3>
                        <p
                          className="text-lg text-[#B47A5A] font-medium"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {reinventionExperience.subtitle ||
                            "For those ready to break old patterns"}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-xl text-[#4A4A4A] leading-relaxed mb-6"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {reinventionExperience.description ||
                        "Ready to break free from limiting patterns and create meaningful change? This intensive experience combines clinical expertise with strategic support to help you reinvent your relationship with yourself."}
                    </p>

                    {reinventionExperience.highlightNote && (
                      <div className="bg-[#B47A5A]/10 border-l-4 border-[#B47A5A] p-4 mb-6">
                        <p
                          className="text-[#B47A5A] font-medium italic"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {reinventionExperience.highlightNote}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 mb-8">
                      {reinventionExperience.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Check className="h-5 w-5 text-[#B47A5A] flex-shrink-0" />
                          <span
                            className="text-lg text-[#1A1A1A]"
                            style={{ fontFamily: "Lora, serif" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6 p-6 bg-white/80 rounded-2xl shadow-sm border border-[#B47A5A]/20">
                      <span
                        className="text-3xl font-bold text-[#B47A5A]"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        {reinventionExperience.price || "$1,497"}
                      </span>
                      <span
                        className="text-sm text-[#6A6A6A] uppercase tracking-wide"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        {reinventionExperience.duration || "2-3 Months"}
                      </span>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-block bg-gradient-to-r from-[#B47A5A] to-[#C69C84] text-white px-8 py-4 rounded-full text-lg font-medium hover:from-[#A06847] hover:to-[#B47A5A] transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {reinventionExperience.buttonText ||
                        "Start Your Reinvention"}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* The High Agency Method */}
            {highAgencyMethod?.active && (
              <div className="group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#8B6F47] to-[#B47A5A] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Crown className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-3xl md:text-4xl font-bold text-[#1A1A1A]"
                          style={{ fontFamily: "Cormorant Garamond, serif" }}
                        >
                          {highAgencyMethod.title || "The High Agency Method"}
                        </h3>
                        <p
                          className="text-lg text-[#B47A5A] font-medium"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {highAgencyMethod.subtitle ||
                            "Deep mentorship for intentional living"}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-xl text-[#4A4A4A] leading-relaxed mb-6"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {highAgencyMethod.description ||
                        "A deep mentorship container for self-led women ready to embody elegance, standards, and intentional leadership. This comprehensive program integrates mindset, lifestyle, and feminine power for profound transformation."}
                    </p>

                    {highAgencyMethod.highlightNote && (
                      <div className="bg-gradient-to-r from-[#8B6F47]/10 to-[#B47A5A]/10 border-l-4 border-[#B47A5A] p-4 mb-6">
                        <p
                          className="text-[#B47A5A] font-medium italic"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {highAgencyMethod.highlightNote}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 mb-8">
                      {highAgencyMethod.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Check className="h-5 w-5 text-[#B47A5A] flex-shrink-0" />
                          <span
                            className="text-lg text-[#1A1A1A]"
                            style={{ fontFamily: "Lora, serif" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6 p-6 bg-gradient-to-r from-[#8B6F47]/5 to-[#B47A5A]/5 rounded-2xl shadow-sm border border-[#B47A5A]/20">
                      <span
                        className="text-3xl font-bold text-[#B47A5A]"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        {highAgencyMethod.price || "Starting at $3,997"}
                      </span>
                      <span
                        className="text-sm text-[#6A6A6A] uppercase tracking-wide"
                        style={{ fontFamily: "Lora, serif" }}
                      >
                        {highAgencyMethod.duration || "3-6 Months"}
                      </span>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-block bg-gradient-to-r from-[#8B6F47] to-[#B47A5A] text-white px-8 py-4 rounded-full text-lg font-medium hover:from-[#7A5F3D] hover:to-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {highAgencyMethod.buttonText || "Apply for High Agency"}
                    </Link>
                  </div>

                  <div className="order-1 lg:order-2 relative">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                      <img
                        src={
                          highAgencyMethod.image ||
                          "/assets/high_agency_method.jpg"
                        }
                        alt="The High Agency Method"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#8B6F47] to-[#B47A5A] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">👑</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {content.comparison?.showComparison && (
        <section className="py-20 bg-gradient-to-br from-[#E2CDB3]/20 to-[#D4C5B0]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.comparison.title || "Which Path is Right for You?"}
              </h2>
              <p
                className="text-xl text-[#6A6A6A]"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.comparison.subtitle ||
                  "Understanding the differences between each transformational pathway."}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#B47A5A] to-[#C69C84]">
                    <tr>
                      <th
                        className="px-8 py-6 text-left text-white font-semibold text-lg"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        Track
                      </th>
                      <th
                        className="px-8 py-6 text-left text-white font-semibold text-lg"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        Duration
                      </th>
                      <th
                        className="px-8 py-6 text-left text-white font-semibold text-lg"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        Focus
                      </th>
                      <th
                        className="px-8 py-6 text-left text-white font-semibold text-lg"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        Ideal Client
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {clarityPath?.active && (
                      <tr className="hover:bg-[#E2CDB3]/10 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <span className="text-3xl mr-4">🧭</span>
                            <div>
                              <div
                                className="font-semibold text-[#1A1A1A] text-lg"
                                style={{
                                  fontFamily: "Cormorant Garamond, serif",
                                }}
                              >
                                {clarityPath.title}
                              </div>
                              <div className="text-sm text-[#B47A5A] font-medium">
                                {clarityPath.price}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {clarityPath.duration}
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {clarityPath.focus || "Mental clarity and direction"}
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {clarityPath.whoFor || "Women feeling overwhelmed"}
                        </td>
                      </tr>
                    )}
                    {reinventionExperience?.active && (
                      <tr className="hover:bg-[#B47A5A]/5 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <span className="text-3xl mr-4">🦋</span>
                            <div>
                              <div
                                className="font-semibold text-[#1A1A1A] text-lg"
                                style={{
                                  fontFamily: "Cormorant Garamond, serif",
                                }}
                              >
                                {reinventionExperience.title}
                                {reinventionExperience.popular && (
                                  <span className="ml-2 bg-[#B47A5A] text-white px-2 py-1 rounded-full text-xs">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-[#B47A5A] font-medium">
                                {reinventionExperience.price}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {reinventionExperience.duration}
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {reinventionExperience.focus ||
                            "Pattern breaking and identity shift"}
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {reinventionExperience.whoFor ||
                            "Women ready for change"}
                        </td>
                      </tr>
                    )}
                    {highAgencyMethod?.active && (
                      <tr className="hover:bg-[#8B6F47]/5 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <Crown className="h-8 w-8 text-[#B47A5A] mr-4" />
                            <div>
                              <div
                                className="font-semibold text-[#1A1A1A] text-lg"
                                style={{
                                  fontFamily: "Cormorant Garamond, serif",
                                }}
                              >
                                {highAgencyMethod.title}
                              </div>
                              <div className="text-sm text-[#B47A5A] font-medium">
                                {highAgencyMethod.price}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {highAgencyMethod.duration}
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {highAgencyMethod.focus ||
                            "Leadership and lifestyle mastery"}
                        </td>
                        <td
                          className="px-8 py-6 text-[#4A4A4A]"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {highAgencyMethod.whoFor ||
                            "Leaders seeking transformation"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section - Clean and Elegant */}
      <section className="py-20 bg-gradient-to-br from-[#B47A5A] to-[#C69C84]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.cta?.title || "Ready to Begin Your Transformation?"}
          </h2>
          <p
            className="text-xl text-white/90 mb-8 leading-relaxed"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.cta?.description ||
              "Not sure which track is right for you? Let's have a conversation to explore what would serve you best right now."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-[#B47A5A] px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.cta?.buttonText || "Schedule a Discovery Call"}
            </Link>
            {content.cta?.secondaryButtonText && (
              <button
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-[#B47A5A] transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.cta.secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicServices;
