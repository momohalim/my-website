import { isSupabaseReady } from "../lib/supabase";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertTriangle, Settings } from "lucide-react";

export function ConfigurationBanner() {
  if (isSupabaseReady) {
    return null;
  }

  return (
    <Alert className="bg-yellow-50 border-yellow-200 mb-4">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <strong>Demo Mode:</strong> Supabase is not configured. The website is
        running with default content. To enable the admin panel and dynamic
        content management, please follow the setup instructions in{" "}
        <code className="bg-yellow-100 px-1 rounded">supabase-setup.md</code>.
      </AlertDescription>
    </Alert>
  );
}
