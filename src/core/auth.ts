import jwt from 'jsonwebtoken';

/**
 * Token cache to store generated tokens
 */
interface TokenCache {
  [key: string]: {
    token: string;
    createdAt: number;
  };
}

const API_TOKEN_TTL_SECONDS = 3 * 60; // 3 minutes
const CACHE_TTL_SECONDS = API_TOKEN_TTL_SECONDS - 30; // 2.5 minutes
const tokenCache: TokenCache = {};

/**
 * Generate a JWT token for API authentication
 * @param apiSecretKey - The API secret key in format "apiKey.secret"
 * @param cache - Whether to cache the token
 * @returns JWT token string
 */
export function generateToken(apiSecretKey: string, cache: boolean = true): string {
  try {
    // Check cache first
    if (cache && tokenCache[apiSecretKey]) {
      const cachedToken = tokenCache[apiSecretKey];
      const isValid = Date.now() - cachedToken.createdAt < CACHE_TTL_SECONDS * 1000;
      if (isValid) {
        return cachedToken.token;
      }
    }

    // Parse API key and secret
    const parts = apiSecretKey.split('.');
    if (parts.length !== 2) {
      throw new Error('Invalid API key format. Expected format: "apiKey.secret"');
    }

    const [apiKey, secret] = parts;

    // Create JWT payload
    const payload = {
      api_key: apiKey,
      exp: Math.floor(Date.now() / 1000) + API_TOKEN_TTL_SECONDS,
      timestamp: Date.now(),
    };

    // Generate JWT token
    const token = jwt.sign(payload, secret, {
      algorithm: 'HS256',
      header: {
        alg: 'HS256',
        sign_type: 'SIGN',
      } as any,
    });

    // Cache the token if caching is enabled
    if (cache) {
      tokenCache[apiSecretKey] = {
        token,
        createdAt: Date.now(),
      };
    }

    return token;
  } catch (error) {
    throw new Error(`Failed to generate authentication token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Clear the token cache
 */
export function clearTokenCache(): void {
  Object.keys(tokenCache).forEach(key => {
    delete tokenCache[key];
  });
}

/**
 * Clear a specific token from cache
 * @param apiSecretKey - The API secret key
 */
export function clearToken(apiSecretKey: string): void {
  delete tokenCache[apiSecretKey];
}