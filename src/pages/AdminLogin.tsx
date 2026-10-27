import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";
import { Lock, ArrowRight, ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  verifyAdminCredentials,
  createAdminSession,
  getLockoutStatus,
  recordFailedAttempt,
  validateAdminSessionSync,
} from "@/lib/authSecurity";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const { isAuthenticated, login } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated with a valid session, redirect immediately
  useEffect(() => {
    if (isAuthenticated && validateAdminSessionSync().isValid) {
      const target = (location.state as { from?: string })?.from || "/admin/dashboard";
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Check lockout status and maintain countdown timer
  useEffect(() => {
    const { isLocked, remainingSeconds } = getLockoutStatus();
    if (isLocked) {
      setLockoutSeconds(remainingSeconds);
    }

    const interval = setInterval(() => {
      const status = getLockoutStatus();
      if (status.isLocked) {
        setLockoutSeconds(status.remainingSeconds);
      } else {
        setLockoutSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check lockout state
    const currentLockout = getLockoutStatus();
    if (currentLockout.isLocked) {
      toast.error("Security Cooldown Active", {
        description: `Too many failed attempts. Try again in ${currentLockout.remainingSeconds} seconds.`,
      });
      return;
    }

    if (!username.trim() || !password) {
      toast.error("Credentials Required", {
        description: "Please enter both identity ID and security key.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Verify Credentials
      const isValid = verifyAdminCredentials(username, password);

      if (isValid) {
        // 3. Create cryptographically signed session
        await createAdminSession(username.trim());
        login();

        toast.success("Access Granted", {
          description: "Administrative identity verified. Welcome back.",
        });

        const target = (location.state as { from?: string })?.from || "/admin/dashboard";
        navigate(target, { replace: true });
      } else {
        // 4. Rate limiting: record failure
        const attemptResult = recordFailedAttempt();
        if (attemptResult.isLocked) {
          setLockoutSeconds(attemptResult.remainingSeconds);
          toast.error("Account Temporarily Locked", {
            description: `Maximum failed attempts reached. Locked for 5 minutes.`,
          });
        } else {
          toast.error("Access Denied", {
            description: `Invalid credentials. ${attemptResult.attemptsLeft} attempt(s) remaining before lockout.`,
          });
        }
      }
    } catch (err) {
      console.error("Login verification error:", err);
      toast.error("Authentication Error", {
        description: "A cryptographic verification error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLocked = lockoutSeconds > 0;

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background overflow-hidden font-sans">
      {/* visuals side */}
      <div className="relative hidden md:flex flex-col items-center justify-center p-12 overflow-hidden bg-[#0A0F1C]">
        <ParticleField count={40} />
        <GlowOrb size="xl" color="blue" className="top-0 left-0 opacity-40" />
        <GlowOrb size="xl" color="purple" className="bottom-0 right-0 opacity-40" />

        <div className="relative z-10 max-w-lg text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-metal-blue-500/20 to-metal-purple-500/20 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-glow-blue"
          >
            <ShieldCheck className="w-16 h-16 text-metal-blue-400" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-metal-blue-100 to-metal-blue-200 mb-4">
              UNAI TECH
            </h1>
            <p className="text-xl text-muted-foreground">
              Administrative Command Center
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
          >
            <p className="text-sm text-metal-blue-300 italic">
              "Control, Monitor, and Evolve."
            </p>
          </motion.div>
        </div>
      </div>

      {/* login side */}
      <div className="flex items-center justify-center p-6 relative">
        <GlowOrb size="lg" color="plasma" className="top-10 right-10 md:hidden" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-heading font-bold mb-2">Authenticated Access</h2>
            <p className="text-muted-foreground">Please identify yourself to proceed.</p>
          </div>

          <GlassCard className="p-8 border-metal-blue-500/20">
            {/* Lockout Warning Banner */}
            <AnimatePresence>
              {isLocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-3"
                >
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold text-amber-200">Security Cooldown Active</p>
                    <p className="mt-0.5 text-amber-300/80">
                      Too many consecutive failed login attempts. Unlocks in:{" "}
                      <span className="font-mono font-bold text-amber-100">{lockoutSeconds}s</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-metal-blue-300 ml-1">IDENTITY</label>
                <div className="relative group">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="User ID"
                    disabled={isLocked || isSubmitting}
                    className="pl-4 bg-black/20 border-white/10 focus:border-metal-blue-500 transition-colors h-12 disabled:opacity-50"
                  />
                  <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-transparent group-hover:ring-white/10 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-metal-blue-300 ml-1">SECRET</label>
                <div className="relative group">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={isLocked || isSubmitting}
                    className="pl-4 bg-black/20 border-white/10 focus:border-metal-blue-500 transition-colors h-12 disabled:opacity-50"
                  />
                  <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-transparent group-hover:ring-white/10 pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLocked || isSubmitting}
                className="w-full h-12 text-lg font-semibold bg-gradient-metal hover:shadow-glow-blue transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-5 h-5 mr-2 group-hover:hidden" />
                <span className="group-hover:hidden">
                  {isSubmitting ? "Verifying..." : "Authenticate"}
                </span>
                <span className="hidden group-hover:flex items-center">
                  Access Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </Button>
            </form>
          </GlassCard>

          <p className="text-center text-xs text-muted-foreground opacity-50 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-metal-blue-400" />
            Protected by Cryptographic Session Verification & Inactivity Timeout
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
