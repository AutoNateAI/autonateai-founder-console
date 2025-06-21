
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Zap } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'autonateai') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginTime', new Date().toISOString());
      toast({
        title: "Welcome to Founder's Console",
        description: "Authentication successful. Initializing dashboard...",
      });
      setTimeout(() => navigate('/dashboard'), 500);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">AutoNateAI</CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              Founder's Console Access
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Console'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Authorized personnel only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
