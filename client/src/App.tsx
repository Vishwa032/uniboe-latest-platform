import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Housing from "@/pages/Housing";
import ListingDetails from "@/pages/ListingDetails";
import Auth from "@/pages/Auth";
import HostDashboard from "@/pages/HostDashboard";
import Community from "@/pages/Community";
import Messages from "@/pages/Messages";
import Olive from "@/pages/Olive";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />

      {/* Protected routes - require authentication */}
      <Route path="/housing">
        <ProtectedRoute>
          <Housing />
        </ProtectedRoute>
      </Route>

      <Route path="/olive">
        <ProtectedRoute>
          <Olive />
        </ProtectedRoute>
      </Route>

      <Route path="/community">
        <ProtectedRoute>
          <Community />
        </ProtectedRoute>
      </Route>

      <Route path="/messages">
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      </Route>

      <Route path="/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>

      <Route path="/profile/edit">
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      </Route>

      <Route path="/listing/:id">
        <ProtectedRoute>
          <ListingDetails />
        </ProtectedRoute>
      </Route>

      <Route path="/host">
        <ProtectedRoute>
          <HostDashboard />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
