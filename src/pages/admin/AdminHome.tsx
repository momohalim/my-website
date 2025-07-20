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
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  FileText,
  Music,
  Video,
} from "lucide-react";

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
      role: "",
      rating: 5,
    });
    updateFormField("transformations.stories", transformations);
  };

  const removeTransformation = (index: number) => {
    const transformations = formData.transformations?.stories || [];
    transformations.splice(index, 1);
    updateFormField("transformations.stories", transformations);
  };

  const updateWellnessResource = (index: number, field: string, value: any) => {
    const resources = formData.wellnessResources || [];
    if (!resources[index]) resources[index] = {};
    resources[index][field] = value;
    updateFormField("wellnessResources", resources);
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
            <h1 className="text-3xl font-bold tracking-tight">
              Home Page - Psychiatric & Mental Health Practice
            </h1>
            <p className="text-muted-foreground">
              Manage your homepage content with tagline "Own your Power. Shape
              your Story."
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

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>
              Short, powerful introductory statement with "Start Your Journey"
              button
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
              <label className="text-sm font-medium">
                Subheading (Minimal Text)
              </label>
              <Textarea
                value={formData.hero?.subheading || ""}
                onChange={(e) =>
                  updateFormField("hero.subheading", e.target.value)
                }
                placeholder="Transform your mental health with compassionate, evidence-based psychiatric care."
                rows={2}
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
              label="Hero Background Video"
              currentImage={formData.hero?.videoUrl || ""}
              onImageUpdate={(url) => updateFormField("hero.videoUrl", url)}
              acceptedTypes="video/*"
            />
            <ImageUpload
              label="Fallback Background Image"
              currentImage={formData.hero?.backgroundImage || ""}
              onImageUpdate={(url) =>
                updateFormField("hero.backgroundImage", url)
              }
            />
          </CardContent>
        </Card>

        {/* The 3 Pillars Section */}
        <Card>
          <CardHeader>
            <CardTitle>The 3 Pillars of Mental Wellness</CardTitle>
            <CardDescription>
              Darker creamy cards with soft shadows, elegant icons, clear
              descriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={
                  formData.pillarsTitle || "The 3 Pillars of Mental Wellness"
                }
                onChange={(e) =>
                  updateFormField("pillarsTitle", e.target.value)
                }
                placeholder="The 3 Pillars of Mental Wellness"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Textarea
                value={formData.pillarsSubtitle || ""}
                onChange={(e) =>
                  updateFormField("pillarsSubtitle", e.target.value)
                }
                placeholder="A comprehensive, evidence-based approach to psychiatric care that honors your whole being"
                rows={2}
              />
            </div>
            <Separator />

            {[
              { key: "mindsetReset", title: "Mindset Reset", icon: "🧠" },
              {
                key: "strategicReinvention",
                title: "Strategic Reinvention",
                icon: "👑",
              },
              {
                key: "lifestyleCuration",
                title: "Lifestyle Curation",
                icon: "✨",
              },
            ].map((pillar, index) => (
              <div key={pillar.key} className="border rounded-lg p-4 space-y-4">
                <h5 className="font-medium flex items-center gap-2">
                  <span className="text-2xl">{pillar.icon}</span>
                  Pillar {index + 1}: {pillar.title}
                </h5>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={
                        formData.pillars?.[pillar.key]?.title || pillar.title
                      }
                      onChange={(e) =>
                        updateFormField(
                          `pillars.${pillar.key}.title`,
                          e.target.value,
                        )
                      }
                      placeholder={pillar.title}
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
                      placeholder="Detailed description of this pillar in mental health treatment"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Client Transformations Section */}
        <Card>
          <CardHeader>
            <CardTitle>Client Transformations</CardTitle>
            <CardDescription>
              6 testimonials with photos, quotes, names, roles, and 5-star
              ratings. Displays in horizontal auto-slider (3 at a time, 8-second
              intervals)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">
                Client Testimonials (Target: 6 total)
              </h4>
              <Button onClick={addTransformation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            {(formData.transformations?.stories || []).map(
              (story: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Testimonial {index + 1}</h5>
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
                      <label className="text-sm font-medium">Role/Title</label>
                      <Input
                        value={story.role || ""}
                        onChange={(e) =>
                          updateTransformation(index, "role", e.target.value)
                        }
                        placeholder="Executive Director"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Testimonial Quote
                    </label>
                    <Textarea
                      value={story.quote || ""}
                      onChange={(e) =>
                        updateTransformation(index, "quote", e.target.value)
                      }
                      placeholder="I finally feel like myself again"
                      rows={2}
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

            {(formData.transformations?.stories || []).length < 6 && (
              <Alert>
                <AlertDescription>
                  For optimal slider display, aim for exactly 6 testimonials
                  (currently: {(formData.transformations?.stories || []).length}
                  )
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* NEW: Wellness Resources Section */}
        <Card>
          <CardHeader>
            <CardTitle>Wellness Resources</CardTitle>
            <CardDescription>
              3 downloadable/embedded tools: Meditation Guide (PDF), Curated
              Spotify Playlist, Breathing Exercise Video
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.wellnessSectionTitle || "Wellness Resources"}
                onChange={(e) =>
                  updateFormField("wellnessSectionTitle", e.target.value)
                }
                placeholder="Wellness Resources"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Textarea
                value={formData.wellnessSectionSubtitle || ""}
                onChange={(e) =>
                  updateFormField("wellnessSectionSubtitle", e.target.value)
                }
                placeholder="Complementary tools and resources to support your mental health journey"
                rows={2}
              />
            </div>
            <Separator />

            {[
              {
                key: 0,
                title: "Meditation Guide",
                type: "PDF",
                icon: <FileText className="w-6 h-6" />,
                action: "Download",
              },
              {
                key: 1,
                title: "Curated Spotify Playlist",
                type: "Playlist",
                icon: <Music className="w-6 h-6" />,
                action: "Listen",
              },
              {
                key: 2,
                title: "Breathing Exercise Video",
                type: "Video",
                icon: <Video className="w-6 h-6" />,
                action: "Watch",
              },
            ].map((resource) => (
              <div
                key={resource.key}
                className="border rounded-lg p-4 space-y-4"
              >
                <h5 className="font-medium flex items-center gap-2">
                  {resource.icon}
                  {resource.title}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={
                        formData.wellnessResources?.[resource.key]?.title ||
                        resource.title
                      }
                      onChange={(e) =>
                        updateWellnessResource(
                          resource.key,
                          "title",
                          e.target.value,
                        )
                      }
                      placeholder={resource.title}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Action Button Text
                    </label>
                    <Input
                      value={
                        formData.wellnessResources?.[resource.key]?.action ||
                        resource.action
                      }
                      onChange={(e) =>
                        updateWellnessResource(
                          resource.key,
                          "action",
                          e.target.value,
                        )
                      }
                      placeholder={resource.action}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={
                      formData.wellnessResources?.[resource.key]?.description ||
                      ""
                    }
                    onChange={(e) =>
                      updateWellnessResource(
                        resource.key,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Description of this wellness resource and its benefits"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL/Link</label>
                  <Input
                    value={
                      formData.wellnessResources?.[resource.key]?.url || ""
                    }
                    onChange={(e) =>
                      updateWellnessResource(
                        resource.key,
                        "url",
                        e.target.value,
                      )
                    }
                    placeholder={`Link to ${resource.type.toLowerCase()}`}
                  />
                </div>
                <ImageUpload
                  label={`${resource.title} Preview Image`}
                  currentImage={
                    formData.wellnessResources?.[resource.key]?.image || ""
                  }
                  onImageUpdate={(url) =>
                    updateWellnessResource(resource.key, "image", url)
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* About the Practitioner Section */}
        <Card>
          <CardHeader>
            <CardTitle>About the Practitioner</CardTitle>
            <CardDescription>
              Rounded square portrait, short personal bio, "Book a Clarity
              Session" button
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
              <label className="text-sm font-medium">Personal Bio</label>
              <Textarea
                value={formData.practitioner?.bio || ""}
                onChange={(e) =>
                  updateFormField("practitioner.bio", e.target.value)
                }
                placeholder="As a Board-Certified Psychiatric and Mental Health Nurse Practitioner, I bring clinical expertise and compassionate care..."
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
                  "Board-Certified Psychiatric & Mental Health Nurse Practitioner (PMHNP-BC)"
                }
                onChange={(e) =>
                  updateFormField("practitioner.credentials", e.target.value)
                }
                placeholder="Board-Certified Psychiatric & Mental Health Nurse Practitioner (PMHNP-BC)"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Credentials Description
              </label>
              <Input
                value={formData.practitioner?.credentialsDescription || ""}
                onChange={(e) =>
                  updateFormField(
                    "practitioner.credentialsDescription",
                    e.target.value,
                  )
                }
                placeholder="Licensed to provide comprehensive psychiatric care, medication management, and psychotherapy"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CTA Button Text</label>
              <Input
                value={
                  formData.practitioner?.ctaText || "Book a Clarity Session"
                }
                onChange={(e) =>
                  updateFormField("practitioner.ctaText", e.target.value)
                }
                placeholder="Book a Clarity Session"
              />
            </div>
            <ImageUpload
              label="Practitioner Portrait (Rounded Square Frame)"
              currentImage={formData.practitioner?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("practitioner.image", url)
              }
            />
          </CardContent>
        </Card>

        {/* Booking CTA Section */}
        <Card>
          <CardHeader>
            <CardTitle>Booking CTA Section</CardTitle>
            <CardDescription>
              Final call-to-action with booking_bg_dark.jpg background, highly
              readable text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={
                  formData.finalCTA?.title ||
                  "Take the First Step Toward Healing"
                }
                onChange={(e) =>
                  updateFormField("finalCTA.title", e.target.value)
                }
                placeholder="Take the First Step Toward Healing"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.finalCTA?.description || ""}
                onChange={(e) =>
                  updateFormField("finalCTA.description", e.target.value)
                }
                placeholder="Your mental health journey begins with compassionate, professional care. Let's explore how psychiatric treatment can help you own your power and shape your story."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">CTA Button Text</label>
              <Input
                value={
                  formData.finalCTA?.buttonText || "Schedule Your Consultation"
                }
                onChange={(e) =>
                  updateFormField("finalCTA.buttonText", e.target.value)
                }
                placeholder="Schedule Your Consultation"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Calendly URL</label>
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
            <div>
              <label className="text-sm font-medium">
                Credentials Footer Text
              </label>
              <Input
                value={
                  formData.finalCTA?.credentialsFooter ||
                  "PMHNP-BC • Evidence-Based Care • Compassionate Treatment"
                }
                onChange={(e) =>
                  updateFormField("finalCTA.credentialsFooter", e.target.value)
                }
                placeholder="PMHNP-BC • Evidence-Based Care • Compassionate Treatment"
              />
            </div>
            <ImageUpload
              label="Background Image (booking_bg_dark.jpg)"
              currentImage={formData.finalCTA?.backgroundImage || ""}
              onImageUpdate={(url) =>
                updateFormField("finalCTA.backgroundImage", url)
              }
            />
          </CardContent>
        </Card>

        {/* SEO & Meta Information */}
        <Card>
          <CardHeader>
            <CardTitle>SEO & Meta Information</CardTitle>
            <CardDescription>
              Search engine optimization for the psychiatric practice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Page Title</label>
              <Input
                value={
                  formData.seo?.title ||
                  "Own your Power. Shape your Story. | Psychiatric & Mental Health Nurse Practitioner"
                }
                onChange={(e) => updateFormField("seo.title", e.target.value)}
                placeholder="Page title for search engines"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Meta Description</label>
              <Textarea
                value={formData.seo?.description || ""}
                onChange={(e) =>
                  updateFormField("seo.description", e.target.value)
                }
                placeholder="Transform your mental health journey with compassionate, evidence-based psychiatric care..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Keywords</label>
              <Input
                value={formData.seo?.keywords || ""}
                onChange={(e) =>
                  updateFormField("seo.keywords", e.target.value)
                }
                placeholder="psychiatric nurse practitioner, mental health care, anxiety treatment, depression therapy"
              />
            </div>
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
