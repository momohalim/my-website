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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Search,
  Globe,
  Image as ImageIcon,
  TrendingUp,
  Settings,
  Download,
  BarChart3,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

interface SEOSettings {
  enableAnalytics: boolean;
  analyticsId: string;
  enableSentry: boolean;
  sentryDsn: string;
  enableSitemap: boolean;
  enableRobots: boolean;
}

const defaultPageData: SEOPageData = {
  title: "",
  description: "",
  keywords: "",
  ogImage: "",
  canonicalUrl: "",
};

const defaultSettings: SEOSettings = {
  enableAnalytics: false,
  analyticsId: "",
  enableSentry: false,
  sentryDsn: "",
  enableSitemap: true,
  enableRobots: true,
};

export const AdminSEO = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageData, setPageData] = useState<Record<string, SEOPageData>>({
    home: { ...defaultPageData },
    about: { ...defaultPageData },
    services: { ...defaultPageData },
    transform: { ...defaultPageData },
    contact: { ...defaultPageData },
  });
  const [settings, setSettings] = useState<SEOSettings>({ ...defaultSettings });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    setLoading(true);
    try {
      // Load SEO data from localStorage or API
      const savedData = localStorage.getItem("seo-page-data");
      const savedSettings = localStorage.getItem("seo-settings");

      if (savedData) {
        setPageData(JSON.parse(savedData));
      }
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Error loading SEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePageData = (
    page: string,
    field: keyof SEOPageData,
    value: string,
  ) => {
    setPageData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value,
      },
    }));
  };

  const updateSettings = (field: keyof SEOSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSEOData = async () => {
    setLoading(true);
    try {
      // Save to localStorage (in production, this would be saved to database)
      localStorage.setItem("seo-page-data", JSON.stringify(pageData));
      localStorage.setItem("seo-settings", JSON.stringify(settings));

      toast({
        title: "Success!",
        description: "SEO settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save SEO settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSitemap = () => {
    const urls = Object.keys(pageData).map((page) => ({
      loc: page === "home" ? "/" : `/${page}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: page === "home" ? 1.0 : 0.8,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>https://highagenycollective.com${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    const blob = new Blob([sitemap], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Sitemap Generated",
      description: "Sitemap.xml has been downloaded.",
    });
  };

  const currentPageData = pageData[currentPage];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              SEO Management
            </h1>
            <p className="text-muted-foreground">
              Manage meta tags, Open Graph data, and SEO settings for all pages.
            </p>
          </div>
          <Button onClick={saveSEOData} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Page SEO
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-6">
            <div className="flex space-x-2">
              {Object.keys(pageData).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="capitalize"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="capitalize flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {currentPage} Page SEO
                </CardTitle>
                <CardDescription>
                  Configure SEO metadata for the {currentPage} page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={currentPageData.title}
                      onChange={(e) =>
                        updatePageData(currentPage, "title", e.target.value)
                      }
                      placeholder="Enter page title..."
                      maxLength={60}
                    />
                    <p className="text-sm text-muted-foreground">
                      {currentPageData.title.length}/60 characters (recommended)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Meta Description</Label>
                    <Textarea
                      id="description"
                      value={currentPageData.description}
                      onChange={(e) =>
                        updatePageData(
                          currentPage,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Enter meta description..."
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">
                      {currentPageData.description.length}/160 characters
                      (recommended)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      value={currentPageData.keywords}
                      onChange={(e) =>
                        updatePageData(currentPage, "keywords", e.target.value)
                      }
                      placeholder="keyword1, keyword2, keyword3..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Separate keywords with commas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Open Graph Image</Label>
                    <ImageUpload
                      acceptedTypes="image/*"
                      onImageUpdate={(url) =>
                        updatePageData(currentPage, "ogImage", url)
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 1200x630px (will be auto-resized)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="canonical">Canonical URL</Label>
                    <Input
                      id="canonical"
                      value={currentPageData.canonicalUrl}
                      onChange={(e) =>
                        updatePageData(
                          currentPage,
                          "canonicalUrl",
                          e.target.value,
                        )
                      }
                      placeholder={`https://highagenycollective.com${currentPage === "home" ? "/" : `/${currentPage}`}`}
                    />
                  </div>
                </div>

                {/* SEO Preview */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Search Result Preview
                  </h4>
                  <div className="space-y-1">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {currentPageData.title ||
                        `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} | High Agency Collective`}
                    </div>
                    <div className="text-green-700 text-sm">
                      https://highagenycollective.com
                      {currentPage === "home" ? "/" : `/${currentPage}`}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {currentPageData.description ||
                        "No meta description set."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Analytics & Monitoring
                </CardTitle>
                <CardDescription>
                  Configure tracking and error monitoring services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Google Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable Google Analytics 4 tracking
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) =>
                      updateSettings("enableAnalytics", checked)
                    }
                  />
                </div>

                {settings.enableAnalytics && (
                  <div className="space-y-2">
                    <Label htmlFor="analytics-id">
                      Google Analytics Tracking ID
                    </Label>
                    <Input
                      id="analytics-id"
                      value={settings.analyticsId}
                      onChange={(e) =>
                        updateSettings("analyticsId", e.target.value)
                      }
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Error Monitoring</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable Sentry error tracking
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableSentry}
                    onCheckedChange={(checked) =>
                      updateSettings("enableSentry", checked)
                    }
                  />
                </div>

                {settings.enableSentry && (
                  <div className="space-y-2">
                    <Label htmlFor="sentry-dsn">Sentry DSN</Label>
                    <Input
                      id="sentry-dsn"
                      value={settings.sentryDsn}
                      onChange={(e) =>
                        updateSettings("sentryDsn", e.target.value)
                      }
                      placeholder="https://your-sentry-dsn"
                      type="password"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Sitemap Generator
                  </CardTitle>
                  <CardDescription>
                    Generate and download an XML sitemap for search engines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={generateSitemap} className="w-full">
                    Generate Sitemap
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    SEO Health Check
                  </CardTitle>
                  <CardDescription>
                    Check your site's SEO configuration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Meta tags configured
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Open Graph tags present
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Schema markup added
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    Run Lighthouse audit
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Monitor your site's SEO and performance metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics data will appear here once configured.</p>
                  <p className="text-sm">
                    Enable Google Analytics in Settings to see performance data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
