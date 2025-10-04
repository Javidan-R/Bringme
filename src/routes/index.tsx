import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import { Blog, Dashboard, ForgotPassword, Home, Login, OnboardingPage, Settings, SignUp, Support } from "../pages";
import DashboardLayout from "../components/layout/DashboardLayout";
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      
      <Route
        path="/home"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute redirectIfAuthenticated>
            <Login />
          </PublicRoute>
        }
      />
      
      <Route
        path="/signup"
        element={
          <PublicRoute redirectIfAuthenticated>
            <SignUp />
          </PublicRoute>
        }
      />
      
      <Route
        path="/forgot-password"
        element={
          <PublicRoute redirectIfAuthenticated>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Onboarding */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} /> 
        <Route path="support" element={<Support />} />
        <Route path="blog" element={<Blog />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <>
            <SignedIn>
              <Navigate to="/dashboard" replace />
            </SignedIn>
            <SignedOut>
              <Navigate to="/login" replace />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};
