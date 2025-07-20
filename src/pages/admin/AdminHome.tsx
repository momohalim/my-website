import { useState, useEffect } from "react";
import { useContent, useUpdateContent } from "../../hooks/useContent";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ImageUpload } from "../../components/admin/ImageUpload";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Separator } from "../../components/ui/separator";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

export function AdminHome() {
  const { content, loading } = useContent("home");
  const { updateContent, saving } = useUpdateContent();
  const [formData, setFormData] = useState<any>({});
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleSave = async () => {
    try {
      await updateContent("home", formData);
      setSaveMessage("Home page updated successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error updating home page. Please try again.");
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const updateFormField = (path: string, value: any) => {
    setFormData((prev: any) => {
      const keys = path.split(".");
      const result = { ...prev };
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return result;
    });
  };

  const updateTransformation = (index: number, field: string, value: any) => {
    const transformations = formData.transformations?.stories || [];
    if (!transformations[index]) transformations[index] = {};
    transformations[index][field] = value;
    updateFormField("transformations.stories", transformations);
  };

  const addTransformation = () => {
    const transformations = formData.transformations?.stories || [];
    transformations.push({
      name: "",
      image: "",
      quote: "",
      title: "",
      rating: 5,
    });
    updateFormField("transformations.stories", transformations);
  };

  const removeTransformation = (index: number) => {
    const transformations = formData.transformations?.stories || [];
    transformations.splice(index, 1);
    updateFormField("transformations.stories", transformations);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Home Page</h1>
            <p className="text-muted-foreground">
              Manage your redesigned homepage content - "High Agency Collective"
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {saveMessage && (
          <Alert>
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        {/* 1️⃣ Hero Banner Section */}
        <Card>
          <CardHeader>
            <CardTitle>1️⃣ Hero Banner</CardTitle>
            <CardDescription>
              Full-screen hero with tagline "Own your Power. Shape your Story."
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Main Tagline</label>
              <Input
                value={
                  formData.hero?.headline || "Own your Power. Shape your Story."
                }
                onChange={(e) =>
                  updateFormField("hero.headline", e.target.value)
                }
                placeholder="Own your Power. Shape your Story."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subheading</label>
              <Textarea
                value={formData.hero?.subheading || ""}
                onChange={(e) =>
                  updateFormField("hero.subheading", e.target.value)
                }
                placeholder="Transform your mental health journey with personalized psychiatric care designed for women ready to step into their power."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">CTA Button Text</label>
              <Input
                value={formData.hero?.ctaText || "Start Your Journey"}
                onChange={(e) =>
                  updateFormField("hero.ctaText", e.target.value)
                }
                placeholder="Start Your Journey"
              />
            </div>
            <ImageUpload
              label="Hero Background Image"
              currentImage={formData.hero?.backgroundImage || ""}
              onImageUpdate={(url) =>
                updateFormField("hero.backgroundImage", url)
              }
            />
          </CardContent>
        </Card>

        {/* 2️⃣ Welcome & Vision Section */}
        <Card>
          <CardHeader>
            <CardTitle>2️⃣ Welcome & Vision Section</CardTitle>
            <CardDescription>
              Brand intro with 3 vision points (icons + headlines)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">
                Welcome Introduction
              </label>
              <Textarea
                value={formData.welcomeIntro || ""}
                onChange={(e) =>
                  updateFormField("welcomeIntro", e.target.value)
                }
                placeholder="At THE High Agency Collective, I help ambitious women stop playing small and step fully into elegant self-leadership..."
                rows={4}
              />
            </div>
            <Separator />
            <h4 className="font-semibold">Vision Points (3 items)</h4>
            <p className="text-sm text-muted-foreground">
              Note: Icons are hardcoded (Brain, Crown, Sparkles) - only titles
              and descriptions are editable
            </p>

            {[1, 2, 3].map((num) => (
              <div key={num} className="border rounded-lg p-4 space-y-4">
                <h5 className="font-medium">Vision Point {num}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.visionPoints?.[num - 1]?.title || ""}
                      onChange={(e) => {
                        const points = formData.visionPoints || [];
                        points[num - 1] = {
                          ...points[num - 1],
                          title: e.target.value,
                        };
                        updateFormField("visionPoints", points);
                      }}
                      placeholder={
                        num === 1
                          ? "Heal subconscious patterns"
                          : num === 2
                            ? "Lead with elegant self-assurance"
                            : "Embody intentional feminine power"
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={
                        formData.visionPoints?.[num - 1]?.description || ""
                      }
                      onChange={(e) => {
                        const points = formData.visionPoints || [];
                        points[num - 1] = {
                          ...points[num - 1],
                          description: e.target.value,
                        };
                        updateFormField("visionPoints", points);
                      }}
                      placeholder="Short description of this vision point"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 3️⃣ Client Transformations Carousel */}
        <Card>
          <CardHeader>
            <CardTitle>3️⃣ Client Transformations Carousel</CardTitle>
            <CardDescription>
              6 auto-scrolling cards with client photos, quotes, names & titles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Client Transformation Cards</h4>
              <Button onClick={addTransformation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </div>

            {(formData.transformations?.stories || []).map(
              (story: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Client {index + 1}</h5>
                    <Button
                      onClick={() => removeTransformation(index)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Client Name</label>
                      <Input
                        value={story.name || ""}
                        onChange={(e) =>
                          updateTransformation(index, "name", e.target.value)
                        }
                        placeholder="Sarah M."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title/Role</label>
                      <Input
                        value={story.title || ""}
                        onChange={(e) =>
                          updateTransformation(index, "title", e.target.value)
                        }
                        placeholder="Executive Director"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      One-line Quote
                    </label>
                    <Input
                      value={story.quote || ""}
                      onChange={(e) =>
                        updateTransformation(index, "quote", e.target.value)
                      }
                      placeholder="I finally feel like myself again"
                    />
                  </div>
                  <ImageUpload
                    label="Client Photo"
                    currentImage={story.image || ""}
                    onImageUpdate={(url) =>
                      updateTransformation(index, "image", url)
                    }
                  />
                </div>
              ),
            )}
          </CardContent>
        </Card>

        {/* 4️⃣ Elegant Self-Leadership Framework */}
        <Card>
          <CardHeader>
            <CardTitle>4️⃣ Elegant Self-Leadership Framework</CardTitle>
            <CardDescription>
              3 Pillars: Mindset Reset, Strategic Reinvention, Lifestyle
              Curation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={
                  formData.pillarsTitle ||
                  "The 3 Pillars of Elegant Self‑Leadership"
                }
                onChange={(e) =>
                  updateFormField("pillarsTitle", e.target.value)
                }
                placeholder="The 3 Pillars of Elegant Self‑Leadership"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Description</label>
              <Textarea
                value={formData.pillarsDescription || ""}
                onChange={(e) =>
                  updateFormField("pillarsDescription", e.target.value)
                }
                placeholder="A comprehensive framework for transforming your relationship with yourself..."
                rows={2}
              />
            </div>
            <Separator />
            <h4 className="font-semibold">The 3 Pillars</h4>
            <p className="text-sm text-muted-foreground">
              Note: Icons are hardcoded (Brain, Crown, Sparkles) - only titles
              and descriptions are editable
            </p>

            {[
              {
                key: "mindsetReset",
                defaultTitle: "Mindset Reset",
                defaultDesc:
                  "Reprogram limiting beliefs and transform your inner narrative for lasting change and empowerment.",
              },
              {
                key: "strategicReinvention",
                defaultTitle: "Strategic Reinvention",
                defaultDesc:
                  "Redesign your life with intention, aligning your choices with your authentic desires and values.",
              },
              {
                key: "lifestyleCuration",
                defaultTitle: "Lifestyle Curation",
                defaultDesc:
                  "Create daily rituals and practices that support your highest self and elegant way of being.",
              },
            ].map((pillar, index) => (
              <div key={pillar.key} className="border rounded-lg p-4 space-y-4">
                <h5 className="font-medium">
                  Pillar {index + 1}: {pillar.defaultTitle}
                </h5>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={
                        formData.pillars?.[pillar.key]?.title ||
                        pillar.defaultTitle
                      }
                      onChange={(e) =>
                        updateFormField(
                          `pillars.${pillar.key}.title`,
                          e.target.value,
                        )
                      }
                      placeholder={pillar.defaultTitle}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={formData.pillars?.[pillar.key]?.description || ""}
                      onChange={(e) =>
                        updateFormField(
                          `pillars.${pillar.key}.description`,
                          e.target.value,
                        )
                      }
                      placeholder={pillar.defaultDesc}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 5️⃣ Micro-Shift & PDF Download */}
        <Card>
          <CardHeader>
            <CardTitle>5️⃣ Micro-Shift & Free PDF Download</CardTitle>
            <CardDescription>
              3 small coaching techniques + free journal download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.microShift?.title || "Begin With a Micro Shift"}
                onChange={(e) =>
                  updateFormField("microShift.title", e.target.value)
                }
                placeholder="Begin With a Micro Shift"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Description</label>
              <Textarea
                value={formData.microShift?.description || ""}
                onChange={(e) =>
                  updateFormField("microShift.description", e.target.value)
                }
                placeholder="Transformation doesn't require dramatic gestures. Sometimes the most profound changes begin with the smallest, most intentional steps..."
                rows={3}
              />
            </div>
            <Separator />
            <h4 className="font-semibold">3 Micro-Shift Techniques</h4>
            {[1, 2, 3].map((num) => (
              <div key={num}>
                <label className="text-sm font-medium">Technique {num}</label>
                <Input
                  value={formData.microShift?.techniques?.[num - 1] || ""}
                  onChange={(e) => {
                    const techniques = formData.microShift?.techniques || [];
                    techniques[num - 1] = e.target.value;
                    updateFormField("microShift.techniques", techniques);
                  }}
                  placeholder={`Micro-shift technique ${num}`}
                />
              </div>
            ))}
            <Separator />
            <h4 className="font-semibold">Free PDF Download</h4>
            <div>
              <label className="text-sm font-medium">PDF Title</label>
              <Input
                value={formData.microShift?.pdfTitle || "Free Clarity Journal"}
                onChange={(e) =>
                  updateFormField("microShift.pdfTitle", e.target.value)
                }
                placeholder="Free Clarity Journal"
              />
            </div>
            <div>
              <label className="text-sm font-medium">PDF Description</label>
              <Textarea
                value={formData.microShift?.pdfDescription || ""}
                onChange={(e) =>
                  updateFormField("microShift.pdfDescription", e.target.value)
                }
                placeholder="Download your free guided journal to begin your transformation journey..."
                rows={2}
              />
            </div>
            <ImageUpload
              label="PDF File Upload"
              currentImage={formData.microShift?.pdfUrl || ""}
              onImageUpdate={(url) => updateFormField("microShift.pdfUrl", url)}
              acceptedTypes=".pdf"
            />
          </CardContent>
        </Card>

        {/* 6️⃣ About the Practitioner */}
        <Card>
          <CardHeader>
            <CardTitle>6️⃣ About the Practitioner</CardTitle>
            <CardDescription>
              Bio section with credential reference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.practitioner?.title || "Meet Your Practitioner"}
                onChange={(e) =>
                  updateFormField("practitioner.title", e.target.value)
                }
                placeholder="Meet Your Practitioner"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Bio Content (Rich Text)
              </label>
              <Textarea
                value={formData.practitioner?.bio || ""}
                onChange={(e) =>
                  updateFormField("practitioner.bio", e.target.value)
                }
                placeholder="As a Psychiatric and Mental Health Nurse Practitioner, I combine clinical expertise with transformational coaching..."
                rows={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Professional Credentials
              </label>
              <Input
                value={
                  formData.practitioner?.credentials ||
                  "Board-Certified Psychiatric & Mental Health Nurse Practitioner"
                }
                onChange={(e) =>
                  updateFormField("practitioner.credentials", e.target.value)
                }
                placeholder="Board-Certified Psychiatric & Mental Health Nurse Practitioner"
              />
            </div>
            <ImageUpload
              label="Practitioner Portrait"
              currentImage={formData.practitioner?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("practitioner.image", url)
              }
            />
          </CardContent>
        </Card>

        {/* 7️⃣ Testimonials & Impact */}
        <Card>
          <CardHeader>
            <CardTitle>7️⃣ Testimonials & Impact Section</CardTitle>
            <CardDescription>
              Impact stats + 3 testimonials with headshots
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={
                  formData.impactSection?.title ||
                  "Proven Impact & Client Stories"
                }
                onChange={(e) =>
                  updateFormField("impactSection.title", e.target.value)
                }
                placeholder="Proven Impact & Client Stories"
              />
            </div>
            <Separator />
            <h4 className="font-semibold">Impact Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Stat 1 Number</label>
                <Input
                  value={formData.impactStats?.stat1?.number || "1,000+"}
                  onChange={(e) =>
                    updateFormField("impactStats.stat1.number", e.target.value)
                  }
                  placeholder="1,000+"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Stat 1 Label</label>
                <Input
                  value={
                    formData.impactStats?.stat1?.label ||
                    "Transformation Sessions"
                  }
                  onChange={(e) =>
                    updateFormField("impactStats.stat1.label", e.target.value)
                  }
                  placeholder="Transformation Sessions"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Stat 2 Number</label>
                <Input
                  value={formData.impactStats?.stat2?.number || "95%"}
                  onChange={(e) =>
                    updateFormField("impactStats.stat2.number", e.target.value)
                  }
                  placeholder="95%"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Stat 2 Label</label>
                <Input
                  value={
                    formData.impactStats?.stat2?.label || "Client Success Rate"
                  }
                  onChange={(e) =>
                    updateFormField("impactStats.stat2.label", e.target.value)
                  }
                  placeholder="Client Success Rate"
                />
              </div>
            </div>
            <Separator />
            <h4 className="font-semibold">Testimonials (3 short quotes)</h4>
            {[1, 2, 3].map((num) => (
              <div key={num} className="border rounded-lg p-4 space-y-4">
                <h5 className="font-medium">Testimonial {num}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Client Name</label>
                    <Input
                      value={formData.impactTestimonials?.[num - 1]?.name || ""}
                      onChange={(e) => {
                        const testimonials = formData.impactTestimonials || [];
                        testimonials[num - 1] = {
                          ...testimonials[num - 1],
                          name: e.target.value,
                        };
                        updateFormField("impactTestimonials", testimonials);
                      }}
                      placeholder="Jessica Chen"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={
                        formData.impactTestimonials?.[num - 1]?.title || ""
                      }
                      onChange={(e) => {
                        const testimonials = formData.impactTestimonials || [];
                        testimonials[num - 1] = {
                          ...testimonials[num - 1],
                          title: e.target.value,
                        };
                        updateFormField("impactTestimonials", testimonials);
                      }}
                      placeholder="Executive Director"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Quote</label>
                  <Textarea
                    value={formData.impactTestimonials?.[num - 1]?.quote || ""}
                    onChange={(e) => {
                      const testimonials = formData.impactTestimonials || [];
                      testimonials[num - 1] = {
                        ...testimonials[num - 1],
                        quote: e.target.value,
                      };
                      updateFormField("impactTestimonials", testimonials);
                    }}
                    placeholder="Working with her completely transformed my relationship with myself..."
                    rows={2}
                  />
                </div>
                <ImageUpload
                  label="Client Headshot"
                  currentImage={
                    formData.impactTestimonials?.[num - 1]?.image || ""
                  }
                  onImageUpdate={(url) => {
                    const testimonials = formData.impactTestimonials || [];
                    testimonials[num - 1] = {
                      ...testimonials[num - 1],
                      image: url,
                    };
                    updateFormField("impactTestimonials", testimonials);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 8️⃣ CTA Banner */}
        <Card>
          <CardHeader>
            <CardTitle>8️⃣ CTA Banner for Clarity Session</CardTitle>
            <CardDescription>
              Final call-to-action with Calendly link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">CTA Title</label>
              <Input
                value={formData.finalCTA?.title || "Take the First Step"}
                onChange={(e) =>
                  updateFormField("finalCTA.title", e.target.value)
                }
                placeholder="Take the First Step"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CTA Description</label>
              <Textarea
                value={formData.finalCTA?.description || ""}
                onChange={(e) =>
                  updateFormField("finalCTA.description", e.target.value)
                }
                placeholder="Your transformation begins with a single conversation. Let's explore what's possible when you own your power and shape your story."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={
                  formData.finalCTA?.buttonText || "Book Your Clarity Session"
                }
                onChange={(e) =>
                  updateFormField("finalCTA.buttonText", e.target.value)
                }
                placeholder="Book Your Clarity Session"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Calendly Link</label>
              <Input
                value={
                  formData.finalCTA?.calendlyUrl ||
                  "https://calendly.com/tashaniyi/30min"
                }
                onChange={(e) =>
                  updateFormField("finalCTA.calendlyUrl", e.target.value)
                }
                placeholder="https://calendly.com/tashaniyi/30min"
              />
            </div>
            <ImageUpload
              label="Background Image"
              currentImage={formData.finalCTA?.backgroundImage || ""}
              onImageUpdate={(url) =>
                updateFormField("finalCTA.backgroundImage", url)
              }
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? "Saving Changes..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
