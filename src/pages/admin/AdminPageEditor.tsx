import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

export function AdminPageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const { content, loading } = useContent(slug || "");
  const { updateContent, saving } = useUpdateContent();
  const [formData, setFormData] = useState<any>({});
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleSave = async () => {
    if (!slug) return;

    try {
      await updateContent(slug, formData);
      setSaveMessage("Content saved successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error saving content");
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const updateFormField = (path: string, value: any) => {
    const keys = path.split(".");
    setFormData((prev: any) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const getPageTitle = () => {
    switch (slug) {
      case "about":
        return "About Page";
      case "services":
        return "Services Page";
      case "transform":
        return "Transform Page";
      case "contact":
        return "Contact Page";
      default:
        return "Page Editor";
    }
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit {getPageTitle()}</h1>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>Save Changes</span>
          </Button>
        </div>

        {saveMessage && (
          <Alert
            className={
              saveMessage.includes("Error")
                ? "border-red-200"
                : "border-green-200"
            }
          >
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>
              Main banner area of the {slug} page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.hero?.title || ""}
                onChange={(e) => updateFormField("hero.title", e.target.value)}
                placeholder="Page Title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.hero?.subtitle || ""}
                onChange={(e) =>
                  updateFormField("hero.subtitle", e.target.value)
                }
                placeholder="Page Subtitle"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.hero?.description || ""}
                onChange={(e) =>
                  updateFormField("hero.description", e.target.value)
                }
                placeholder="Page description..."
                rows={3}
              />
            </div>
            <ImageUpload
              label="Background Image"
              currentImage={formData.hero?.backgroundImage}
              onImageChange={(url) =>
                updateFormField("hero.backgroundImage", url)
              }
              aspectRatio="aspect-[21/9]"
            />
          </CardContent>
        </Card>

        {/* Additional Content Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
            <CardDescription>
              Additional content sections for this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Main Content</label>
              <Textarea
                value={formData.content || ""}
                onChange={(e) => updateFormField("content", e.target.value)}
                placeholder="Main page content..."
                rows={6}
              />
            </div>

            {/* Services specific fields */}
            {slug === "services" && (
              <>
                <div>
                  <label className="text-sm font-medium">Service 1 Title</label>
                  <Input
                    value={formData.service1?.title || ""}
                    onChange={(e) =>
                      updateFormField("service1.title", e.target.value)
                    }
                    placeholder="Service 1 Title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Service 1 Description
                  </label>
                  <Textarea
                    value={formData.service1?.description || ""}
                    onChange={(e) =>
                      updateFormField("service1.description", e.target.value)
                    }
                    placeholder="Service 1 description..."
                    rows={3}
                  />
                </div>
                <ImageUpload
                  label="Service 1 Image"
                  currentImage={formData.service1?.image}
                  onImageChange={(url) =>
                    updateFormField("service1.image", url)
                  }
                  aspectRatio="aspect-video"
                />
              </>
            )}

            {/* Contact specific fields */}
            {slug === "contact" && (
              <>
                <div>
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input
                    value={formData.email || ""}
                    onChange={(e) => updateFormField("email", e.target.value)}
                    placeholder="hello@awakenherpower.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    value={formData.phone || ""}
                    onChange={(e) => updateFormField("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Textarea
                    value={formData.address || ""}
                    onChange={(e) => updateFormField("address", e.target.value)}
                    placeholder="Your business address..."
                    rows={2}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end pb-8">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>Save All Changes</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
