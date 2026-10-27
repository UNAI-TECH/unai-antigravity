import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { validateAdminSessionSync, updateSessionActivity, destroyAdminSession } from "@/lib/authSecurity";
import { toast } from "sonner";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, logout } = useData();
  const location = useLocation();

  // Validate session integrity and activity timeout immediately
  const sessionCheck = validateAdminSessionSync();

  useEffect(() => {
    if (!isAuthenticated || !sessionCheck.isValid) {
      if (sessionCheck.reason === "expired" || sessionCheck.reason === "inactive") {
        toast.error("Session Expired", {
          description: "Your administrative session has expired. Please log in again.",
        });
      } else if (sessionCheck.reason === "tampered") {
        toast.error("Security Alert", {
          description: "Session integrity failure detected. You have been logged out.",
        });
      }
      destroyAdminSession();
      logout();
    }
  }, [isAuthenticated, sessionCheck.isValid, sessionCheck.reason, logout]);

  // Activity listeners to track admin presence and refresh last-active timestamp
  useEffect(() => {
    if (!isAuthenticated || !sessionCheck.isValid) return;

    let throttleTimer: NodeJS.Timeout | null = null;
    const handleUserActivity = () => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          updateSessionActivity();
          throttleTimer = null;
        }, 5000); // Throttle activity updates to once every 5 seconds
      }
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, handleUserActivity, { passive: true }));

    // Periodic check for inactivity timeout every 60 seconds
    const intervalTimer = setInterval(() => {
      const check = validateAdminSessionSync();
      if (!check.isValid) {
        toast.error("Session Inactive", {
          description: "You have been logged out due to 30 minutes of inactivity.",
        });
        destroyAdminSession();
        logout();
      }
    }, 60000);

    return () => {
      if (throttleTimer) clearTimeout(throttleTimer);
      clearInterval(intervalTimer);
      events.forEach((ev) => window.removeEventListener(ev, handleUserActivity));
    };
  }, [isAuthenticated, sessionCheck.isValid, logout]);

  // If not authenticated or session invalid, redirect immediately to /admin
  if (!isAuthenticated || !sessionCheck.isValid) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
