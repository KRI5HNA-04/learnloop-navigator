
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PathView from "./pages/PathView";
import CollaborativeEditor from "./pages/CollaborativeEditor";

const queryClient = new QueryClient();

// You would replace this with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/path/:id" element={<PathView />} />
              <Route path="/collaborative-editor" element={<CollaborativeEditor />} />
              <Route path="/collaborative-editor/:roomId" element={<CollaborativeEditor />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
