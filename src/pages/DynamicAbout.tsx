import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { ConfigurationBanner } from "../components/ConfigurationBanner";
import { Loader2, Star, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

const DynamicAbout = () => {
  const { content, loading } = useContent("about");

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

  const values = content.values?.values || [];
  const specialties = content.clinicianToGuide?.specialties || [];
  const certificates = content.credentials?.certificates || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E2CDB3]/30 to-white">
      <SEO
        title="About | High Agency Collective"
        description="Meet your psychiatric mental health nurse practitioner. Discover my journey from clinician to guide, my values, and how I help women own their power and shape their story."
        canonicalUrl="/about"
        keywords="psychiatric nurse practitioner, mental health provider, women's wellness, professional journey, clinical expertise"
      />
      <ConfigurationBanner />

      {/* Introduction Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeIn">
            <p
              className="text-xl md:text-2xl text-[#1A1A1A] leading-relaxed font-light"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.introduction?.content ||
                "At The High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership..."}
            </p>
          </div>
        </div>
      </section>

      {/* The Calling Section */}
      <section className="py-20 bg-gradient-to-r from-[#2C2C2C] to-[#3D3D3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.calling?.title ||
                  "It Was Never Just a Career. It Was a Calling."}
              </h2>
              <p
                className="text-xl text-white/90 leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.calling?.content ||
                  "My journey began in the clinical world, working as a Psychiatric and Mental Health Nurse Practitioner..."}
              </p>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={
                    content.calling?.image || "/assets/personal_portrait.jpg"
                  }
                  alt="Personal Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💫</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Clinician to Guide Section */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.clinicianToGuide?.title || "Merging Science with Soul"}
              </h2>
              <p
                className="text-xl text-[#4A4A4A] leading-relaxed mb-8"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.clinicianToGuide?.content ||
                  "My approach is unique because it bridges two worlds..."}
              </p>

              <div className="space-y-4">
                <h3
                  className="text-2xl font-semibold text-[#B47A5A] mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Areas of Expertise:
                </h3>
                {specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#B47A5A] flex-shrink-0" />
                    <span
                      className="text-lg text-[#1A1A1A]"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {specialty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {content.clinicianToGuide?.videoUrl ? (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={content.clinicianToGuide.videoUrl}
                      type="video/mp4"
                    />
                    <img
                      src={
                        content.clinicianToGuide?.image ||
                        "/assets/clinician_guide.jpg"
                      }
                      alt="Clinician to Guide"
                      className="w-full h-full object-cover"
                    />
                  </video>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      content.clinicianToGuide?.image ||
                      "/assets/clinician_guide.jpg"
                    }
                    alt="Clinician to Guide"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.values?.title || "What I Stand For"}
            </h2>
            <p
              className="text-xl text-[#6A6A6A]"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.values?.subtitle ||
                "The principles that guide my work and life"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-[#E2CDB3]/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#B47A5A]/10 hover:border-[#B47A5A]/30"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#1A1A1A] mb-4"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-[#6A6A6A] leading-relaxed"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Woman Behind the Brand Section */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {content.womanBehindBrand?.videoUrl ? (
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={content.womanBehindBrand.videoUrl}
                      type="video/mp4"
                    />
                    <img
                      src={
                        content.womanBehindBrand?.image ||
                        "/assets/lifestyle_photo.jpg"
                      }
                      alt="Lifestyle"
                      className="w-full h-full object-cover"
                    />
                  </video>
                </div>
              ) : (
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      content.womanBehindBrand?.image ||
                      "/assets/lifestyle_photo.jpg"
                    }
                    alt="Lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#B47A5A] to-[#C69C84] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl">🌸</span>
              </div>
            </div>

            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.womanBehindBrand?.title ||
                  "A Glimpse Behind the Curtain"}
              </h2>
              <p
                className="text-xl text-[#4A4A4A] leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.womanBehindBrand?.content ||
                  "When I'm not guiding women through their transformations..."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Recognition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.credentials?.title || "Rooted in Integrity & Expertise"}
            </h2>
            <p
              className="text-xl text-[#6A6A6A] mb-6"
              style={{ fontFamily: "Lora, serif" }}
            >
              {content.credentials?.subtitle ||
                "Professional qualifications that support transformational work"}
            </p>

            {/* Rating Display */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[...Array(content.credentials?.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-500 fill-current"
                />
              ))}
              <span
                className="ml-3 text-lg text-[#6A6A6A]"
                style={{ fontFamily: "Lora, serif" }}
              >
                Professional Excellence Rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-[#E2CDB3]/10 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#B47A5A]/10 hover:border-[#B47A5A]/30"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 shadow-md">
                  <img
                    src={cert.image || `/assets/certificate${index + 1}.jpg`}
                    alt={cert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="text-center">
                  <h3
                    className="text-xl font-bold text-[#1A1A1A] mb-2"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {cert.name}
                  </h3>
                  <p
                    className="text-[#B47A5A] font-semibold mb-1"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {cert.organization}
                  </p>
                  <p
                    className="text-[#6A6A6A] text-sm"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Personal Note to You Section */}
      <section className="py-20 bg-gradient-to-r from-[#2C2C2C] to-[#3D3D3D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-8"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.personalNote?.title ||
              "If You're Reading This, Know You're Not Alone"}
          </h2>
          <p
            className="text-xl text-white/90 leading-relaxed mb-8"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.personalNote?.content ||
              "I see you—the woman who has achieved so much but still feels like something is missing..."}
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.cta?.title || "Ready to Begin?"}
          </h2>
          <p
            className="text-xl text-[#6A6A6A] mb-8 leading-relaxed"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.cta?.description ||
              "Your transformation starts with a conversation. Let's explore what's possible when you fully step into your power."}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#B47A5A] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.cta?.buttonText || "Book Your Clarity Session"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DynamicAbout;
