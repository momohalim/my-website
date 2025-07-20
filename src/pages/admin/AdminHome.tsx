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
              Manage your homepage content and layout
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
              Main banner with video background and call-to-action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Main Heading</label>
              <Input
                value={formData.hero?.title || ""}
                onChange={(e) => updateFormField("hero.title", e.target.value)}
                placeholder="Own your Power. Shape your Story."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle (optional)</label>
              <Input
                value={formData.hero?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("hero.subtitle", e.target.value)
                }
                placeholder="Optional subtitle"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.hero?.description || ""}
                onChange={(e) =>
                  updateFormField("hero.description", e.target.value)
                }
                placeholder="At THE High Agency Collective, I help ambitious women..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.hero?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("hero.buttonText", e.target.value)
                }
                placeholder="Book Your Clarity Session"
              />
            </div>
            <ImageUpload
              label="Hero Video"
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

        {/* Meet Your Guide Section */}
        <Card>
          <CardHeader>
            <CardTitle>Meet Your Guide Section</CardTitle>
            <CardDescription>
              Introduction section about you and your expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.introduction?.title || ""}
                onChange={(e) =>
                  updateFormField("introduction.title", e.target.value)
                }
                placeholder="Meet Your Guide"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.introduction?.content || ""}
                onChange={(e) =>
                  updateFormField("introduction.content", e.target.value)
                }
                placeholder="At THE High Agency Collective, I help ambitious women..."
                rows={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.introduction?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("introduction.buttonText", e.target.value)
                }
                placeholder="Learn More About Me"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Link</label>
              <Input
                value={formData.introduction?.buttonLink || ""}
                onChange={(e) =>
                  updateFormField("introduction.buttonLink", e.target.value)
                }
                placeholder="/about"
              />
            </div>
            <ImageUpload
              label="Guide Portrait Image"
              currentImage={formData.introduction?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("introduction.image", url)
              }
            />
          </CardContent>
        </Card>

        {/* Core Services Section */}
        <Card>
          <CardHeader>
            <CardTitle>Core Services Section</CardTitle>
            <CardDescription>Three main services you offer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.services?.title || ""}
                onChange={(e) =>
                  updateFormField("services.title", e.target.value)
                }
                placeholder="Core Services"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Input
                value={formData.services?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("services.subtitle", e.target.value)
                }
                placeholder="Transform your life through evidence-based approaches..."
              />
            </div>

            {/* Service 1 */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Service 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    value={formData.services?.service1?.icon || ""}
                    onChange={(e) =>
                      updateFormField("services.service1.icon", e.target.value)
                    }
                    placeholder="🧠"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.services?.service1?.title || ""}
                    onChange={(e) =>
                      updateFormField("services.service1.title", e.target.value)
                    }
                    placeholder="Mindset Transformation"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.services?.service1?.description || ""}
                    onChange={(e) =>
                      updateFormField(
                        "services.service1.description",
                        e.target.value,
                      )
                    }
                    placeholder="Break through limiting beliefs..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Service 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    value={formData.services?.service2?.icon || ""}
                    onChange={(e) =>
                      updateFormField("services.service2.icon", e.target.value)
                    }
                    placeholder="💫"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.services?.service2?.title || ""}
                    onChange={(e) =>
                      updateFormField("services.service2.title", e.target.value)
                    }
                    placeholder="Integrated Psychotherapy"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.services?.service2?.description || ""}
                    onChange={(e) =>
                      updateFormField(
                        "services.service2.description",
                        e.target.value,
                      )
                    }
                    placeholder="Professional therapeutic support..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Service 3</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    value={formData.services?.service3?.icon || ""}
                    onChange={(e) =>
                      updateFormField("services.service3.icon", e.target.value)
                    }
                    placeholder="🌱"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.services?.service3?.title || ""}
                    onChange={(e) =>
                      updateFormField("services.service3.title", e.target.value)
                    }
                    placeholder="Life Reinvention"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.services?.service3?.description || ""}
                    onChange={(e) =>
                      updateFormField(
                        "services.service3.description",
                        e.target.value,
                      )
                    }
                    placeholder="Redesign your life from the ground up..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clarity Journal Section */}
        <Card>
          <CardHeader>
            <CardTitle>Clarity Journal Section</CardTitle>
            <CardDescription>Free PDF download and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.clarityJournal?.title || ""}
                onChange={(e) =>
                  updateFormField("clarityJournal.title", e.target.value)
                }
                placeholder="Clarity Journal"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.clarityJournal?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("clarityJournal.subtitle", e.target.value)
                }
                placeholder="Your Free Guide to Inner Transformation"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.clarityJournal?.description || ""}
                onChange={(e) =>
                  updateFormField("clarityJournal.description", e.target.value)
                }
                placeholder="Explore your inner world with this free guided journal..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Download Button Text
              </label>
              <Input
                value={formData.clarityJournal?.downloadText || ""}
                onChange={(e) =>
                  updateFormField("clarityJournal.downloadText", e.target.value)
                }
                placeholder="Download Your Free Journal"
              />
            </div>
            <ImageUpload
              label="Journal Preview Image"
              currentImage={formData.clarityJournal?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("clarityJournal.image", url)
              }
            />
            <ImageUpload
              label="PDF File"
              currentImage={formData.clarityJournal?.pdfUrl || ""}
              onImageUpdate={(url) =>
                updateFormField("clarityJournal.pdfUrl", url)
              }
              acceptedTypes=".pdf"
            />
          </CardContent>
        </Card>

        {/* Testimonials Section */}
        <Card>
          <CardHeader>
            <CardTitle>Testimonials Section</CardTitle>
            <CardDescription>
              Client testimonials with photos and ratings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.testimonials?.title || ""}
                onChange={(e) =>
                  updateFormField("testimonials.title", e.target.value)
                }
                placeholder="Client Transformations"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Input
                value={formData.testimonials?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("testimonials.subtitle", e.target.value)
                }
                placeholder="Real stories of profound change and empowerment."
              />
            </div>

            {[1, 2, 3].map((num) => (
              <div key={num} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Testimonial {num}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Client Name</label>
                    <Input
                      value={
                        formData.testimonials?.testimonials?.[num - 1]?.name ||
                        ""
                      }
                      onChange={(e) => {
                        const testimonials =
                          formData.testimonials?.testimonials || [];
                        testimonials[num - 1] = {
                          ...testimonials[num - 1],
                          name: e.target.value,
                        };
                        updateFormField(
                          "testimonials.testimonials",
                          testimonials,
                        );
                      }}
                      placeholder="Jessica Chen"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role/Title</label>
                    <Input
                      value={
                        formData.testimonials?.testimonials?.[num - 1]?.role ||
                        ""
                      }
                      onChange={(e) => {
                        const testimonials =
                          formData.testimonials?.testimonials || [];
                        testimonials[num - 1] = {
                          ...testimonials[num - 1],
                          role: e.target.value,
                        };
                        updateFormField(
                          "testimonials.testimonials",
                          testimonials,
                        );
                      }}
                      placeholder="Executive Director"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Testimonial Text
                  </label>
                  <Textarea
                    value={
                      formData.testimonials?.testimonials?.[num - 1]?.text || ""
                    }
                    onChange={(e) => {
                      const testimonials =
                        formData.testimonials?.testimonials || [];
                      testimonials[num - 1] = {
                        ...testimonials[num - 1],
                        text: e.target.value,
                      };
                      updateFormField(
                        "testimonials.testimonials",
                        testimonials,
                      );
                    }}
                    placeholder="Working with her completely transformed my relationship with myself..."
                    rows={3}
                  />
                </div>
                <ImageUpload
                  label={`Client Photo ${num}`}
                  currentImage={
                    formData.testimonials?.testimonials?.[num - 1]?.image || ""
                  }
                  onImageUpdate={(url) => {
                    const testimonials =
                      formData.testimonials?.testimonials || [];
                    testimonials[num - 1] = {
                      ...testimonials[num - 1],
                      image: url,
                    };
                    updateFormField("testimonials.testimonials", testimonials);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Clarity Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Clarity Questions Section</CardTitle>
            <CardDescription>Reflective questions for visitors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.clarityQuestions?.title || ""}
                onChange={(e) =>
                  updateFormField("clarityQuestions.title", e.target.value)
                }
                placeholder="Clarity Questions"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.clarityQuestions?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("clarityQuestions.subtitle", e.target.value)
                }
                placeholder="Take a moment to reflect on where you are..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Introduction</label>
              <Textarea
                value={formData.clarityQuestions?.introduction || ""}
                onChange={(e) =>
                  updateFormField(
                    "clarityQuestions.introduction",
                    e.target.value,
                  )
                }
                placeholder="These questions are designed to help you gain clarity..."
                rows={3}
              />
            </div>

            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num}>
                <label className="text-sm font-medium">Question {num}</label>
                <Input
                  value={formData.clarityQuestions?.questions?.[num - 1] || ""}
                  onChange={(e) => {
                    const questions =
                      formData.clarityQuestions?.questions || [];
                    questions[num - 1] = e.target.value;
                    updateFormField("clarityQuestions.questions", questions);
                  }}
                  placeholder={`Question ${num}`}
                />
              </div>
            ))}

            <div>
              <label className="text-sm font-medium">CTA Text</label>
              <Input
                value={formData.clarityQuestions?.ctaText || ""}
                onChange={(e) =>
                  updateFormField("clarityQuestions.ctaText", e.target.value)
                }
                placeholder="Ready to dive deeper? Book your clarity session."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.clarityQuestions?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("clarityQuestions.buttonText", e.target.value)
                }
                placeholder="Book Your Session"
              />
            </div>
          </CardContent>
        </Card>

        {/* Call to Action Section */}
        <Card>
          <CardHeader>
            <CardTitle>Final Call to Action Section</CardTitle>
            <CardDescription>
              The final CTA section with background image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.cta?.title || ""}
                onChange={(e) => updateFormField("cta.title", e.target.value)}
                placeholder="Take the First Step"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.cta?.description || ""}
                onChange={(e) =>
                  updateFormField("cta.description", e.target.value)
                }
                placeholder="Your transformation begins with a single conversation..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.cta?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("cta.buttonText", e.target.value)
                }
                placeholder="Book Your Clarity Session"
              />
            </div>
            <ImageUpload
              label="Background Image"
              currentImage={formData.cta?.backgroundImage || ""}
              onImageUpdate={(url) =>
                updateFormField("cta.backgroundImage", url)
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
