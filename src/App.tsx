import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Cases from "./pages/Cases";
import CasesSlider from "./pages/CasesSlider";
import About from "./pages/About";
import AboutNurtore from "./pages/AboutNurtore";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ParticlesBackground from "./components/ParticlesBackground";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const PRODUCT_TOAST_SESSION_KEY = 'snowtech-law-product-toast-shown-v2';

// Create a stable query client instance
const queryClient = new QueryClient();

const ProductToastTrigger = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (window.sessionStorage.getItem(PRODUCT_TOAST_SESSION_KEY)) return;

      toast({
        title: t('services.productToastTitle'),
        description: (
          <a
            href="https://law-front1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-medium"
          >
            {t('services.productToastDescription')}
          </a>
        ),
        // Radix Toast: duration=0 closes immediately; keep it visible.
        duration: 600_000,
      });

      window.sessionStorage.setItem(PRODUCT_TOAST_SESSION_KEY, '1');
    }, 15000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast, t]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ProductToastTrigger />
          <Toaster />
          <Sonner />
          
          <ParticlesBackground />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases-slider" element={<CasesSlider />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/nurtore" element={<AboutNurtore />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingWhatsApp />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
