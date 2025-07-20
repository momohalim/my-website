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
import { Save, Loader2, ExternalLink } from "lucide-react";

export function AdminContact() {
  const { content, loading } = useContent("contact");
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
      await updateContent("contact", formData);
      setSaveMessage("Contact page updated successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error updating contact page. Please try again.");
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
            <h1 className="text-3xl font-bold tracking-tight">Contact Page</h1>
            <p className="text-muted-foreground">
              Manage your contact page content and connection options
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

        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Section</CardTitle>
            <CardDescription>
              Opening message that connects with visitors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Heading</label>
              <Input
                value={formData.welcome?.heading || ""}
                onChange={(e) =>
                  updateFormField("welcome.heading", e.target.value)
                }
                placeholder="You're not alone."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Welcome Text</label>
              <Textarea
                value={formData.welcome?.text || ""}
                onChange={(e) =>
                  updateFormField("welcome.text", e.target.value)
                }
                placeholder="If you're feeling called to shift, expand, or simply be heard..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Form Section</CardTitle>
            <CardDescription>
              Customize all form elements and labels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Form Title</label>
              <Input
                value={formData.form?.title || ""}
                onChange={(e) => updateFormField("form.title", e.target.value)}
                placeholder="What's on your mind?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name Field Label</label>
                <Input
                  value={formData.form?.nameLabel || ""}
                  onChange={(e) =>
                    updateFormField("form.nameLabel", e.target.value)
                  }
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Name Placeholder</label>
                <Input
                  value={formData.form?.namePlaceholder || ""}
                  onChange={(e) =>
                    updateFormField("form.namePlaceholder", e.target.value)
                  }
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email Field Label</label>
                <Input
                  value={formData.form?.emailLabel || ""}
                  onChange={(e) =>
                    updateFormField("form.emailLabel", e.target.value)
                  }
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email Placeholder</label>
                <Input
                  value={formData.form?.emailPlaceholder || ""}
                  onChange={(e) =>
                    updateFormField("form.emailPlaceholder", e.target.value)
                  }
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Message Field Label
                </label>
                <Input
                  value={formData.form?.messageLabel || ""}
                  onChange={(e) =>
                    updateFormField("form.messageLabel", e.target.value)
                  }
                  placeholder="Your Message"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Message Placeholder
                </label>
                <Input
                  value={formData.form?.messagePlaceholder || ""}
                  onChange={(e) =>
                    updateFormField("form.messagePlaceholder", e.target.value)
                  }
                  placeholder="Share what's on your heart..."
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Submit Button Text</label>
              <Input
                value={formData.form?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("form.buttonText", e.target.value)
                }
                placeholder="Send Message"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Response Note</label>
              <Input
                value={formData.form?.responseNote || ""}
                onChange={(e) =>
                  updateFormField("form.responseNote", e.target.value)
                }
                placeholder="I personally review all messages and will respond within 48 hours."
              />
            </div>
          </CardContent>
        </Card>

        {/* Calendly Booking Section */}
        <Card>
          <CardHeader>
            <CardTitle>Calendly Booking Section</CardTitle>
            <CardDescription>
              Direct booking integration with live preview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.booking?.title || ""}
                onChange={(e) =>
                  updateFormField("booking.title", e.target.value)
                }
                placeholder="Prefer to speak directly?"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.booking?.description || ""}
                onChange={(e) =>
                  updateFormField("booking.description", e.target.value)
                }
                placeholder="Book a 30-minute clarity session."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Calendly URL</label>
              <Input
                value={formData.booking?.calendlyUrl || ""}
                onChange={(e) =>
                  updateFormField("booking.calendlyUrl", e.target.value)
                }
                placeholder="https://calendly.com/tashaniyi/30min?month=2025-07"
              />
            </div>

            <div>
              <label className="text-sm font-medium">New Tab Button Text</label>
              <Input
                value={formData.booking?.newTabButtonText || ""}
                onChange={(e) =>
                  updateFormField("booking.newTabButtonText", e.target.value)
                }
                placeholder="Open in new tab"
              />
            </div>

            {/* Live Preview */}
            {formData.booking?.calendlyUrl && (
              <div className="mt-4">
                <label className="text-sm font-medium">Live Preview</label>
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">
                      Calendly Integration Preview
                    </span>
                  </div>
                  <a
                    href={formData.booking.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {formData.booking.calendlyUrl}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Not Ready Yet Section */}
        <Card>
          <CardHeader>
            <CardTitle>"Not Ready Yet?" Section</CardTitle>
            <CardDescription>
              Alternative option with PDF download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.notReady?.title || ""}
                onChange={(e) =>
                  updateFormField("notReady.title", e.target.value)
                }
                placeholder="Not ready to talk yet?"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Main Text</label>
              <Textarea
                value={formData.notReady?.text || ""}
                onChange={(e) =>
                  updateFormField("notReady.text", e.target.value)
                }
                placeholder="That's perfectly okay. Sometimes we just need a moment to breathe and reflect."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Download Text</label>
              <Input
                value={formData.notReady?.downloadText || ""}
                onChange={(e) =>
                  updateFormField("notReady.downloadText", e.target.value)
                }
                placeholder="Download this free self-reflection journal to begin privately."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.notReady?.buttonText || ""}
                onChange={(e) =>
                  updateFormField("notReady.buttonText", e.target.value)
                }
                placeholder="Download Free Journal"
              />
            </div>

            <ImageUpload
              label="Clarity Journal PDF"
              currentImage={formData.notReady?.pdfUrl || ""}
              onImageUpdate={(url) => updateFormField("notReady.pdfUrl", url)}
              acceptedTypes=".pdf"
            />
          </CardContent>
        </Card>

        {/* Social Contact Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Social Contact Info Section</CardTitle>
            <CardDescription>
              Social media and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={formData.social?.title || ""}
                onChange={(e) =>
                  updateFormField("social.title", e.target.value)
                }
                placeholder="Other ways to connect"
              />
            </div>

            {/* Email */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Email Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email Title</label>
                  <Input
                    value={formData.social?.email?.title || ""}
                    onChange={(e) =>
                      updateFormField("social.email.title", e.target.value)
                    }
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    value={formData.social?.email?.value || ""}
                    onChange={(e) =>
                      updateFormField("social.email.value", e.target.value)
                    }
                    placeholder="hello@awakenherpower.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  Email URL (for mailto link)
                </label>
                <Input
                  value={formData.social?.email?.url || ""}
                  onChange={(e) =>
                    updateFormField("social.email.url", e.target.value)
                  }
                  placeholder="mailto:hello@awakenherpower.com"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">LinkedIn</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">LinkedIn Title</label>
                  <Input
                    value={formData.social?.linkedin?.title || ""}
                    onChange={(e) =>
                      updateFormField("social.linkedin.title", e.target.value)
                    }
                    placeholder="LinkedIn"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    value={formData.social?.linkedin?.url || ""}
                    onChange={(e) =>
                      updateFormField("social.linkedin.url", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/awakenherpower"
                  />
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Instagram</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Instagram Title</label>
                  <Input
                    value={formData.social?.instagram?.title || ""}
                    onChange={(e) =>
                      updateFormField("social.instagram.title", e.target.value)
                    }
                    placeholder="Instagram"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Instagram URL</label>
                  <Input
                    value={formData.social?.instagram?.url || ""}
                    onChange={(e) =>
                      updateFormField("social.instagram.url", e.target.value)
                    }
                    placeholder="https://instagram.com/awakenherpower"
                  />
                </div>
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
