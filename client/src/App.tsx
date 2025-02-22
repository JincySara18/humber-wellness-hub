import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import ChatPage from "@/pages/chat-page";
import AppointmentsPage from "@/pages/appointments-page";
import ResourcesPage from "@/pages/resources-page";
import ResumeGuidePage from "@/pages/resources/resume-guide";
import Navbar from "@/components/navbar";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/" component={HomePage} />
        <ProtectedRoute path="/chat" component={ChatPage} />
        <ProtectedRoute path="/appointments" component={AppointmentsPage} />
        <ProtectedRoute path="/resources" component={ResourcesPage} />
        <ProtectedRoute path="/resources/resume-guide" component={ResumeGuidePage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;