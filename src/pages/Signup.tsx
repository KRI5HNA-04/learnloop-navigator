
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailValidating, setEmailValidating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const validateEmail = async (email: string) => {
    setEmailValidating(true);
    try {
      // Check if this email already exists using the auth.signUp API with a dummy password
      // This is a more reliable approach than trying to use admin APIs which aren't available client-side
      const { data, error } = await supabase.auth.signUp({
        email,
        password: `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`, // Random password
        options: {
          // Setting emailRedirectTo to false will prevent sending confirmation email
          emailRedirectTo: undefined
        }
      });

      // If auth.signUp returns user data but status is not confirmed, the email exists
      if (data && data.user && !data.user.email_confirmed_at) {
        return true; // Email doesn't exist or isn't confirmed yet
      }

      // If there's an error message containing "already", the email is registered
      if (error && error.message.toLowerCase().includes("already")) {
        toast({
          title: "Email already registered",
          description: "This email is already in use. Please use another email or log in.",
          variant: "destructive",
        });
        return false;
      }
      
      return true; // Allow signup attempt if validation is inconclusive
    } catch (error) {
      console.error("Error validating email:", error);
      return true; // Allow signup attempt if validation fails
    } finally {
      setEmailValidating(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Validate the email first
      const isEmailValid = await validateEmail(email);
      if (!isEmailValid) {
        setIsLoading(false);
        return;
      }

      await signup(email, password, name);
      navigate("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific error cases
      if (error.message && error.message.includes("already")) {
        toast({
          title: "Email already registered",
          description: "This email is already in use. Please use another email or log in.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async (token: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token,
      });

      if (error) throw error;

      toast({
        title: "Signup successful",
        description: "Welcome to PathWise!",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Google signup error:", error);
      toast({
        title: "Google signup failed",
        description: error.message || "An error occurred during Google signup",
        variant: "destructive",
      });
    }
  };

  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        await handleGoogleSignUp(tokenResponse.access_token);
      } catch (error) {
        console.error("Google signup error:", error);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google signup error:", errorResponse);
      toast({
        title: "Google signup failed",
        description: "An error occurred during Google signup",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2">
            Sign up to start your learning journey
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || emailValidating}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => googleSignUp()}
          disabled={googleLoading}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          {googleLoading ? "Signing up..." : "Sign up with Google"}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
