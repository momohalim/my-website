import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { supabase } from "@/lib/supabase";
import {
  Video,
  Quote,
  Users,
  Lightbulb,
  MessageSquare,
  Calendar,
  Star,
  Plus,
  Trash2,
} from "lucide-react";

interface HomeContent {
  hero: {
    headline: string;
    subheading: string;
    ctaText: string;
    videoUrl: string;
    backgroundImage: string;
  };
  introStatement: string;
  experiences: Array<{
    title: string;
    description: string;
  }>;
  transformations: {
    stories: Array<{
      name: string;
      image: string;
      quote: string;
      rating: number;
    }>;
  };
  tools: Array<{
    name: string;
    icon: string;
  }>;
  clarityPrompts: {
    prompts: string[];
  };
  bookingCTA: {
    heading: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    backgroundImage: string;
  };
}

const defaultContent: HomeContent = {
  hero: {
    headline: "Own your Power. Shape your Story.",
    subheading:
      "Transform your mental health journey with personalized psychiatric care designed for women ready to step into their power.",
    ctaText: "Begin Your Transformation",
    videoUrl: "",
    backgroundImage: "",
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
        image: "",
        quote: "I finally feel like myself again",
        rating: 5,
      },
      {
        name: "Jennifer K.",
        image: "",
        quote: "The transformation has been incredible",
        rating: 5,
      },
      {
        name: "Maria L.",
        image: "",
        quote: "I'm living my authentic truth now",
        rating: 5,
      },
      {
        name: "Amanda R.",
        image: "",
        quote: "Best decision I ever made",
        rating: 5,
      },
      {
        name: "Lisa T.",
        image: "",
        quote: "I found my inner strength",
        rating: 5,
      },
      {
        name: "Rachel D.",
        image: "",
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
    backgroundImage: "",
  },
};

export const AdminHomeNew = () => {
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("slug", "home")
        .single();

      if (data && !error) {
        setContent({ ...defaultContent, ...data.content });
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("page_content").upsert({
        slug: "home",
        content: content,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Home page content has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHero = (field: keyof HomeContent["hero"], value: string) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateExperience = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const updateTransformation = (
    index: number,
    field: keyof HomeContent["transformations"]["stories"][0],
    value: string | number,
  ) => {
    setContent((prev) => ({
      ...prev,
      transformations: {
        ...prev.transformations,
        stories: prev.transformations.stories.map((story, i) =>
          i === index ? { ...story, [field]: value } : story,
        ),
      },
    }));
  };

  const addTransformation = () => {
    setContent((prev) => ({
      ...prev,
      transformations: {
        ...prev.transformations,
        stories: [
          ...prev.transformations.stories,
          { name: "", image: "", quote: "", rating: 5 },
        ],
      },
    }));
  };

  const removeTransformation = (index: number) => {
    setContent((prev) => ({
      ...prev,
      transformations: {
        ...prev.transformations,
        stories: prev.transformations.stories.filter((_, i) => i !== index),
      },
    }));
  };

  const updatePrompt = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      clarityPrompts: {
        ...prev.clarityPrompts,
        prompts: prev.clarityPrompts.prompts.map((prompt, i) =>
          i === index ? value : prompt,
        ),
      },
    }));
  };

  const updateBookingCTA = (
    field: keyof HomeContent["bookingCTA"],
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      bookingCTA: { ...prev.bookingCTA, [field]: value },
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Home Page Management
            </h1>
            <p className="text-muted-foreground">
              Manage all sections of the new home page layout.
            </p>
          </div>
          <Button onClick={saveContent} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="intro">Intro</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="transformations">Stories</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Hero Section
                </CardTitle>
                <CardDescription>
                  Configure the main hero section with video background and
                  messaging.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      value={content.hero.headline}
                      onChange={(e) => updateHero("headline", e.target.value)}
                      placeholder="Own your Power. Shape your Story."
                    />
                  </div>

                  <div>
                    <Label htmlFor="subheading">Subheading</Label>
                    <Textarea
                      id="subheading"
                      value={content.hero.subheading}
                      onChange={(e) => updateHero("subheading", e.target.value)}
                      placeholder="Transform your mental health journey..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cta-text">CTA Button Text</Label>
                    <Input
                      id="cta-text"
                      value={content.hero.ctaText}
                      onChange={(e) => updateHero("ctaText", e.target.value)}
                      placeholder="Begin Your Transformation"
                    />
                  </div>

                  <div>
                    <Label>Hero Video (MP4)</Label>
                    <ImageUpload
                      acceptedTypes="video/*"
                      onImageUpdate={(url) => updateHero("videoUrl", url)}
                    />
                    {content.hero.videoUrl && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Current: {content.hero.videoUrl}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Fallback Background Image</Label>
                    <ImageUpload
                      acceptedTypes="image/*"
                      onImageUpdate={(url) =>
                        updateHero("backgroundImage", url)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Intro Statement */}
          <TabsContent value="intro">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="w-5 h-5" />
                  Intro Statement
                </CardTitle>
                <CardDescription>
                  The inspirational quote displayed in the cream-to-rose
                  gradient section.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={content.introStatement}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      introStatement: e.target.value,
                    }))
                  }
                  placeholder="You deserve to live a life that feels as beautiful..."
                  rows={4}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiences */}
          <TabsContent value="experiences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  What You'll Experience
                </CardTitle>
                <CardDescription>
                  Configure the three experience cards.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.experiences.map((experience, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={experience.title}
                          onChange={(e) =>
                            updateExperience(index, "title", e.target.value)
                          }
                          placeholder="Mindset Reset"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={experience.description}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Transform limiting beliefs..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Client Transformations */}
          <TabsContent value="transformations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Client Transformations
                </CardTitle>
                <CardDescription>
                  Manage the horizontal scrolling client stories (6 cards
                  recommended).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.transformations.stories.map((story, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Story {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeTransformation(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={story.name}
                          onChange={(e) =>
                            updateTransformation(index, "name", e.target.value)
                          }
                          placeholder="Sarah M."
                        />
                      </div>
                      <div>
                        <Label>Quote</Label>
                        <Input
                          value={story.quote}
                          onChange={(e) =>
                            updateTransformation(index, "quote", e.target.value)
                          }
                          placeholder="I finally feel like myself again"
                        />
                      </div>
                      <div>
                        <Label>Rating</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={story.rating}
                          onChange={(e) =>
                            updateTransformation(
                              index,
                              "rating",
                              parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Client Image</Label>
                      <ImageUpload
                        acceptedTypes="image/*"
                        onImageUpdate={(url) =>
                          updateTransformation(index, "image", url)
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={addTransformation} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Story
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clarity Prompts */}
          <TabsContent value="prompts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Clarity Prompts
                </CardTitle>
                <CardDescription>
                  Configure the three interactive prompt cards that flip on
                  hover.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.clarityPrompts.prompts.map((prompt, index) => (
                  <div key={index}>
                    <Label>Prompt {index + 1}</Label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => updatePrompt(index, e.target.value)}
                      placeholder="What would you do if you knew you couldn't fail?"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking CTA */}
          <TabsContent value="booking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking CTA Section
                </CardTitle>
                <CardDescription>
                  Configure the final call-to-action section with background
                  image.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Heading</Label>
                    <Input
                      value={content.bookingCTA.heading}
                      onChange={(e) =>
                        updateBookingCTA("heading", e.target.value)
                      }
                      placeholder="Take the First Step"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={content.bookingCTA.description}
                      onChange={(e) =>
                        updateBookingCTA("description", e.target.value)
                      }
                      placeholder="Your transformation begins with a single conversation..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={content.bookingCTA.buttonText}
                      onChange={(e) =>
                        updateBookingCTA("buttonText", e.target.value)
                      }
                      placeholder="Book Your Free 30-min Clarity Call"
                    />
                  </div>

                  <div>
                    <Label>Button URL (Calendly Link)</Label>
                    <Input
                      value={content.bookingCTA.buttonUrl}
                      onChange={(e) =>
                        updateBookingCTA("buttonUrl", e.target.value)
                      }
                      placeholder="https://calendly.com/tashaniyi/30min?month=2025-07"
                    />
                  </div>

                  <div>
                    <Label>Background Image</Label>
                    <ImageUpload
                      acceptedTypes="image/*"
                      onImageUpdate={(url) =>
                        updateBookingCTA("backgroundImage", url)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
