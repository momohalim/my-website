import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicHome from "./pages/DynamicHome";
import DynamicAbout from "./pages/DynamicAbout";
import DynamicServices from "./pages/DynamicServices";
import DynamicContact from "./pages/DynamicContact";
import DynamicTransform from "./pages/DynamicTransform";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminHome } from "./pages/admin/AdminHome";
import { AdminAbout } from "./pages/admin/AdminAbout";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminContact } from "./pages/admin/AdminContact";
import { AdminTransform } from "./pages/admin/AdminTransform";
import { AdminPageEditor } from "./pages/admin/AdminPageEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <DynamicHome />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <DynamicAbout />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/services"
              element={
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <DynamicServices />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <DynamicContact />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/transform"
              element={
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <DynamicTransform />
                  <Footer />
                </div>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/home"
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <AdminAbout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute>
                  <AdminServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact"
              element={
                <ProtectedRoute>
                  <AdminContact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transform"
              element={
                <ProtectedRoute>
                  <AdminTransform />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
