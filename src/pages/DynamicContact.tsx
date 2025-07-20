import { useState } from "react";
import { useContent } from "../hooks/useContent";
import { ConfigurationBanner } from "../components/ConfigurationBanner";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import {
  Loader2,
  Download,
  ExternalLink,
  Mail,
  User,
  MessageSquare,
} from "lucide-react";

const DynamicContact = () => {
  const { content, loading } = useContent("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description:
        "Thank you for reaching out. I'll get back to you within 48 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    <div className="min-h-screen bg-[#F8F4EF]">
      <SEO
        title="Contact | High Agency Collective"
        description="Ready to start your transformation? Connect with us to begin your journey toward clarity, reinvention, and high agency living. You're not alone."
        canonicalUrl="/contact"
        keywords="contact, consultation, mental health appointment, transformation journey, psychiatric services"
      />
      <ConfigurationBanner />

      {/* Welcome Section */}
      <section className="py-12 bg-[#F8F4EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#3A2D28] mb-4 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {content.welcome?.heading || "You're not alone."}
          </h1>
          <p
            className="text-lg md:text-xl text-[#3A2D28] leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Lora, serif" }}
          >
            {content.welcome?.text ||
              "If you're feeling called to shift, expand, or simply be heard—this space is for you. Let's connect in a way that feels aligned and supportive for you."}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2CDB3]/30">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#3A2D28] mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {content.form?.title || "What's on your mind?"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-[#3A2D28] mb-2"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  <User className="inline w-4 h-4 mr-2" />
                  {content.form?.nameLabel || "Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E2CDB3] rounded-xl focus:ring-2 focus:ring-[#B47A5A]/50 focus:border-[#B47A5A] transition-all duration-300"
                  placeholder={
                    content.form?.namePlaceholder || "Enter your name"
                  }
                  style={{ fontFamily: "Lora, serif" }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#3A2D28] mb-2"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  <Mail className="inline w-4 h-4 mr-2" />
                  {content.form?.emailLabel || "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E2CDB3] rounded-xl focus:ring-2 focus:ring-[#B47A5A]/50 focus:border-[#B47A5A] transition-all duration-300"
                  placeholder={
                    content.form?.emailPlaceholder || "your.email@example.com"
                  }
                  style={{ fontFamily: "Lora, serif" }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#3A2D28] mb-2"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  {content.form?.messageLabel || "Your Message"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#E2CDB3] rounded-xl focus:ring-2 focus:ring-[#B47A5A]/50 focus:border-[#B47A5A] transition-all duration-300 resize-none"
                  placeholder={
                    content.form?.messagePlaceholder ||
                    "Share what's on your heart..."
                  }
                  style={{ fontFamily: "Lora, serif" }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B47A5A] text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.form?.buttonText || "Send Message"}
              </button>

              <p
                className="text-sm text-[#6A6A6A] text-center italic"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.form?.responseNote ||
                  "I personally review all messages and will respond within 48 hours."}
              </p>
            </form>
          </div>

          {/* Right Column - Other Connection Options */}
          <div className="space-y-6">
            {/* Calendly Booking Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2CDB3]/30">
              <h3
                className="text-xl md:text-2xl font-bold text-[#3A2D28] mb-3"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.booking?.title || "Prefer to speak directly?"}
              </h3>
              <p
                className="text-base text-[#6A6A6A] mb-4"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.booking?.description ||
                  "Book a 30-minute clarity session."}
              </p>

              <div className="bg-[#F8F4EF] rounded-xl p-4 mb-4">
                <iframe
                  src={
                    content.booking?.calendlyUrl ||
                    "https://calendly.com/tashaniyi/30min?month=2025-07"
                  }
                  width="100%"
                  height="400"
                  frameBorder="0"
                  className="rounded-lg"
                  title="Schedule a session"
                ></iframe>
              </div>

              <a
                href={
                  content.booking?.calendlyUrl ||
                  "https://calendly.com/tashaniyi/30min?month=2025-07"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#B47A5A] hover:text-[#A06847] transition-colors duration-300"
                style={{ fontFamily: "Lora, serif" }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {content.booking?.newTabButtonText || "Open in new tab"}
              </a>
            </div>

            {/* Not Ready Yet Section */}
            <div className="bg-[#EFEAE3] rounded-2xl p-6 shadow-sm border border-[#E2CDB3]/30">
              <h3
                className="text-xl md:text-2xl font-bold text-[#3A2D28] mb-3"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.notReady?.title || "Not ready to talk yet?"}
              </h3>
              <p
                className="text-base text-[#6A6A6A] mb-2"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.notReady?.text ||
                  "That's perfectly okay. Sometimes we just need a moment to breathe and reflect."}
              </p>
              <p
                className="text-base text-[#6A6A6A] mb-4"
                style={{ fontFamily: "Lora, serif" }}
              >
                {content.notReady?.downloadText ||
                  "Download this free self-reflection journal to begin privately."}
              </p>

              <a
                href={content.notReady?.pdfUrl || "/assets/Clarity_Journal.pdf"}
                download
                className="inline-flex items-center bg-[#B47A5A] text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-[#A06847] transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{ fontFamily: "Lora, serif" }}
              >
                <Download className="w-4 h-4 mr-2" />
                {content.notReady?.buttonText || "Download Free Journal"}
              </a>
            </div>

            {/* Social Contact Info Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2CDB3]/30">
              <h3
                className="text-xl md:text-2xl font-bold text-[#3A2D28] mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {content.social?.title || "Other ways to connect"}
              </h3>

              <div className="space-y-3">
                {/* Email */}
                <a
                  href={
                    content.social?.email?.url ||
                    "mailto:hello@awakenherpower.com"
                  }
                  className="flex items-center p-3 rounded-xl hover:bg-[#F8F4EF] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#EFEAE3] rounded-full flex items-center justify-center mr-4 group-hover:bg-[#E2CDB3] transition-colors duration-300">
                    <Mail className="w-5 h-5 text-[#B47A5A]" />
                  </div>
                  <div>
                    <div
                      className="font-semibold text-[#3A2D28]"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {content.social?.email?.title || "Email"}
                    </div>
                    <div
                      className="text-sm text-[#6A6A6A]"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {content.social?.email?.value ||
                        "hello@awakenherpower.com"}
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={
                    content.social?.linkedin?.url ||
                    "https://linkedin.com/in/awakenherpower"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-xl hover:bg-[#F8F4EF] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#EFEAE3] rounded-full flex items-center justify-center mr-4 group-hover:bg-[#E2CDB3] transition-colors duration-300">
                    <span className="text-[#B47A5A] font-bold text-sm">in</span>
                  </div>
                  <div>
                    <div
                      className="font-semibold text-[#3A2D28]"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {content.social?.linkedin?.title || "LinkedIn"}
                    </div>
                    <div
                      className="text-sm text-[#6A6A6A]"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      Professional insights & articles
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={
                    content.social?.instagram?.url ||
                    "https://instagram.com/awakenherpower"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-xl hover:bg-[#F8F4EF] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#EFEAE3] rounded-full flex items-center justify-center mr-4 group-hover:bg-[#E2CDB3] transition-colors duration-300">
                    <span className="text-[#B47A5A] font-bold text-sm">IG</span>
                  </div>
                  <div>
                    <div
                      className="font-semibold text-[#3A2D28]"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {content.social?.instagram?.title || "Instagram"}
                    </div>
                    <div
                      className="text-sm text-[#6A6A6A]"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      Daily inspiration & insights
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicContact;
