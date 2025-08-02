import '@fontsource/poppins'; // Defaults to weight 400
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Hero from './pages/user/Hero';
import TemplateSelection from './pages/user/TemplateSelection';
import Pricing from './pages/user/Pricing';
import Login from './pages/user/auth/Login';
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/user/ForgotPassword';
import Admin from './pages/admin/Admin';
import SignupPage from './pages/user/auth/SignupPage';
import VerifyOTPPage from './pages/user/auth/VerifyOtpPage';
import ProfilePage from './pages/user/onboarding/ProfilePage';
import LinksPage from './pages/user/onboarding/LinksPage';
import TemplatePage from './pages/user/onboarding/TemplatePage';
import PricingPage from './pages/user/onboarding/PricingPage';
import SlugPage from './pages/user/onboarding/SlugPage';
import PaymentSuccessPage from './pages/user/onboarding/PaymentSuccessPage';
import PaymentCancelPage from './pages/user/onboarding/PaymentCancelPage';
import GoalPage from './pages/user/onboarding/GoalPage';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/user/onboarding/CategoryPage';
import UserProfile from './pages/UserProfile';
import { Toaster } from 'react-hot-toast';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import WebLinqoLanding from './pages/user/LandingPage';

function App() {
  return (
    <>
    <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WebLinqoLanding />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyOTPPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path="/onboarding/slug" element={
          <ProtectedRoute>
            <SlugPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/goal" element={
          <ProtectedRoute>
            <GoalPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/category" element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/pricing" element={
          <ProtectedRoute>
            <PricingPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/template" element={
          <ProtectedRoute>
            <TemplatePage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/links" element={
          <ProtectedRoute>
            <LinksPage />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/u/:slug" element={<UserProfile />} />

        {/* Payment Routes */}
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/cancel" element={<PaymentCancelPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
