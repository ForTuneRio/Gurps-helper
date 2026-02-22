// Shared rate limit logic
const RATE_LIMIT_PER_MINUTE = 30
const WINDOW_MS = 60 * 1000 // 1 minute

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetIn: number // seconds
  retryAfter?: number // seconds
}

/**
 * Check if request should be allowed based on rate limit
 * Returns object with permission status and metadata
 */
export async function checkRateLimit(
  userId: string,
  endpoint: string,
  supabaseClient: any
): Promise<RateLimitResult> {
  const now = new Date()
  const windowStart = new Date(now.getTime() - WINDOW_MS)

  try {
    // Get current request count for this user/endpoint in current minute
    const { data, error } = await supabaseClient
      .from('rate_limits')
      .select('request_count, window_start')
      .eq('user_id', userId)
      .eq('endpoint', endpoint)
      .gte('window_start', windowStart.toISOString())
      .order('window_start', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows, which is fine
      throw error
    }

    let requestCount = 0
    let windowStartTime = now

    if (data) {
      requestCount = data.request_count
      windowStartTime = new Date(data.window_start)
    }

    // Check if over limit
    const isAllowed = requestCount < RATE_LIMIT_PER_MINUTE
    const remaining = Math.max(0, RATE_LIMIT_PER_MINUTE - requestCount)
    const resetIn = Math.ceil((windowStartTime.getTime() + WINDOW_MS - now.getTime()) / 1000)

    if (isAllowed) {
      // Increment counter
      await supabaseClient
        .from('rate_limits')
        .upsert(
          {
            user_id: userId,
            endpoint,
            request_count: requestCount + 1,
            window_start: windowStartTime.toISOString(),
            updated_at: now.toISOString()
          },
          {
            onConflict: 'user_id,endpoint,DATE_TRUNC'
          }
        )

      return {
        allowed: true,
        remaining: remaining - 1,
        resetIn
      }
    }

    // Over limit
    return {
      allowed: false,
      remaining: 0,
      resetIn,
      retryAfter: resetIn
    }
  } catch (error) {
    console.error('Rate limit check error:', error)
    // On error, allow request (don't block on server errors)
    return {
      allowed: true,
      remaining: RATE_LIMIT_PER_MINUTE,
      resetIn: 60
    }
  }
}

export const RATE_LIMIT_HEADERS = {
  'X-RateLimit-Limit': RATE_LIMIT_PER_MINUTE.toString(),
  'X-RateLimit-Window': '60'
}
