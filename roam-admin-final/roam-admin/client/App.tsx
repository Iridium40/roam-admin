import "./global.css";

// HMR error handling for development
if (import.meta.hot) {
  import.meta.hot.on("vite:error", (err) => {
    console.error("HMR Error:", err);
  });

  // Accept HMR updates for this module
  import.meta.hot.accept(() => {
    console.log("App module updated");
  });
}

// ResizeObserver error prevention
// This wraps the native ResizeObserver to prevent loop errors
if (typeof window !== "undefined" && window.ResizeObserver) {
  const OriginalResizeObserver = window.ResizeObserver;

  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
        window.requestAnimationFrame(() => {
          try {
            callback(entries, observer);
          } catch (error) {
            // Silently handle ResizeObserver errors
            if (!String(error).includes("ResizeObserver loop")) {
              throw error; // Re-throw non-ResizeObserver errors
            }
          }
        });
      };
      super(wrappedCallback);
    }
  };
}

// Additional console error suppression as fallback
const originalError = console.error;
console.error = (...args) => {
  const errorMessage = String(args[0] || "");
  if (
    errorMessage.includes("ResizeObserver loop") ||
    errorMessage.includes("undelivered notifications")
  ) {
    return; // Suppress ResizeObserver warnings
  }
  originalError.apply(console, args);
};

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { handleAuthError } from "@/lib/auth-error-handler";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCustomers from "./pages/AdminCustomers";
import AdminBusinesses from "./pages/AdminBusinesses";
import AdminProviders from "./pages/AdminProviders";
import AdminServices from "./pages/AdminServices";
import AdminBookings from "./pages/AdminBookings";
import AdminPromotions from "./pages/AdminPromotions";
import AdminReviews from "./pages/AdminReviews";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminReports from "./pages/AdminReports";
import AdminFinancial from "./pages/AdminFinancial";
import AdminSystemSettings from "./pages/AdminSystemSettings";
import AdminProfile from "./pages/AdminProfile";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

// Global error handling for authentication errors
window.addEventListener("unhandledrejection", async (event) => {
  const error = event.reason;
  if (
    error?.message?.includes("Invalid Refresh Token") ||
    error?.message?.includes("Refresh Token Not Found") ||
    error?.message?.includes("JWT expired")
  ) {
    console.log("Caught global auth error:", error);
    event.preventDefault(); // Prevent the error from being logged to console
    await handleAuthError(error);
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute>
                <AdminCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/businesses"
            element={
              <ProtectedRoute>
                <AdminBusinesses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/providers"
            element={
              <ProtectedRoute>
                <AdminProviders />
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
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/promotions"
            element={
              <ProtectedRoute>
                <AdminPromotions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <AdminReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute>
                <AdminAnnouncements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/financial"
            element={
              <ProtectedRoute>
                <AdminFinancial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/system-settings"
            element={
              <ProtectedRoute>
                <AdminSystemSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent multiple root creation during development hot reloading
const rootElement = document.getElementById("root")!;

// Improved HMR handling
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // Clean up on hot reload
    if ((rootElement as any)._reactRoot) {
      (rootElement as any)._reactRoot.unmount();
      delete (rootElement as any)._reactRoot;
    }
  });
}

let root = (rootElement as any)._reactRoot;

if (!root) {
  root = createRoot(rootElement);
  (rootElement as any)._reactRoot = root;
}

// Wrap render in try-catch for HMR errors
try {
  root.render(<App />);
} catch (error) {
  console.error("App render error:", error);
  // Fallback: create new root if render fails
  const newRoot = createRoot(rootElement);
  (rootElement as any)._reactRoot = newRoot;
  newRoot.render(<App />);
}
