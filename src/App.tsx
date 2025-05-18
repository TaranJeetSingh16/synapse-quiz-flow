
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./contexts/QuizContext";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HowItWorks from "./pages/HowItWorks";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateQuiz from "./pages/CreateQuiz";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <QuizProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/create-quiz" element={
                <ProtectedRoute>
                  <CreateQuiz />
                </ProtectedRoute>
              } />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
