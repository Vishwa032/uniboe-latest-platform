import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { api, endpoints, setAuthToken } from "@/lib/api";
import { Check, X } from "lucide-react";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user was redirected due to session expiration
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('session_expired') === 'true') {
      toast({
        title: "Session expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive",
      });
      // Clear the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });

  // Update password validation whenever password changes
  useEffect(() => {
    const password = formData.password;
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    });
  }, [formData.password]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "signup") {
      const newErrors = {
        firstName: !formData.firstName,
        lastName: !formData.lastName,
        email: !formData.email,
        password: !formData.password,
        confirmPassword: !formData.confirmPassword || formData.password !== formData.confirmPassword,
      };
      setErrors(newErrors);

      if (!Object.values(newErrors).some(error => error)) {
        setIsLoading(true);
        try {
          // Extract university domain from email
          const emailDomain = formData.email.split('@')[1];

          const response = await api.post(endpoints.auth.signup, {
            full_name: `${formData.firstName} ${formData.lastName}`,
            university_email: formData.email,
            university_domain: emailDomain,
            password: formData.password,
          });

          // Store the auth token
          if (response.access_token) {
            setAuthToken(response.access_token);
          }

          toast({
            title: "Account created!",
            description: "Welcome to Uniboe. Redirecting to housing...",
          });

          setTimeout(() => {
            setLocation("/housing");
          }, 1500);
        } catch (error: any) {
          toast({
            title: "Signup failed",
            description: error.message || "Could not create account. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      const newErrors = {
        firstName: false,
        lastName: false,
        email: !formData.email,
        password: !formData.password,
        confirmPassword: false,
      };
      setErrors(newErrors);

      if (!newErrors.email && !newErrors.password) {
        setIsLoading(true);
        try {
          const response = await api.post(endpoints.auth.login, {
            email: formData.email,
            password: formData.password,
          });

          // Store the auth token
          if (response.access_token) {
            setAuthToken(response.access_token);
          }

          toast({
            title: "Welcome back!",
            description: "Successfully logged in. Redirecting...",
          });

          setTimeout(() => {
            setLocation("/housing");
          }, 1500);
        } catch (error: any) {
          toast({
            title: "Login failed",
            description: error.message || "Invalid credentials. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-lg bg-white shadow-xl rounded-2xl border-border">
          <CardHeader className="text-center pb-4">
            <Link href="/">
              <div className="flex items-center justify-center gap-2 cursor-pointer mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">U</span>
                </div>
                <span className="font-heading text-3xl font-bold text-primary">Uniboe</span>
              </div>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-foreground">Welcome</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Sign in to your account or create a new one
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-8 bg-muted/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("login")}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all",
                  activeTab === "login"
                    ? "bg-white text-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all",
                  activeTab === "signup"
                    ? "bg-white text-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "signup" ? (
                <>
                  {/* Sign Up Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-bold text-foreground">
                        First Name
                      </Label>
                      <Tooltip open={errors.firstName}>
                        <TooltipTrigger asChild>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="John"
                            className={cn(
                              "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                              errors.firstName && "border-destructive"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                          First name is required
                        </TooltipContent>
                      </Tooltip>
                      <p className="text-xs text-muted-foreground">Your first name</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-bold text-foreground">
                        Last Name
                      </Label>
                      <Tooltip open={errors.lastName}>
                        <TooltipTrigger asChild>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Doe"
                            className={cn(
                              "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                              errors.lastName && "border-destructive"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                          Last name is required
                        </TooltipContent>
                      </Tooltip>
                      <p className="text-xs text-muted-foreground">Your last name</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-sm font-bold text-foreground">
                      University Email
                    </Label>
                    <Tooltip open={errors.email}>
                      <TooltipTrigger asChild>
                        <Input
                          id="signupEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="student@university.edu"
                          className={cn(
                            "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                            errors.email && "border-destructive"
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                        Valid university email is required
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xs text-muted-foreground">Use your official university email address</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-sm font-bold text-foreground">
                      Password
                    </Label>
                    <Tooltip open={errors.password}>
                      <TooltipTrigger asChild>
                        <Input
                          id="signupPassword"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="••••••••"
                          className={cn(
                            "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                            errors.password && "border-destructive"
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                        Password is required
                      </TooltipContent>
                    </Tooltip>

                    {/* Password requirements */}
                    <div className="space-y-1 mt-2">
                      <div className={cn(
                        "flex items-center gap-2 text-xs transition-colors",
                        passwordValidation.minLength ? "text-green-600" : "text-muted-foreground"
                      )}>
                        {passwordValidation.minLength ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        <span>At least 8 characters</span>
                      </div>

                      <div className={cn(
                        "flex items-center gap-2 text-xs transition-colors",
                        passwordValidation.hasUppercase ? "text-green-600" : "text-muted-foreground"
                      )}>
                        {passwordValidation.hasUppercase ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        <span>Contains uppercase letter</span>
                      </div>

                      <div className={cn(
                        "flex items-center gap-2 text-xs transition-colors",
                        passwordValidation.hasLowercase ? "text-green-600" : "text-muted-foreground"
                      )}>
                        {passwordValidation.hasLowercase ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        <span>Contains lowercase letter</span>
                      </div>

                      <div className={cn(
                        "flex items-center gap-2 text-xs transition-colors",
                        passwordValidation.hasNumber ? "text-green-600" : "text-muted-foreground"
                      )}>
                        {passwordValidation.hasNumber ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        <span>Contains number</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-bold text-foreground">
                      Confirm Password
                    </Label>
                    <Tooltip open={errors.confirmPassword}>
                      <TooltipTrigger asChild>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="••••••••"
                          className={cn(
                            "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                            errors.confirmPassword && "border-destructive"
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                        Passwords must match
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xs text-muted-foreground">Re-enter your password to confirm</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-lg mt-6 text-base"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </>
              ) : (
                <>
                  {/* Login Form */}
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail" className="text-sm font-bold text-foreground">
                      University Email
                    </Label>
                    <Tooltip open={errors.email}>
                      <TooltipTrigger asChild>
                        <Input
                          id="loginEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="student@university.edu"
                          className={cn(
                            "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                            errors.email && "border-destructive"
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                        Please fill
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-sm font-bold text-foreground">
                      Password
                    </Label>
                    <Tooltip open={errors.password}>
                      <TooltipTrigger asChild>
                        <Input
                          id="loginPassword"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="••••••••"
                          className={cn(
                            "rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
                            errors.password && "border-destructive"
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                        Please fill
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-lg mt-6 text-base"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
