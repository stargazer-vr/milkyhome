import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InstructorSearchResults from './pages/instructor-search-results';
import AdminPanel from './pages/admin-panel';
import LandingPage from './pages/landing-page';
import InstructorProfileDetails from './pages/instructor-profile-details';
import MessagingInterface from './pages/messaging-interface';
import BookingRequestFlow from './pages/booking-request-flow';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/instructor-search-results" element={<InstructorSearchResults />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/instructor-profile-details" element={<InstructorProfileDetails />} />
        <Route path="/messaging-interface" element={<MessagingInterface />} />
        <Route path="/booking-request-flow" element={<BookingRequestFlow />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
