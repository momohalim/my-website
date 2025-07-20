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
import { Save, Loader2 } from "lucide-react";

export function AdminTransform() {
  const { content, loading } = useContent("transform");
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
      await updateContent("transform", formData);
      setSaveMessage("Transform page updated successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error updating transform page. Please try again.");
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
            <h1 className="text-3xl font-bold tracking-tight">
              Transform Page
            </h1>
            <p className="text-muted-foreground">
              Manage your transformation journey content and interactive
              elements
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

        {/* The Threshold Section */}
        <Card>
          <CardHeader>
            <CardTitle>The Threshold - Hero Section</CardTitle>
            <CardDescription>
              Opening section with video background and overlay text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.threshold?.title || ""}
                onChange={(e) =>
                  updateFormField("threshold.title", e.target.value)
                }
                placeholder="The Threshold – Where It Begins"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Overlay Text</label>
              <Textarea
                value={formData.threshold?.overlayText || ""}
                onChange={(e) =>
                  updateFormField("threshold.overlayText", e.target.value)
                }
                placeholder="Every transformation begins with an inner whisper..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.threshold?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("threshold.buttonText", e.target.value)
                }
                placeholder="Begin the Journey"
              />
            </div>
            <ImageUpload
              label="Hero Video"
              currentImage={formData.threshold?.videoUrl || ""}
              onImageUpdate={(url) =>
                updateFormField("threshold.videoUrl", url)
              }
              acceptedTypes="video/*"
            />
            <ImageUpload
              label="Fallback Background Image"
              currentImage={formData.threshold?.fallbackImage || ""}
              onImageUpdate={(url) =>
                updateFormField("threshold.fallbackImage", url)
              }
            />
          </CardContent>
        </Card>

        {/* The Inner Struggle Section */}
        <Card>
          <CardHeader>
            <CardTitle>The Inner Struggle Section</CardTitle>
            <CardDescription>
              Reflective questions displayed in soft cards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.innerStruggle?.title || ""}
                onChange={(e) =>
                  updateFormField("innerStruggle.title", e.target.value)
                }
                placeholder="The Inner Struggle"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.innerStruggle?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("innerStruggle.subtitle", e.target.value)
                }
                placeholder="Questions that awaken your truth"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">
                Reflective Questions
              </label>
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  value={formData.innerStruggle?.questions?.[index] || ""}
                  onChange={(e) => {
                    const questions = formData.innerStruggle?.questions || [];
                    questions[index] = e.target.value;
                    updateFormField("innerStruggle.questions", questions);
                  }}
                  placeholder={`Question ${index + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Awakening Her Power Section */}
        <Card>
          <CardHeader>
            <CardTitle>Awakening Her Power Section</CardTitle>
            <CardDescription>
              Tools and frameworks grid with icons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.awakeningPower?.title || ""}
                onChange={(e) =>
                  updateFormField("awakeningPower.title", e.target.value)
                }
                placeholder="Awakening Her Power"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.awakeningPower?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("awakeningPower.subtitle", e.target.value)
                }
                placeholder="The tools and frameworks for transformation"
              />
            </div>

            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Tool {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Icon (Emoji)</label>
                    <Input
                      value={
                        formData.awakeningPower?.tools?.[index]?.icon || ""
                      }
                      onChange={(e) => {
                        const tools = formData.awakeningPower?.tools || [];
                        tools[index] = {
                          ...tools[index],
                          icon: e.target.value,
                        };
                        updateFormField("awakeningPower.tools", tools);
                      }}
                      placeholder="🧠"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={
                        formData.awakeningPower?.tools?.[index]?.name || ""
                      }
                      onChange={(e) => {
                        const tools = formData.awakeningPower?.tools || [];
                        tools[index] = {
                          ...tools[index],
                          name: e.target.value,
                        };
                        updateFormField("awakeningPower.tools", tools);
                      }}
                      placeholder="Cognitive Reframing"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={
                        formData.awakeningPower?.tools?.[index]?.description ||
                        ""
                      }
                      onChange={(e) => {
                        const tools = formData.awakeningPower?.tools || [];
                        tools[index] = {
                          ...tools[index],
                          description: e.target.value,
                        };
                        updateFormField("awakeningPower.tools", tools);
                      }}
                      placeholder="Transform limiting thoughts into empowering beliefs"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transformation Timeline Section */}
        <Card>
          <CardHeader>
            <CardTitle>The Shift - Transformation Timeline</CardTitle>
            <CardDescription>
              Interactive timeline with five phases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.transformationTimeline?.title || ""}
                onChange={(e) =>
                  updateFormField(
                    "transformationTimeline.title",
                    e.target.value,
                  )
                }
                placeholder="The Shift – Transformation Timeline"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.transformationTimeline?.subtitle || ""}
                onChange={(e) =>
                  updateFormField(
                    "transformationTimeline.subtitle",
                    e.target.value,
                  )
                }
                placeholder="Five phases of profound change"
              />
            </div>

            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Phase {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phase Name</label>
                    <Input
                      value={
                        formData.transformationTimeline?.phases?.[index]
                          ?.name || ""
                      }
                      onChange={(e) => {
                        const phases =
                          formData.transformationTimeline?.phases || [];
                        phases[index] = {
                          ...phases[index],
                          name: e.target.value,
                        };
                        updateFormField(
                          "transformationTimeline.phases",
                          phases,
                        );
                      }}
                      placeholder="Awareness"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={
                        formData.transformationTimeline?.phases?.[index]
                          ?.description || ""
                      }
                      onChange={(e) => {
                        const phases =
                          formData.transformationTimeline?.phases || [];
                        phases[index] = {
                          ...phases[index],
                          description: e.target.value,
                        };
                        updateFormField(
                          "transformationTimeline.phases",
                          phases,
                        );
                      }}
                      placeholder="Recognizing patterns and acknowledging the need for change..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Testimonials Section */}
        <Card>
          <CardHeader>
            <CardTitle>Real Women, Real Change - Testimonials</CardTitle>
            <CardDescription>
              Client testimonials with profile images
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
                placeholder="Real Women, Real Change"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.testimonials?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("testimonials.subtitle", e.target.value)
                }
                placeholder="Stories of transformation from women who've walked this path"
              />
            </div>

            {[0, 1, 2].map((index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Testimonial {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Client Name</label>
                    <Input
                      value={
                        formData.testimonials?.stories?.[index]?.name || ""
                      }
                      onChange={(e) => {
                        const stories = formData.testimonials?.stories || [];
                        stories[index] = {
                          ...stories[index],
                          name: e.target.value,
                        };
                        updateFormField("testimonials.stories", stories);
                      }}
                      placeholder="Sarah Williams"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role/Title</label>
                    <Input
                      value={
                        formData.testimonials?.stories?.[index]?.role || ""
                      }
                      onChange={(e) => {
                        const stories = formData.testimonials?.stories || [];
                        stories[index] = {
                          ...stories[index],
                          role: e.target.value,
                        };
                        updateFormField("testimonials.stories", stories);
                      }}
                      placeholder="Executive Leader"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Testimonial Text
                  </label>
                  <Textarea
                    value={formData.testimonials?.stories?.[index]?.text || ""}
                    onChange={(e) => {
                      const stories = formData.testimonials?.stories || [];
                      stories[index] = {
                        ...stories[index],
                        text: e.target.value,
                      };
                      updateFormField("testimonials.stories", stories);
                    }}
                    placeholder="The transformation work helped me step into my power..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Rating (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.testimonials?.stories?.[index]?.rating || 5}
                    onChange={(e) => {
                      const stories = formData.testimonials?.stories || [];
                      stories[index] = {
                        ...stories[index],
                        rating: parseInt(e.target.value),
                      };
                      updateFormField("testimonials.stories", stories);
                    }}
                  />
                </div>
                <ImageUpload
                  label={`Client Photo ${index + 1}`}
                  currentImage={
                    formData.testimonials?.stories?.[index]?.image || ""
                  }
                  onImageUpdate={(url) => {
                    const stories = formData.testimonials?.stories || [];
                    stories[index] = { ...stories[index], image: url };
                    updateFormField("testimonials.stories", stories);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Final Prompt Section */}
        <Card>
          <CardHeader>
            <CardTitle>Final Prompt - Are You Ready?</CardTitle>
            <CardDescription>
              Motivational final section with Calendly link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Main Title</label>
              <Input
                value={formData.finalPrompt?.title || ""}
                onChange={(e) =>
                  updateFormField("finalPrompt.title", e.target.value)
                }
                placeholder="Transformation isn't a luxury. It's your birthright."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.finalPrompt?.description || ""}
                onChange={(e) =>
                  updateFormField("finalPrompt.description", e.target.value)
                }
                placeholder="You were born to live fully, love deeply, and lead authentically..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.finalPrompt?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("finalPrompt.buttonText", e.target.value)
                }
                placeholder="Book Your First Session"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Calendly URL</label>
              <Input
                value={formData.finalPrompt?.calendlyUrl || ""}
                onChange={(e) =>
                  updateFormField("finalPrompt.calendlyUrl", e.target.value)
                }
                placeholder="https://calendly.com/tashaniyi/30min"
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
