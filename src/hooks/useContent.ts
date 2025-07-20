import { useState, useEffect } from "react";
import { supabase, PageContent, isSupabaseReady } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { getDefaultContent } from "../data/defaultContent";

export function useContent(slug: string) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();

    // Set up real-time subscription
    const channel = supabase
      .channel("page-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pages",
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          if (payload.new && typeof payload.new === "object") {
            setContent((payload.new as PageContent).content);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  const fetchContent = async () => {
    try {
      setLoading(true);

      // If Supabase is not configured, use default content
      if (!isSupabaseReady) {
        console.warn("Supabase not configured, using default content");
        setContent(getDefaultContent(slug));
        setError(null);
        return;
      }

      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", slug)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Supabase error:", error);
        throw new Error(`Database error: ${error.message}`);
      }

      setContent(data?.content || getDefaultContent(slug));
      setError(null);
    } catch (err) {
      console.error("Error fetching content:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null
            ? JSON.stringify(err)
            : "Unknown error occurred";
      setError(errorMessage);
      setContent(getDefaultContent(slug));
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, refetch: fetchContent };
}

export function useUpdateContent() {
  const { isAdmin } = useAuth();
  const [saving, setSaving] = useState(false);

  const updateContent = async (slug: string, content: any) => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    if (!isSupabaseReady) {
      throw new Error(
        "Supabase is not properly configured. Please check your environment variables.",
      );
    }

    try {
      setSaving(true);
      const { error } = await supabase.from("pages").upsert({
        slug,
        content,
      });

      if (error) {
        console.error("Supabase upsert error:", error);
        throw new Error(`Failed to save content: ${error.message}`);
      }

      return { success: true };
    } catch (err) {
      console.error("Error updating content:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null
            ? JSON.stringify(err)
            : "Unknown error occurred while saving";
      throw new Error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return { updateContent, saving };
}

export function useImageUpload() {
  const { isAdmin } = useAuth();
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, path?: string) => {
    if (!isAdmin) {
      throw new Error("Unauthorized");
    }

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = path || `${Math.random()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      return { url: data.publicUrl, path: filePath };
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (path: string) => {
    if (!isAdmin) {
      throw new Error("Unauthorized");
    }

    try {
      const { error } = await supabase.storage.from("images").remove([path]);

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting image:", err);
      throw err;
    }
  };

  return { uploadImage, deleteImage, uploading };
}
