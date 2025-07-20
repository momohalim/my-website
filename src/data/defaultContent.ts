// Comprehensive default content for all pages
export const getDefaultContent = (slug: string) => {
  const defaults: Record<string, any> = {
    home: {
      hero: {
        headline: "Own your Power. Shape your Story.",
        subheading:
          "Transform your mental health journey with personalized psychiatric care designed for women ready to step into their power.",
        ctaText: "Begin Your Transformation",
        videoUrl: "/assets/hero_video.mp4",
        backgroundImage: "/assets/hero_woman_spa.jpg", // fallback
      },
      introStatement:
        "You deserve to live a life that feels as beautiful on the inside as it appears on the outside. Together, we'll unlock the woman who's been waiting to emerge.",
      experiences: [
        {
          title: "Mindset Reset",
          description:
            "Transform limiting beliefs into empowering truths that serve your highest potential.",
        },
        {
          title: "Self-Leadership",
          description:
            "Develop unshakeable confidence and clarity in your decision-making.",
        },
        {
          title: "Feminine Power",
          description:
            "Embrace your authentic strength and wisdom as a powerful woman.",
        },
      ],
      transformations: {
        stories: [
          {
            name: "Sarah M.",
            image: "/assets/testimonial_sarah.jpg",
            quote: "I finally feel like myself again",
            rating: 5,
          },
          {
            name: "Jennifer K.",
            image: "/assets/testimonial_jennifer.jpg",
            quote: "The transformation has been incredible",
            rating: 5,
          },
          {
            name: "Maria L.",
            image: "/assets/testimonial_maria.jpg",
            quote: "I'm living my authentic truth now",
            rating: 5,
          },
          {
            name: "Amanda R.",
            image: "/assets/testimonial_amanda.jpg",
            quote: "Best decision I ever made",
            rating: 5,
          },
          {
            name: "Lisa T.",
            image: "/assets/testimonial_lisa.jpg",
            quote: "I found my inner strength",
            rating: 5,
          },
          {
            name: "Rachel D.",
            image: "/assets/testimonial_rachel.jpg",
            quote: "Life-changing experience",
            rating: 5,
          },
        ],
      },
      tools: [
        { name: "Cognitive Reframing", icon: "🧠" },
        { name: "Mindfulness", icon: "🧘‍♀️" },
        { name: "Lifestyle Redesign", icon: "✨" },
        { name: "Trauma-Informed Reflection", icon: "💚" },
      ],
      clarityPrompts: {
        prompts: [
          "What would you do if you knew you couldn't fail?",
          "What story are you telling yourself that's keeping you small?",
          "What would your most confident self do in this situation?",
        ],
      },
      bookingCTA: {
        heading: "Take the First Step",
        description:
          "Your transformation begins with a single conversation. Let's explore what's possible for you.",
        buttonText: "Book Your Free 30-min Clarity Call",
        buttonUrl: "https://calendly.com/tashaniyi/30min?month=2025-07",
        backgroundImage: "/assets/compare_sessions_bg.jpg",
      },
      introduction: {
        title: "Meet Your Guide",
        content:
          "At THE High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership. As a Psychiatric and Mental Health Nurse Practitioner, I combine clinical expertise with transformational coaching to guide you through deep mindset shifts and feminine empowerment.",
        buttonText: "Learn More About Me",
        buttonLink: "/about",
        image: "/assets/guide_portrait.jpg",
      },
      services: {
        title: "Core Services",
        subtitle:
          "Transform your life through evidence-based approaches and holistic healing.",
        service1: {
          title: "Mindset Transformation",
          description:
            "Break through limiting beliefs and reprogram your thoughts for success and fulfillment.",
          icon: "🧠",
        },
        service2: {
          title: "Integrated Psychotherapy",
          description:
            "Professional therapeutic support combining traditional methods with holistic healing approaches.",
          icon: "💫",
        },
        service3: {
          title: "Life Reinvention",
          description:
            "Redesign your life from the ground up, aligning your reality with your deepest values and desires.",
          icon: "🌱",
        },
      },
      clarityJournal: {
        title: "Clarity Journal",
        subtitle: "Your Free Guide to Inner Transformation",
        description:
          "Explore your inner world with this free guided journal to ignite clarity and confidence. Discover powerful questions and exercises designed to help you reconnect with your authentic self.",
        downloadText: "Download Your Free Journal",
        pdfUrl: "/assets/Clarity_Journal.pdf",
        image: "/assets/clarity_journal_preview.jpg",
      },
      testimonials: {
        title: "Client Transformations",
        subtitle: "Real stories of profound change and empowerment.",
        testimonials: [
          {
            name: "Jessica Chen",
            text: "Working with her completely transformed my relationship with myself. I now lead with confidence and clarity I never knew I had.",
            role: "Executive Director",
            image: "/assets/testimonial1.jpg",
            rating: 5,
          },
          {
            name: "Maria Rodriguez",
            text: "The combination of clinical expertise and intuitive coaching helped me heal patterns I'd carried for decades. Life-changing.",
            role: "Business Owner",
            image: "/assets/testimonial2.jpg",
            rating: 5,
          },
          {
            name: "Sarah Thompson",
            text: "She helped me step into the leader I was meant to be. The mindset work was profound and the results speak for themselves.",
            role: "Creative Director",
            image: "/assets/testimonial3.jpg",
            rating: 5,
          },
        ],
      },
      clarityQuestions: {
        title: "Clarity Questions",
        subtitle:
          "Take a moment to reflect on where you are and where you want to be.",
        introduction:
          "These questions are designed to help you gain clarity about your current situation and desires. Take your time with each one, or book a session to explore them together.",
        questions: [
          "What are your biggest challenges right now?",
          "How do you want to feel each morning?",
          "What's holding you back from living the life you want?",
          "What will happen if nothing changes?",
          "What's one small shift you can begin with?",
        ],
        ctaText: "Ready to dive deeper? Book your clarity session.",
        buttonText: "Book Your Session",
      },
      cta: {
        title: "Take the First Step",
        description:
          "Your transformation begins with a single conversation. Let's explore what's possible when you own your power and shape your story.",
        buttonText: "Book Your Clarity Session",
        backgroundImage: "/assets/compare_sessions_bg.jpg",
      },
    },
    about: {
      introduction: {
        content:
          "At The High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership. Through holistic mindset transformation, strategic reinvention, and refined lifestyle curation, I guide women in becoming the most authentic, self-led version of themselves—inside and out. This is about more than surface-level success; it's about embodying self assurance, high standards, and undeniable feminine presence. Becoming her—the woman who leads her life with intention, grace, and power.",
      },
      calling: {
        title: "It Was Never Just a Career. It Was a Calling.",
        content:
          "My journey began in the clinical world, working as a Psychiatric and Mental Health Nurse Practitioner. But somewhere between the sterile walls and endless protocols, I realized that true healing required something deeper—something that honored both the science of the mind and the wisdom of the soul. That's when I knew this wasn't just my profession; it was my calling to guide women back to their most powerful, authentic selves.",
        image: "/assets/personal_portrait.jpg",
      },
      clinicianToGuide: {
        title: "Merging Science with Soul",
        content:
          "My approach is unique because it bridges two worlds: the evidence-based rigor of psychiatric care and the transformative power of feminine leadership. I believe in meeting you exactly where you are, with both clinical expertise and intuitive understanding, to create lasting change that honors your whole being.",
        specialties: [
          "Trauma-informed practice",
          "Strategic reinvention",
          "Feminine embodiment",
          "Lifestyle curation",
          "Holistic mindset transformation",
        ],
        image: "/assets/clinician_guide.jpg",
        videoUrl: "/assets/clinician_guide_video.mp4",
      },
      values: {
        title: "What I Stand For",
        subtitle: "The principles that guide my work and life",
        values: [
          {
            title: "Radical Honesty",
            description: "Truth without judgment, clarity without compromise",
            icon: "💎",
          },
          {
            title: "Sovereignty",
            description: "You are the expert on your own life and dreams",
            icon: "👑",
          },
          {
            title: "Graceful Power",
            description:
              "Strength that flows with feminine wisdom and intuition",
            icon: "🌸",
          },
          {
            title: "Self-Led Growth",
            description:
              "Transformation that comes from within, not imposed from without",
            icon: "🌱",
          },
          {
            title: "Embodied Excellence",
            description: "Living your values in every aspect of your being",
            icon: "✨",
          },
        ],
      },
      womanBehindBrand: {
        title: "A Glimpse Behind the Curtain",
        content:
          "When I'm not guiding women through their transformations, you'll find me curating beautiful moments—whether that's starting my morning with ritual and intention, traveling to places that feed my soul, or simply enjoying the quiet power of authentic femininity. I believe that how we live behind the scenes is just as important as how we show up professionally. For me, authentic femininity isn't about perfection; it's about presence, intentionality, and the courage to be fully yourself.",
        image: "/assets/lifestyle_photo.jpg",
        videoUrl: "/assets/lifestyle_video.mp4",
      },
      credentials: {
        title: "Rooted in Integrity & Expertise",
        subtitle:
          "Professional qualifications that support transformational work",
        rating: 5,
        certificates: [
          {
            name: "Psychiatric Mental Health Nurse Practitioner",
            organization: "Board Certified - ANCC",
            year: "2019",
            image: "/assets/pmhnp_certificate.jpg",
          },
          {
            name: "Certified Professional Coach",
            organization: "International Coach Federation (ICF)",
            year: "2021",
            image: "/assets/icf_certificate.jpg",
          },
          {
            name: "Trauma-Informed Specialist",
            organization: "National Board for Certified Counselors",
            year: "2020",
            image: "/assets/trauma_certificate.jpg",
          },
        ],
      },
      personalNote: {
        title: "If You're Reading This, Know You're Not Alone",
        content:
          "I see you—the woman who has achieved so much but still feels like something is missing. The one who presents beautifully to the world but sometimes feels empty inside. The leader who guides others but struggles to trust her own inner voice. You're not broken, and you don't need fixing. You need remembering. Remembering who you were before the world told you who to be. Your healing journey starts with one brave step toward honoring your truth. I'm here to walk alongside you, not ahead of you, as you reclaim the woman you were always meant to be.",
      },
      cta: {
        title: "Ready to Begin?",
        description:
          "Your transformation starts with a conversation. Let's explore what's possible when you fully step into your power.",
        buttonText: "Book Your Clarity Session",
      },
    },
    services: {
      hero: {
        title: "Your Transformation Journey",
        subtitle: "Three Pathways to Self-Leadership",
        description:
          "Choose the path that honors where you are right now while guiding you toward the woman you're becoming. Each track is designed to meet you exactly where you are in your journey of self-discovery and transformation.",
      },
      tracks: {
        clarityPath: {
          title: "The Clarity Path",
          subtitle:
            "For women who are just beginning their inner journey and feel mentally overwhelmed",
          description:
            "Perfect for women feeling overwhelmed or mentally scattered, ready to gain clarity and direction. This is your starting point to understanding what you really want and need.",
          icon: "🧭",
          features: [
            "A Clarity Session",
            "Light journaling and reflection exercises",
            "A simple direction-setting plan",
            "Resource recommendations for next steps",
          ],
          duration: "Single session",
          focus: "Mental clarity and direction",
          whoFor: "Women feeling overwhelmed",
          price: "$297",
          buttonText: "Book Your Clarity Session",
          image: "/assets/clarity_path.jpg",
          active: true,
          highlightNote:
            "Perfect first step if you're new to transformation work.",
        },
        reinventionExperience: {
          title: "The Reinvention Experience",
          subtitle:
            "For those ready to break old patterns and reshape their self-identity",
          description:
            "Ready to break free from limiting patterns and create meaningful change? This intensive experience combines clinical expertise with strategic support to help you reinvent your relationship with yourself.",
          icon: "🦋",
          features: [
            "4–6 private coaching sessions",
            "Mindset work + strategic reinvention tools",
            "Printable worksheets and weekly homework",
            "Email support between sessions",
            "Integration practices",
          ],
          duration: "2-3 months",
          focus: "Pattern breaking and identity shift",
          whoFor: "Women ready for change",
          price: "$1,497",
          buttonText: "Start Your Reinvention",
          image: "/assets/reinvention_experience.jpg",
          popular: true,
          active: true,
          highlightNote: "Most popular choice for women ready for real change.",
        },
        highAgencyMethod: {
          title: "The High Agency Method",
          subtitle:
            "A deep mentorship container for self-led women ready to embody elegance, standards, and intentional leadership",
          description:
            "A deep mentorship container for self-led women ready to embody elegance, standards, and intentional leadership. This comprehensive program integrates mindset, lifestyle, and feminine power for profound transformation.",
          icon: "👑",
          features: [
            "Long-term mentorship (3+ months)",
            "Integration of mindset, lifestyle, and feminine power",
            "Access to exclusive coaching and community",
            "Lifestyle curation support",
            "Leadership development",
            "Ongoing strategic guidance",
          ],
          duration: "3-6 months",
          focus: "Leadership and lifestyle mastery",
          whoFor: "Leaders seeking transformation",
          price: "Starting at $3,997",
          buttonText: "Apply for High Agency",
          image: "/assets/high_agency_method.jpg",
          active: true,
          highlightNote: "Application required. Limited spots available.",
        },
      },
      comparison: {
        title: "Which Track is Right for You?",
        subtitle:
          "Understanding the differences between each transformational pathway.",
        tableHeaders: ["Track", "Duration", "Outcomes", "Who It's For"],
        showComparison: true,
      },
      cta: {
        title: "Ready to Begin Your Transformation?",
        description:
          "Not sure which track is right for you? Let's have a conversation to explore what would serve you best right now.",
        buttonText: "Schedule a Discovery Call",
        secondaryButtonText: "Download Service Guide",
      },
    },
    transform: {
      threshold: {
        title: "The Threshold – Where It Begins",
        overlayText:
          "Every transformation begins with an inner whisper. The moment you know things must change��even if you don't yet know how.",
        buttonText: "Begin the Journey",
        videoUrl: "/assets/threshold_hero_video.mp4",
        fallbackImage: "/assets/threshold_hero_bg.jpg",
      },
      innerStruggle: {
        title: "The Inner Struggle",
        subtitle: "Questions that awaken your truth",
        questions: [
          "What's holding you back from the life you desire?",
          "How do you want to feel when you wake up?",
          "What would change if nothing changes?",
          "What's one small step you can take today?",
        ],
      },
      awakeningPower: {
        title: "Awakening Her Power",
        subtitle: "The tools and frameworks for transformation",
        tools: [
          {
            name: "Cognitive Reframing",
            description: "Transform limiting thoughts into empowering beliefs",
            icon: "🧠",
          },
          {
            name: "Mindfulness Practices",
            description: "Cultivate present-moment awareness and inner peace",
            icon: "🧘‍♀️",
          },
          {
            name: "Lifestyle Redesign",
            description: "Create routines that support your highest self",
            icon: "✨",
          },
          {
            name: "Trauma-informed Reflection",
            description: "Heal with compassion and clinical understanding",
            icon: "💚",
          },
        ],
      },
      transformationTimeline: {
        title: "The Shift – Transformation Timeline",
        subtitle: "Five phases of profound change",
        phases: [
          {
            name: "Awareness",
            description:
              "Recognizing patterns and acknowledging the need for change. This is where you first see clearly what's been holding you back.",
          },
          {
            name: "Confrontation",
            description:
              "Facing uncomfortable truths and limiting beliefs. The courageous work of looking honestly at what needs to shift.",
          },
          {
            name: "Realignment",
            description:
              "Adjusting your thoughts, behaviors, and choices to align with your authentic self and desired outcomes.",
          },
          {
            name: "Embodiment",
            description:
              "Living from your transformed perspective. New patterns become natural, and change feels integrated.",
          },
          {
            name: "Self-leadership",
            description:
              "Operating from your own inner authority. You trust yourself, make aligned decisions, and inspire others.",
          },
        ],
      },
      testimonials: {
        title: "Real Women, Real Change",
        subtitle:
          "Stories of transformation from women who've walked this path",
        stories: [
          {
            name: "Sarah Williams",
            role: "Executive Leader",
            text: "The transformation work helped me step into my power as a leader while honoring my feminine intuition. Life-changing.",
            image: "/assets/transform_testimonial_1.jpg",
            rating: 5,
          },
          {
            name: "Maria Chen",
            role: "Creative Entrepreneur",
            text: "I found my authentic voice and learned to trust my inner wisdom. The mindset shifts were profound and lasting.",
            image: "/assets/transform_testimonial_2.jpg",
            rating: 5,
          },
          {
            name: "Jennifer Adams",
            role: "Mother & Leader",
            text: "This journey taught me that transformation isn't selfish—it's essential. I'm now the woman I always knew I could be.",
            image: "/assets/transform_testimonial_3.jpg",
            rating: 5,
          },
        ],
      },
      finalPrompt: {
        title: "Transformation isn't a luxury. It's your birthright.",
        description:
          "You were born to live fully, love deeply, and lead authentically. The only question is: are you ready to begin?",
        buttonText: "Book Your First Session",
        calendlyUrl: "https://calendly.com/tashaniyi/30min",
      },
    },
    contact: {
      welcome: {
        heading: "You're not alone.",
        text: "If you're feeling called to shift, expand, or simply be heard—this space is for you. Let's connect in a way that feels aligned and supportive for you.",
      },
      form: {
        title: "What's on your mind?",
        nameLabel: "Name",
        namePlaceholder: "Enter your name",
        emailLabel: "Email",
        emailPlaceholder: "your.email@example.com",
        messageLabel: "Your Message",
        messagePlaceholder: "Share what's on your heart...",
        buttonText: "Send Message",
        responseNote:
          "I personally review all messages and will respond within 48 hours.",
      },
      booking: {
        title: "Prefer to speak directly?",
        description: "Book a 30-minute clarity session.",
        calendlyUrl: "https://calendly.com/tashaniyi/30min?month=2025-07",
        newTabButtonText: "Open in new tab",
      },
      notReady: {
        title: "Not ready to talk yet?",
        text: "That's perfectly okay. Sometimes we just need a moment to breathe and reflect.",
        downloadText:
          "Download this free self-reflection journal to begin privately.",
        buttonText: "Download Free Journal",
        pdfUrl: "/assets/Clarity_Journal.pdf",
      },
      social: {
        title: "Other ways to connect",
        email: {
          title: "Email",
          value: "hello@awakenherpower.com",
          url: "mailto:hello@awakenherpower.com",
        },
        linkedin: {
          title: "LinkedIn",
          url: "https://linkedin.com/in/awakenherpower",
        },
        instagram: {
          title: "Instagram",
          url: "https://instagram.com/awakenherpower",
        },
      },
    },
  };

  return defaults[slug] || defaults.home;
};
