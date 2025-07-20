import { useState, useEffect } from "react";
import { useContent, useUpdateContent } from "../../hooks/useContent";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ImageUpload } from "../../components/admin/ImageUpload";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Save, Loader2 } from "lucide-react";

export function AdminServices() {
  const { content, loading } = useContent("services");
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
      await updateContent("services", formData);
      setSaveMessage("Services page updated successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error updating services page. Please try again.");
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
              Services Management
            </h1>
            <p className="text-muted-foreground">
              Manage your three transformational tracks and service offerings
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
            <CardDescription>Main page header and introduction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Main Title</label>
              <Input
                value={formData.hero?.title || ""}
                onChange={(e) => updateFormField("hero.title", e.target.value)}
                placeholder="Your Transformation Journey"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.hero?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("hero.subtitle", e.target.value)
                }
                placeholder="Three Pathways to Self-Leadership"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.hero?.description || ""}
                onChange={(e) =>
                  updateFormField("hero.description", e.target.value)
                }
                placeholder="Choose the path that honors where you are right now..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* The Clarity Path */}
        <Card>
          <CardHeader>
            <CardTitle>The Clarity Path</CardTitle>
            <CardDescription>
              For women who are just beginning their inner journey and feel
              mentally overwhelmed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.tracks?.clarityPath?.active ?? true}
                onCheckedChange={(checked) =>
                  updateFormField("tracks.clarityPath.active", checked)
                }
              />
              <label className="text-sm font-medium">Active</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.tracks?.clarityPath?.title || ""}
                  onChange={(e) =>
                    updateFormField("tracks.clarityPath.title", e.target.value)
                  }
                  placeholder="The Clarity Path"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Icon (Emoji)</label>
                <Input
                  value={formData.tracks?.clarityPath?.icon || ""}
                  onChange={(e) =>
                    updateFormField("tracks.clarityPath.icon", e.target.value)
                  }
                  placeholder="🧭"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.tracks?.clarityPath?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("tracks.clarityPath.subtitle", e.target.value)
                }
                placeholder="For women who are just beginning their inner journey"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.tracks?.clarityPath?.description || ""}
                onChange={(e) =>
                  updateFormField(
                    "tracks.clarityPath.description",
                    e.target.value,
                  )
                }
                placeholder="Perfect for women feeling overwhelmed or mentally scattered..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Highlight Note (Optional)
              </label>
              <Textarea
                value={formData.tracks?.clarityPath?.highlightNote || ""}
                onChange={(e) =>
                  updateFormField(
                    "tracks.clarityPath.highlightNote",
                    e.target.value,
                  )
                }
                placeholder="Perfect first step if you're new to transformation work."
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Features/Includes</label>
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  value={formData.tracks?.clarityPath?.features?.[index] || ""}
                  onChange={(e) => {
                    const features =
                      formData.tracks?.clarityPath?.features || [];
                    features[index] = e.target.value;
                    updateFormField("tracks.clarityPath.features", features);
                  }}
                  placeholder={
                    index === 0
                      ? "A Clarity Session"
                      : index === 1
                        ? "Light journaling and reflection exercises"
                        : index === 2
                          ? "A simple direction-setting plan"
                          : "Additional benefit"
                  }
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={formData.tracks?.clarityPath?.duration || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.clarityPath.duration",
                      e.target.value,
                    )
                  }
                  placeholder="Single session"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  value={formData.tracks?.clarityPath?.price || ""}
                  onChange={(e) =>
                    updateFormField("tracks.clarityPath.price", e.target.value)
                  }
                  placeholder="$297"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Button Text</label>
                <Input
                  value={formData.tracks?.clarityPath?.buttonText || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.clarityPath.buttonText",
                      e.target.value,
                    )
                  }
                  placeholder="Book Your Clarity Session"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Focus (for comparison table)
                </label>
                <Input
                  value={formData.tracks?.clarityPath?.focus || ""}
                  onChange={(e) =>
                    updateFormField("tracks.clarityPath.focus", e.target.value)
                  }
                  placeholder="Mental clarity and direction"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ideal Client</label>
                <Input
                  value={formData.tracks?.clarityPath?.whoFor || ""}
                  onChange={(e) =>
                    updateFormField("tracks.clarityPath.whoFor", e.target.value)
                  }
                  placeholder="Women feeling overwhelmed"
                />
              </div>
            </div>

            <ImageUpload
              label="Track Image"
              currentImage={formData.tracks?.clarityPath?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("tracks.clarityPath.image", url)
              }
            />
          </CardContent>
        </Card>

        {/* The Reinvention Experience */}
        <Card>
          <CardHeader>
            <CardTitle>The Reinvention Experience</CardTitle>
            <CardDescription>
              For those ready to break old patterns and reshape their
              self-identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={
                    formData.tracks?.reinventionExperience?.active ?? true
                  }
                  onCheckedChange={(checked) =>
                    updateFormField(
                      "tracks.reinventionExperience.active",
                      checked,
                    )
                  }
                />
                <label className="text-sm font-medium">Active</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={
                    formData.tracks?.reinventionExperience?.popular ?? false
                  }
                  onCheckedChange={(checked) =>
                    updateFormField(
                      "tracks.reinventionExperience.popular",
                      checked,
                    )
                  }
                />
                <label className="text-sm font-medium">Mark as Popular</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.tracks?.reinventionExperience?.title || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.title",
                      e.target.value,
                    )
                  }
                  placeholder="The Reinvention Experience"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Icon (Emoji)</label>
                <Input
                  value={formData.tracks?.reinventionExperience?.icon || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.icon",
                      e.target.value,
                    )
                  }
                  placeholder="🦋"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.tracks?.reinventionExperience?.subtitle || ""}
                onChange={(e) =>
                  updateFormField(
                    "tracks.reinventionExperience.subtitle",
                    e.target.value,
                  )
                }
                placeholder="For those ready to break old patterns"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={
                  formData.tracks?.reinventionExperience?.description || ""
                }
                onChange={(e) =>
                  updateFormField(
                    "tracks.reinventionExperience.description",
                    e.target.value,
                  )
                }
                placeholder="Ready to break free from limiting patterns..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Highlight Note (Optional)
              </label>
              <Textarea
                value={
                  formData.tracks?.reinventionExperience?.highlightNote || ""
                }
                onChange={(e) =>
                  updateFormField(
                    "tracks.reinventionExperience.highlightNote",
                    e.target.value,
                  )
                }
                placeholder="Most popular choice for women ready for real change."
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Features/Includes</label>
              {[0, 1, 2, 3, 4].map((index) => (
                <Input
                  key={index}
                  value={
                    formData.tracks?.reinventionExperience?.features?.[index] ||
                    ""
                  }
                  onChange={(e) => {
                    const features =
                      formData.tracks?.reinventionExperience?.features || [];
                    features[index] = e.target.value;
                    updateFormField(
                      "tracks.reinventionExperience.features",
                      features,
                    );
                  }}
                  placeholder={
                    index === 0
                      ? "4–6 private coaching sessions"
                      : index === 1
                        ? "Mindset work + strategic reinvention tools"
                        : index === 2
                          ? "Printable worksheets and weekly homework"
                          : `Feature ${index + 1}`
                  }
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={formData.tracks?.reinventionExperience?.duration || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.duration",
                      e.target.value,
                    )
                  }
                  placeholder="2-3 months"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  value={formData.tracks?.reinventionExperience?.price || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.price",
                      e.target.value,
                    )
                  }
                  placeholder="$1,497"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Button Text</label>
                <Input
                  value={
                    formData.tracks?.reinventionExperience?.buttonText || ""
                  }
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.buttonText",
                      e.target.value,
                    )
                  }
                  placeholder="Start Your Reinvention"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Focus (for comparison table)
                </label>
                <Input
                  value={formData.tracks?.reinventionExperience?.focus || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.focus",
                      e.target.value,
                    )
                  }
                  placeholder="Pattern breaking and identity shift"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ideal Client</label>
                <Input
                  value={formData.tracks?.reinventionExperience?.whoFor || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.reinventionExperience.whoFor",
                      e.target.value,
                    )
                  }
                  placeholder="Women ready for change"
                />
              </div>
            </div>

            <ImageUpload
              label="Track Image"
              currentImage={formData.tracks?.reinventionExperience?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("tracks.reinventionExperience.image", url)
              }
            />
          </CardContent>
        </Card>

        {/* The High Agency Method */}
        <Card>
          <CardHeader>
            <CardTitle>The High Agency Method</CardTitle>
            <CardDescription>
              A deep mentorship container for self-led women ready to embody
              elegance and leadership
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.tracks?.highAgencyMethod?.active ?? true}
                onCheckedChange={(checked) =>
                  updateFormField("tracks.highAgencyMethod.active", checked)
                }
              />
              <label className="text-sm font-medium">Active</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.title || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.title",
                      e.target.value,
                    )
                  }
                  placeholder="The High Agency Method"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Icon (Emoji or Crown)
                </label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.icon || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.icon",
                      e.target.value,
                    )
                  }
                  placeholder="👑"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.tracks?.highAgencyMethod?.subtitle || ""}
                onChange={(e) =>
                  updateFormField(
                    "tracks.highAgencyMethod.subtitle",
                    e.target.value,
                  )
                }
                placeholder="Deep mentorship for intentional living"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.tracks?.highAgencyMethod?.description || ""}
                onChange={(e) =>
                  updateFormField(
                    "tracks.highAgencyMethod.description",
                    e.target.value,
                  )
                }
                placeholder="A deep mentorship container for self-led women..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Highlight Note (Optional)
              </label>
              <Textarea
                value={formData.tracks?.highAgencyMethod?.highlightNote || ""}
                onChange={(e) =>
                  updateFormField(
                    "tracks.highAgencyMethod.highlightNote",
                    e.target.value,
                  )
                }
                placeholder="Application required. Limited spots available."
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Features/Includes</label>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  value={
                    formData.tracks?.highAgencyMethod?.features?.[index] || ""
                  }
                  onChange={(e) => {
                    const features =
                      formData.tracks?.highAgencyMethod?.features || [];
                    features[index] = e.target.value;
                    updateFormField(
                      "tracks.highAgencyMethod.features",
                      features,
                    );
                  }}
                  placeholder={
                    index === 0
                      ? "Long-term mentorship (3+ months)"
                      : index === 1
                        ? "Integration of mindset, lifestyle, and feminine power"
                        : index === 2
                          ? "Access to exclusive coaching and community"
                          : `Feature ${index + 1}`
                  }
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.duration || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.duration",
                      e.target.value,
                    )
                  }
                  placeholder="3-6 months"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.price || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.price",
                      e.target.value,
                    )
                  }
                  placeholder="Starting at $3,997"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Button Text</label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.buttonText || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.buttonText",
                      e.target.value,
                    )
                  }
                  placeholder="Apply for High Agency"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Focus (for comparison table)
                </label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.focus || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.focus",
                      e.target.value,
                    )
                  }
                  placeholder="Leadership and lifestyle mastery"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ideal Client</label>
                <Input
                  value={formData.tracks?.highAgencyMethod?.whoFor || ""}
                  onChange={(e) =>
                    updateFormField(
                      "tracks.highAgencyMethod.whoFor",
                      e.target.value,
                    )
                  }
                  placeholder="Leaders seeking transformation"
                />
              </div>
            </div>

            <ImageUpload
              label="Track Image"
              currentImage={formData.tracks?.highAgencyMethod?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("tracks.highAgencyMethod.image", url)
              }
            />
          </CardContent>
        </Card>

        {/* Comparison Table Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Comparison Table</CardTitle>
            <CardDescription>
              Settings for the track comparison table
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.comparison?.showComparison ?? true}
                onCheckedChange={(checked) =>
                  updateFormField("comparison.showComparison", checked)
                }
              />
              <label className="text-sm font-medium">
                Show Comparison Table
              </label>
            </div>

            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.comparison?.title || ""}
                onChange={(e) =>
                  updateFormField("comparison.title", e.target.value)
                }
                placeholder="Which Path is Right for You?"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Input
                value={formData.comparison?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("comparison.subtitle", e.target.value)
                }
                placeholder="Understanding the differences between each transformational pathway."
              />
            </div>
          </CardContent>
        </Card>

        {/* Call to Action Section */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
            <CardDescription>
              Final section encouraging visitors to take action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.cta?.title || ""}
                onChange={(e) => updateFormField("cta.title", e.target.value)}
                placeholder="Ready to Begin Your Transformation?"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.cta?.description || ""}
                onChange={(e) =>
                  updateFormField("cta.description", e.target.value)
                }
                placeholder="Not sure which track is right for you..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Primary Button Text
                </label>
                <Input
                  value={formData.cta?.buttonText || ""}
                  onChange={(e) =>
                    updateFormField("cta.buttonText", e.target.value)
                  }
                  placeholder="Schedule a Discovery Call"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Secondary Button Text (Optional)
                </label>
                <Input
                  value={formData.cta?.secondaryButtonText || ""}
                  onChange={(e) =>
                    updateFormField("cta.secondaryButtonText", e.target.value)
                  }
                  placeholder="Download Service Guide"
                />
              </div>
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
