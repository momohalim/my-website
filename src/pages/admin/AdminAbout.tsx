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

export function AdminAbout() {
  const { content, loading } = useContent("about");
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
      await updateContent("about", formData);
      setSaveMessage("About page updated successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error updating about page. Please try again.");
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
            <h1 className="text-3xl font-bold tracking-tight">About Page</h1>
            <p className="text-muted-foreground">
              Manage your professional journey and personal story
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

        {/* Introduction Section */}
        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
            <CardDescription>
              Opening statement about THE High Agency Collective
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">
                Introduction Content
              </label>
              <Textarea
                value={formData.introduction?.content || ""}
                onChange={(e) =>
                  updateFormField("introduction.content", e.target.value)
                }
                placeholder="At The High Agency Collective, I help ambitious women..."
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* The Calling Section */}
        <Card>
          <CardHeader>
            <CardTitle>The Calling Section</CardTitle>
            <CardDescription>
              Your journey from nurse practitioner to calling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.calling?.title || ""}
                onChange={(e) =>
                  updateFormField("calling.title", e.target.value)
                }
                placeholder="It Was Never Just a Career. It Was a Calling."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.calling?.content || ""}
                onChange={(e) =>
                  updateFormField("calling.content", e.target.value)
                }
                placeholder="My journey began in the clinical world..."
                rows={6}
              />
            </div>
            <ImageUpload
              label="Personal Portrait"
              currentImage={formData.calling?.image || ""}
              onImageUpdate={(url) => updateFormField("calling.image", url)}
            />
          </CardContent>
        </Card>

        {/* From Clinician to Guide Section */}
        <Card>
          <CardHeader>
            <CardTitle>From Clinician to Guide Section</CardTitle>
            <CardDescription>
              Merging science with soul and your specialties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.clinicianToGuide?.title || ""}
                onChange={(e) =>
                  updateFormField("clinicianToGuide.title", e.target.value)
                }
                placeholder="Merging Science with Soul"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.clinicianToGuide?.content || ""}
                onChange={(e) =>
                  updateFormField("clinicianToGuide.content", e.target.value)
                }
                placeholder="My approach is unique because..."
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Specialties</label>
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index}>
                  <Input
                    value={
                      formData.clinicianToGuide?.specialties?.[index] || ""
                    }
                    onChange={(e) => {
                      const specialties =
                        formData.clinicianToGuide?.specialties || [];
                      specialties[index] = e.target.value;
                      updateFormField(
                        "clinicianToGuide.specialties",
                        specialties,
                      );
                    }}
                    placeholder={`Specialty ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <ImageUpload
              label="Section Image"
              currentImage={formData.clinicianToGuide?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("clinicianToGuide.image", url)
              }
            />
            <ImageUpload
              label="Section Video (Optional)"
              currentImage={formData.clinicianToGuide?.videoUrl || ""}
              onImageUpdate={(url) =>
                updateFormField("clinicianToGuide.videoUrl", url)
              }
              acceptedTypes="video/*"
            />
          </CardContent>
        </Card>

        {/* Values & Philosophy Section */}
        <Card>
          <CardHeader>
            <CardTitle>Values & Philosophy Section</CardTitle>
            <CardDescription>
              Your core values and guiding principles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.values?.title || ""}
                onChange={(e) =>
                  updateFormField("values.title", e.target.value)
                }
                placeholder="What I Stand For"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Input
                value={formData.values?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("values.subtitle", e.target.value)
                }
                placeholder="The principles that guide my work and life"
              />
            </div>

            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Value {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Icon</label>
                    <Input
                      value={formData.values?.values?.[index]?.icon || ""}
                      onChange={(e) => {
                        const values = formData.values?.values || [];
                        values[index] = {
                          ...values[index],
                          icon: e.target.value,
                        };
                        updateFormField("values.values", values);
                      }}
                      placeholder="💎"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.values?.values?.[index]?.title || ""}
                      onChange={(e) => {
                        const values = formData.values?.values || [];
                        values[index] = {
                          ...values[index],
                          title: e.target.value,
                        };
                        updateFormField("values.values", values);
                      }}
                      placeholder="Radical Honesty"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={
                        formData.values?.values?.[index]?.description || ""
                      }
                      onChange={(e) => {
                        const values = formData.values?.values || [];
                        values[index] = {
                          ...values[index],
                          description: e.target.value,
                        };
                        updateFormField("values.values", values);
                      }}
                      placeholder="Truth without judgment..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* The Woman Behind the Brand Section */}
        <Card>
          <CardHeader>
            <CardTitle>The Woman Behind the Brand Section</CardTitle>
            <CardDescription>
              Personal glimpse into your life and authenticity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.womanBehindBrand?.title || ""}
                onChange={(e) =>
                  updateFormField("womanBehindBrand.title", e.target.value)
                }
                placeholder="A Glimpse Behind the Curtain"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.womanBehindBrand?.content || ""}
                onChange={(e) =>
                  updateFormField("womanBehindBrand.content", e.target.value)
                }
                placeholder="When I'm not guiding women through their transformations..."
                rows={6}
              />
            </div>
            <ImageUpload
              label="Lifestyle Photo"
              currentImage={formData.womanBehindBrand?.image || ""}
              onImageUpdate={(url) =>
                updateFormField("womanBehindBrand.image", url)
              }
            />
            <ImageUpload
              label="Lifestyle Video (Optional)"
              currentImage={formData.womanBehindBrand?.videoUrl || ""}
              onImageUpdate={(url) =>
                updateFormField("womanBehindBrand.videoUrl", url)
              }
              acceptedTypes="video/*"
            />
          </CardContent>
        </Card>

        {/* Credentials & Recognition Section */}
        <Card>
          <CardHeader>
            <CardTitle>Credentials & Recognition Section</CardTitle>
            <CardDescription>
              Professional qualifications and certifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.credentials?.title || ""}
                onChange={(e) =>
                  updateFormField("credentials.title", e.target.value)
                }
                placeholder="Rooted in Integrity & Expertise"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Section Subtitle</label>
              <Input
                value={formData.credentials?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("credentials.subtitle", e.target.value)
                }
                placeholder="Professional qualifications that support transformational work"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Professional Rating (1-5)
              </label>
              <Input
                type="number"
                min="1"
                max="5"
                value={formData.credentials?.rating || 5}
                onChange={(e) =>
                  updateFormField(
                    "credentials.rating",
                    parseInt(e.target.value),
                  )
                }
              />
            </div>

            {[0, 1, 2].map((index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Certificate {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Certificate Name
                    </label>
                    <Input
                      value={
                        formData.credentials?.certificates?.[index]?.name || ""
                      }
                      onChange={(e) => {
                        const certificates =
                          formData.credentials?.certificates || [];
                        certificates[index] = {
                          ...certificates[index],
                          name: e.target.value,
                        };
                        updateFormField(
                          "credentials.certificates",
                          certificates,
                        );
                      }}
                      placeholder="Psychiatric Mental Health Nurse Practitioner"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Organization</label>
                    <Input
                      value={
                        formData.credentials?.certificates?.[index]
                          ?.organization || ""
                      }
                      onChange={(e) => {
                        const certificates =
                          formData.credentials?.certificates || [];
                        certificates[index] = {
                          ...certificates[index],
                          organization: e.target.value,
                        };
                        updateFormField(
                          "credentials.certificates",
                          certificates,
                        );
                      }}
                      placeholder="Board Certified - ANCC"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Year</label>
                    <Input
                      value={
                        formData.credentials?.certificates?.[index]?.year || ""
                      }
                      onChange={(e) => {
                        const certificates =
                          formData.credentials?.certificates || [];
                        certificates[index] = {
                          ...certificates[index],
                          year: e.target.value,
                        };
                        updateFormField(
                          "credentials.certificates",
                          certificates,
                        );
                      }}
                      placeholder="2019"
                    />
                  </div>
                </div>
                <ImageUpload
                  label={`Certificate ${index + 1} Image`}
                  currentImage={
                    formData.credentials?.certificates?.[index]?.image || ""
                  }
                  onImageUpdate={(url) => {
                    const certificates =
                      formData.credentials?.certificates || [];
                    certificates[index] = {
                      ...certificates[index],
                      image: url,
                    };
                    updateFormField("credentials.certificates", certificates);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* A Personal Note to You Section */}
        <Card>
          <CardHeader>
            <CardTitle>A Personal Note to You Section</CardTitle>
            <CardDescription>
              Direct, heartfelt message to visitors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.personalNote?.title || ""}
                onChange={(e) =>
                  updateFormField("personalNote.title", e.target.value)
                }
                placeholder="If You're Reading This, Know You're Not Alone"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.personalNote?.content || ""}
                onChange={(e) =>
                  updateFormField("personalNote.content", e.target.value)
                }
                placeholder="I see you—the woman who has achieved so much..."
                rows={8}
              />
            </div>
          </CardContent>
        </Card>

        {/* Call to Action Section */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
            <CardDescription>Final invitation to connect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.cta?.title || ""}
                onChange={(e) => updateFormField("cta.title", e.target.value)}
                placeholder="Ready to Begin?"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.cta?.description || ""}
                onChange={(e) =>
                  updateFormField("cta.description", e.target.value)
                }
                placeholder="Your transformation starts with a conversation..."
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
