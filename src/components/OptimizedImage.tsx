import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  placeholder = "empty",
  blurDataURL,
  sizes,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate WebP and fallback sources
  const getOptimizedSrc = (
    originalSrc: string,
    format: "webp" | "jpg" = "webp",
  ) => {
    // If it's already a WebP or external URL, return as-is
    if (originalSrc.includes(".webp") || originalSrc.startsWith("http")) {
      return originalSrc;
    }

    // Convert to WebP version
    if (format === "webp") {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    }

    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  // Generate blur placeholder
  const blurPlaceholder =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGNEVGIi8+Cjwvc3ZnPgo=";

  // Aspect ratio container styles
  const aspectRatioStyle =
    width && height
      ? {
          aspectRatio: `${width} / ${height}`,
          width: "100%",
          height: "auto",
        }
      : {};

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        !isLoaded && placeholder === "blur" && "animate-pulse",
        className,
      )}
      style={aspectRatioStyle}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder === "blur" && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{ backgroundImage: `url("${blurPlaceholder}")` }}
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && !isError && placeholder === "empty" && (
        <div className="absolute inset-0 bg-[#F8F4EF] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#B47A5A] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Main image with picture element for WebP support */}
      {(isInView || priority) && !isError && (
        <picture>
          <source
            srcSet={getOptimizedSrc(src, "webp")}
            type="image/webp"
            sizes={sizes}
          />
          <img
            ref={imgRef}
            src={getOptimizedSrc(src, "jpg")}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              "w-full h-full object-cover",
            )}
            sizes={sizes}
          />
        </picture>
      )}

      {/* Error fallback */}
      {isError && (
        <div className="absolute inset-0 bg-[#F8F4EF] flex items-center justify-center">
          <div className="text-center text-[#6A6A6A]">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
