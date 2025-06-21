
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Determine if we're running in production mode
const isProduction = import.meta.env.MODE === 'production';
// Use HashRouter for GitHub Pages which is more reliable for SPA on GitHub Pages
// or use BrowserRouter with the correct base URL in development
const Router = isProduction ? HashRouter : BrowserRouter;
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import StrategicDocs from "./pages/StrategicDocs";
import LeadManagement from "./pages/LeadManagement";
import NetworkMap from "./pages/NetworkMap";
import TeamTimeline from "./pages/TeamTimeline";
import KanbanBoard from "./pages/KanbanBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute adminOnly>
                  <SignUp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/strategic-docs" 
              element={
                <ProtectedRoute>
                  <StrategicDocs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/lead-management" 
              element={
                <ProtectedRoute>
                  <LeadManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/network-map" 
              element={
                <ProtectedRoute>
                  <NetworkMap />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/team-timeline" 
              element={
                <ProtectedRoute>
                  <TeamTimeline />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/kanban-board" 
              element={
                <ProtectedRoute>
                  <KanbanBoard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
