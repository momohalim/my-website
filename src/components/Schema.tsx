import { useEffect } from "react";

interface SchemaProps {
  type: "organization" | "person" | "medicalBusiness" | "website";
  data?: any;
}

const Schema = ({ type, data }: SchemaProps) => {
  useEffect(() => {
    const createSchema = () => {
      const baseUrl = window.location.origin;

      let schemaData;

      switch (type) {
        case "organization":
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "High Agency Collective",
            url: baseUrl,
            logo: `${baseUrl}/assets/Gold HA negative background (1).svg`,
            description:
              "High Agency Collective provides transformational psychiatric mental health services for women. Own your Power. Shape your Story.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "",
              contactType: "customer service",
              email: "hello@awakenherpower.com",
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "US",
            },
            sameAs: [
              "https://www.instagram.com/highagenycollective",
              "https://www.linkedin.com/company/highagenycollective",
            ],
          };
          break;

        case "person":
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: data?.name || "High Agency Collective Practitioner",
            jobTitle: "Psychiatric Mental Health Nurse Practitioner",
            description:
              "Experienced psychiatric mental health nurse practitioner specializing in women's mental health, transformation, and high agency living.",
            worksFor: {
              "@type": "Organization",
              name: "High Agency Collective",
            },
            url: baseUrl,
            image: data?.image || `${baseUrl}/assets/practitioner-image.jpg`,
            knowsAbout: [
              "Psychiatric Mental Health",
              "Women's Wellness",
              "Transformational Therapy",
              "High Agency Living",
              "Mental Health Consultation",
            ],
          };
          break;

        case "medicalBusiness":
          schemaData = {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "High Agency Collective",
            description:
              "Psychiatric mental health services specializing in transformational tracks for women seeking clarity, reinvention, and high agency living.",
            url: baseUrl,
            logo: `${baseUrl}/assets/Gold HA negative background (1).svg`,
            priceRange: "$$",
            paymentAccepted: ["Cash", "Credit Card", "Insurance"],
            currenciesAccepted: "USD",
            openingHours: "Mo-Fr 09:00-17:00",
            telephone: "",
            email: "hello@awakenherpower.com",
            address: {
              "@type": "PostalAddress",
              addressCountry: "US",
            },
            medicalSpecialty: "Psychiatry",
            serviceType: [
              "Mental Health Consultation",
              "Psychiatric Evaluation",
              "Therapy Sessions",
              "Transformational Coaching",
            ],
          };
          break;

        case "website":
          schemaData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "High Agency Collective",
            url: baseUrl,
            description:
              "Transform your mental health journey with personalized psychiatric care. Own your Power. Shape your Story.",
            publisher: {
              "@type": "Organization",
              name: "High Agency Collective",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          };
          break;

        default:
          return;
      }

      // Remove existing schema of the same type
      const existingSchema = document.querySelector(
        `script[data-schema-type="${type}"]`,
      );
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add new schema
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema-type", type);
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    };

    createSchema();

    // Cleanup on unmount
    return () => {
      const schema = document.querySelector(
        `script[data-schema-type="${type}"]`,
      );
      if (schema) {
        schema.remove();
      }
    };
  }, [type, data]);

  return null;
};

export default Schema;
