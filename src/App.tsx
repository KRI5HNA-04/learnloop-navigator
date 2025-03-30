import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Leaderboard from "./pages/Leaderboard";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import React from "./pages/React";
import Python from "./pages/python";
import PathView from "./pages/PathView";
import CollaborativeEditor from "./pages/CollaborativeEditor";
import Path from "./pages/Path";
import SignUp from "./pages/Signup";
import Javascript from "./pages/Javascript";

const queryClient = new QueryClient();

// You would replace this with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID =
  "637146409187-vk766b7lv1304qabb90be87r010u4oru.apps.googleusercontent.com";

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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/react" element={<React />} />
              <Route path="/python" element={<Python />} />
              <Route path="/javascript" element={<Javascript />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/path" element={<Path />} />
              <Route path="/path/:id" element={<PathView />} />
              <Route
                path="/collaborative-editor"
                element={<CollaborativeEditor />}
              />
              <Route
                path="/collaborative-editor/:roomId"
                element={<CollaborativeEditor />}
              />
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
