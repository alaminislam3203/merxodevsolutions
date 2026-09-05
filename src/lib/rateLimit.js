// Lightweight, in-memory rate limiter for Next.js API Routes

const rateLimitMap = new Map();

// Periodic cleanup every 5 minutes to keep memory footprint tiny
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
  if (timer.unref) timer.unref();
}

/**
 * Check if a request exceeds rate limit
 * @param {string} identifier (e.g. IP + endpoint)
 * @param {object} options { limit, windowMs }
 * @returns {object} { success, remaining, retryAfter }
 */
export function checkRateLimit(identifier, { limit = 10, windowMs = 60 * 1000 } = {}) {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (record.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return { success: false, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, retryAfter: 0 };
}

/**
 * Extract client IP from Next.js Request headers
 */
export function getClientIp(request) {
  const forwarded = request.headers?.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return (
    request.headers?.get('x-real-ip') ||
    request.headers?.get('cf-connecting-ip') ||
    '127.0.0.1'
  );
}
