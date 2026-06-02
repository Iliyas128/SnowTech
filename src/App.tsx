import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
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
import { SiteChrome } from "./components/SiteChrome";
import { LawAiLayout } from "./lawAi/LawAiLayout";
import LawAiIndex from "./lawAi/pages/LawAiIndex";
import LawAiChatPage from "./lawAi/pages/LawAiChatPage";
import LawAiCommentsPage from "./lawAi/pages/LawAiCommentsPage";

// Create a stable query client instance
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <BrowserRouter>
            <SiteChrome />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lawAi" element={<LawAiLayout />}>
                <Route index element={<LawAiIndex />} />
                <Route path="chat" element={<LawAiChatPage />} />
                <Route path="comments" element={<LawAiCommentsPage />} />
              </Route>
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
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
