// src/app/auth/signin/page.tsx
'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to send login email. Please try again.");
      } else {
        // Show success message
        setError("Check your email for the login link!");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-normal tracking-wide text-primary font-barrio">
            SIGN IN
          </h1>
          <p className="text-xl text-primary/90 font-oooh-baby">
            Get your magic link...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-lg font-pompiere"
            required
          />

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-pompiere"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Magic Link"}
          </Button>

          {error && (
            <p className={`text-center text-lg font-pompiere ${
              error.includes("Check your email") ? "text-green-600" : "text-red-500"
            }`}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}