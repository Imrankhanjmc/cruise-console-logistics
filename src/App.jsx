import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import GlobalNetworkPage from "./pages/GlobalNetworkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedRouteForQuote, setSelectedRouteForQuote] = useState(null);

  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("cruise-console-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("cruise-console-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const handleOpenQuote = (prefillRoute = null) => {
    setSelectedRouteForQuote(prefillRoute);
    setIsQuoteOpen(true);
  };

  const handleNavigate = (page, hashOrUnused, id) => {
    const serviceId =
      id ??
      ((page === "service-detail" || page === "service-details") &&
      typeof hashOrUnused === "string"
        ? hashOrUnused
        : null);

    const paths = {
      home: "/",
      services: "/services",
      "service-detail": serviceId ? `/services/${serviceId}` : "/services",
      "service-details": serviceId ? `/services/${serviceId}` : "/services",
      "global-network": "/global-network",
      about: "/about",
      contact: "/contact",
    };

    const path = paths[page];

    if (!path) {
      console.warn(`Unknown navigation target: ${page}`);
      return;
    }

    const hash =
      page === "services" && typeof hashOrUnused === "string"
        ? hashOrUnused
        : "";

    navigate(hash ? `${path}#${encodeURIComponent(hash)}` : path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-(--asphalt) text-(--off) flex flex-col font-sans">
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 page-main">
        <Routes>
          <Route path="/" element={
              <HomePage onOpenQuote={handleOpenQuote} onNavigate={handleNavigate}/>
          }/>

          <Route path="/services" element={
              <ServicesPage onOpenQuote={handleOpenQuote} onNavigate={handleNavigate} initialHash={location.hash.slice(1)} />
          }/>

          <Route path="/services/:id" element={
              <ServiceDetailPage onOpenQuote={handleOpenQuote} onNavigate={handleNavigate}/>
          }/>

          <Route path="/global-network" element={
              <GlobalNetworkPage onOpenQuote={handleOpenQuote} onNavigate={handleNavigate}/>
          }/>

          <Route path="/about" element={
              <AboutPage onOpenQuote={handleOpenQuote} onNavigate={handleNavigate}/>
          }/>

          <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
        </Routes>
      </main>

      <Footer onNavigate={handleNavigate} />

      <a
        href="https://wa.me/971544323473"
        className="wa-float"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.68.75 5.19 2.05 7.33L2 30l6.85-2c2.06 1.13 4.47 1.77 7.15 1.77 7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.6c-2.34 0-4.52-.63-6.4-1.74l-.46-.27-4.07 1.19 1.15-3.97-.3-.48C4.7 20.44 4.1 18.29 4.1 16c0-6.56 5.34-11.9 11.9-11.9S27.9 9.44 27.9 16s-5.34 11.6-11.9 11.6zm6.53-8.68c-.36-.18-2.12-1.05-2.45-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.96-1.8-2.14-2.01-2.5-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.24.36 2.54 3.88 6.15 5.44.86.37 1.53.59 2.06.76.87.28 1.66.24 2.28.15.7-.1 2.12-.87 2.42-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
        </svg>
      </a>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefilledRoute={selectedRouteForQuote}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}