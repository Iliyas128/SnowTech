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
import Snowfall from "react-snowfall";

// Create a stable query client instance
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Snowfall
            snowflakeCount={120}
            radius={[0.6, 2.2]}
            speed={[0.5, 1.8]}
            wind={[-0.3, 0.3]}
            style={{
              position: "fixed",
              width: "100%",
              height: "100vh",
              zIndex: 50,
              pointerEvents: "none",
              left: 0,
              top: 0,
            }}
          />
          
          <BrowserRouter>
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
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
