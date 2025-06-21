
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/strategic-docs" element={<StrategicDocs />} />
          <Route path="/lead-management" element={<LeadManagement />} />
          <Route path="/network-map" element={<NetworkMap />} />
          <Route path="/team-timeline" element={<TeamTimeline />} />
          <Route path="/kanban-board" element={<KanbanBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
