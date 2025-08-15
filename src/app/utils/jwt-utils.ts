/**
 * JWT Token utility functions for validation and parsing
 */

export interface JwtPayload {
  exp?: number;
  iat?: number;
  nbf?: number;
  sub?: string;
  [key: string]: any;
}

/**
 * Decodes a JWT token without verifying the signature
 * @param token JWT token string
 * @returns Decoded payload or null if invalid
 */
export function decodeJwtToken(token: string): JwtPayload | null {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}

/**
 * Checks if a JWT token is expired
 * @param token JWT token string
 * @returns true if token is expired or invalid, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtToken(token);
  
  if (!payload || !payload.exp) {
    // If we can't decode or no expiry, consider it expired
    return true;
  }

  // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Checks if a JWT token is valid (format and not expired)
 * @param token JWT token string
 * @returns true if token is valid, false otherwise
 */
export function isTokenValid(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // Check token format (should have 3 parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Check if token is expired
  return !isTokenExpired(token);
}

/**
 * Gets the remaining time until token expiration in seconds
 * @param token JWT token string
 * @returns Remaining time in seconds, or -1 if invalid/expired
 */
export function getTokenRemainingTime(token: string): number {
  const payload = decodeJwtToken(token);
  
  if (!payload || !payload.exp) {
    return -1;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const remainingTime = payload.exp - currentTime;
  
  return remainingTime > 0 ? remainingTime : -1;
}

/**
 * Checks if token needs refresh (less than 5 minutes remaining)
 * @param token JWT token string
 * @returns true if token should be refreshed
 */
export function shouldRefreshToken(token: string): boolean {
  const remainingTime = getTokenRemainingTime(token);
  
  // Refresh if less than 5 minutes remaining
  return remainingTime > 0 && remainingTime < 300;
}