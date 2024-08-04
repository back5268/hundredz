/**
 * @type {string[]}
 */
export const publicRoutes = ["/", "/error", "/access-denied"];

/**
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verification",
  "/auth/forgot-password",
  "/auth/new-password",
];

/**
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin";
