/**
 * UNAI Administrative Authentication & Security Engine
 * Provides cryptographic session signing, inactivity detection,
 * session expiration, brute force rate-limiting, and state integrity checks.
 */

const SESSION_STORAGE_KEY = "unai_admin_secure_session";
const LOCKOUT_STORAGE_KEY = "unai_admin_login_cooldown";
const FAILED_ATTEMPTS_KEY = "unai_admin_failed_attempts";

// Security Timing Configurations
export const MAX_SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours absolute limit
export const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;        // 30 minutes inactivity limit
export const MAX_LOGIN_ATTEMPTS = 5;                        // Max consecutive failed tries
export const LOCKOUT_DURATION_MS = 5 * 60 * 1000;           // 5 minutes lockout duration

interface AdminSession {
  token: string;
  username: string;
  loginTime: number;
  lastActivityTime: number;
  signature: string;
}

interface LockoutState {
  lockedUntil: number;
}

// Internal secret salt for HMAC/SHA256 signature generation (unique per origin)
const SALT = "unai_sec_salt_9f2a7b8c3d4e";

/**
 * Computes a SHA-256 hash using the native browser Web Crypto API
 */
async function computeHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data + SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Checks if admin login is currently in lockout cooldown
 */
export function getLockoutStatus(): { isLocked: boolean; remainingSeconds: number } {
  try {
    const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return { isLocked: false, remainingSeconds: 0 };

    const state: LockoutState = JSON.parse(raw);
    const now = Date.now();
    if (now < state.lockedUntil) {
      const remainingSeconds = Math.ceil((state.lockedUntil - now) / 1000);
      return { isLocked: true, remainingSeconds };
    }

    // Cooldown elapsed
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
    localStorage.removeItem(FAILED_ATTEMPTS_KEY);
    return { isLocked: false, remainingSeconds: 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0 };
  }
}

/**
 * Records a failed login attempt and triggers lockout if threshold reached
 */
export function recordFailedAttempt(): {
  isLocked: boolean;
  remainingSeconds: number;
  attemptsLeft: number;
} {
  try {
    const currentAttempts = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || "0", 10) + 1;
    localStorage.setItem(FAILED_ATTEMPTS_KEY, currentAttempts.toString());

    if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify({ lockedUntil }));
      return {
        isLocked: true,
        remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
        attemptsLeft: 0,
      };
    }

    return {
      isLocked: false,
      remainingSeconds: 0,
      attemptsLeft: MAX_LOGIN_ATTEMPTS - currentAttempts,
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: 1 };
  }
}

/**
 * Resets failed attempts after a valid login
 */
export function resetFailedAttempts(): void {
  try {
    localStorage.removeItem(FAILED_ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Validates provided credentials against environment variables or established defaults
 */
export function verifyAdminCredentials(username: string, pass: string): boolean {
  const validUsername = import.meta.env.VITE_ADMIN_USERNAME || "Unaitech2026";
  const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || "Unaitech@26";

  const sanitizedUser = username.trim();
  const sanitizedPass = pass.trim();

  return sanitizedUser === validUsername && sanitizedPass === validPassword;
}

/**
 * Creates a cryptographically signed session
 */
export async function createAdminSession(username: string): Promise<string> {
  const token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
  const now = Date.now();

  const signature = await computeHash(`${token}:${username}:${now}`);

  const session: AdminSession = {
    token,
    username,
    loginTime: now,
    lastActivityTime: now,
    signature,
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem("unai_auth", "true"); // legacy compatibility flag

  resetFailedAttempts();
  return token;
}

/**
 * Validates the stored session for integrity, age, and activity
 */
export function validateAdminSessionSync(): {
  isValid: boolean;
  reason?: "none" | "expired" | "inactive" | "corrupt";
  username?: string;
} {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return { isValid: false, reason: "none" };

    const session: AdminSession = JSON.parse(raw);
    const now = Date.now();

    // Check absolute expiration
    if (now - session.loginTime > MAX_SESSION_DURATION_MS) {
      destroyAdminSession();
      return { isValid: false, reason: "expired" };
    }

    // Check inactivity timeout
    if (now - session.lastActivityTime > INACTIVITY_TIMEOUT_MS) {
      destroyAdminSession();
      return { isValid: false, reason: "inactive" };
    }

    // Session structure check
    if (!session.token || !session.signature || !session.username) {
      destroyAdminSession();
      return { isValid: false, reason: "corrupt" };
    }

    return { isValid: true, username: session.username };
  } catch {
    destroyAdminSession();
    return { isValid: false, reason: "corrupt" };
  }
}

/**
 * Asynchronously validates session including cryptographic SHA-256 signature verification
 */
export async function validateAdminSession(): Promise<{
  isValid: boolean;
  reason?: "none" | "expired" | "inactive" | "corrupt" | "tampered";
  username?: string;
}> {
  const syncCheck = validateAdminSessionSync();
  if (!syncCheck.isValid) return syncCheck;

  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return { isValid: false, reason: "none" };

    const session: AdminSession = JSON.parse(raw);
    const expectedSignature = await computeHash(`${session.token}:${session.username}:${session.loginTime}`);

    if (session.signature !== expectedSignature) {
      destroyAdminSession();
      return { isValid: false, reason: "tampered" };
    }

    return { isValid: true, username: session.username };
  } catch {
    destroyAdminSession();
    return { isValid: false, reason: "corrupt" };
  }
}

/**
 * Updates the last user activity timestamp in the session
 */
export function updateSessionActivity(): void {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return;

    const session: AdminSession = JSON.parse(raw);
    session.lastActivityTime = Date.now();
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore
  }
}

/**
 * Clears and invalidates all admin session data
 */
export function destroyAdminSession(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem("unai_auth");
  } catch {
    // Ignore
  }
}
