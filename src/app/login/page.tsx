"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary">
        <Image
          src="/sisterdog4.jpeg"
          alt="Dog training session"
          fill
          className="object-cover opacity-60"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo.jpeg"
              alt="Pawblis Logo"
              width={56}
              height={56}
              className="rounded-xl brightness-200"
            />
            <span className="text-3xl font-bold">Pawblis</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Trainer Dashboard
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Manage your clients, track training progress, and access your AI
            assistant — all in one place.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-light">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to website
          </Link>

          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Image
              src="/logo.jpeg"
              alt="Pawblis Logo"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <span className="text-2xl font-bold text-secondary">Pawblis</span>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-secondary">Welcome back</h1>
            <p className="text-muted">
              Sign in to access your trainer dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="yanet@pawblis.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <PawPrint className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-8">
            Contact your administrator for access credentials
          </p>
        </div>
      </div>
    </div>
  );
}
