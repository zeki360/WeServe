"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: 'customer' | 'receptionist') => {
    login(role);
    if (role === 'customer') {
      router.push('/');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center font-headline">
            Welcome to WeServe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">Please select your role to sign in.</p>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => handleLogin('customer')}
              className="w-full h-12 text-lg"
              variant="default"
            >
              <User className="mr-2" />
              Sign in as Customer
            </Button>
            <Button
              onClick={() => handleLogin('receptionist')}
              className="w-full h-12 text-lg"
              variant="secondary"
            >
              <Shield className="mr-2" />
              Sign in as Reception
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
