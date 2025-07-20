import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Analytics from "./components/Analytics";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

// Lazy load page components for code splitting
const NewHome = lazy(() => import("./pages/NewHome"));
const DynamicAbout = lazy(() => import("./pages/DynamicAbout"));
const DynamicServices = lazy(() => import("./pages/DynamicServices"));
const DynamicContact = lazy(() => import("./pages/DynamicContact"));
const DynamicTransform = lazy(() => import("./pages/DynamicTransform"));

// Lazy load admin components
const AdminHome = lazy(() =>
  import("./pages/admin/AdminHome").then((module) => ({
    default: module.AdminHome,
  })),
);
const AdminAbout = lazy(() =>
  import("./pages/admin/AdminAbout").then((module) => ({
    default: module.AdminAbout,
  })),
);
const AdminServices = lazy(() =>
  import("./pages/admin/AdminServices").then((module) => ({
    default: module.AdminServices,
  })),
);
const AdminContact = lazy(() =>
  import("./pages/admin/AdminContact").then((module) => ({
    default: module.AdminContact,
  })),
);
const AdminTransform = lazy(() =>
  import("./pages/admin/AdminTransform").then((module) => ({
    default: module.AdminTransform,
  })),
);
const AdminPageEditor = lazy(() =>
  import("./pages/admin/AdminPageEditor").then((module) => ({
    default: module.AdminPageEditor,
  })),
);
const AdminSEO = lazy(() =>
  import("./pages/admin/AdminSEO").then((module) => ({
    default: module.AdminSEO,
  })),
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Analytics
            trackingId={import.meta.env.VITE_GA_TRACKING_ID}
            enableInDevelopment={false}
          />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <Suspense fallback={<LoadingSpinner />}>
                      <NewHome />
                    </Suspense>
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/about"
                element={
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <Suspense fallback={<LoadingSpinner />}>
                      <DynamicAbout />
                    </Suspense>
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/services"
                element={
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <Suspense fallback={<LoadingSpinner />}>
                      <DynamicServices />
                    </Suspense>
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/contact"
                element={
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <Suspense fallback={<LoadingSpinner />}>
                      <DynamicContact />
                    </Suspense>
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/transform"
                element={
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <Suspense fallback={<LoadingSpinner />}>
                      <DynamicTransform />
                    </Suspense>
                    <Footer />
                  </div>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/home"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminHome />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/about"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminAbout />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminServices />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contact"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminContact />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/transform"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminTransform />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/seo"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminSEO />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
