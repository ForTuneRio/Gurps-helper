import { ref, readonly } from 'vue'

interface RateLimitStatus {
  remaining: number
  resetIn: number
  isLimited: boolean
}

interface RateLimitResponse {
  allowed: boolean
  remaining: number
  resetIn: number
  retryAfter?: number
}

const rateLimitStatus = ref<RateLimitStatus>({
  remaining: 30,
  resetIn: 60,
  isLimited: false
})

/**
 * Composable for checking and managing API rate limits
 * Should be called before making write operations to realms/spaceships
 */
export const useRateLimit = () => {
  const supabaseClient = useSupabaseClient()

  /**
   * Check rate limit for a specific endpoint
   * Returns true if request is allowed, false if rate limited
   */
  const checkLimit = async (endpoint: string = 'api'): Promise<boolean> => {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession()
      const token = session?.access_token

      if (!token) {
        console.warn('No auth token available for rate limit check')
        return true // Allow if not authenticated
      }

      const response = await $fetch<RateLimitResponse>('/api/rate-limit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          endpoint
        }
      })

      if (!response.allowed) {
        rateLimitStatus.value = {
          remaining: 0,
          resetIn: response.retryAfter || 60,
          isLimited: true
        }
        return false
      }

      rateLimitStatus.value = {
        remaining: response.remaining,
        resetIn: response.resetIn,
        isLimited: false
      }

      return true
    } catch (error: any) {
      // 429 = Too Many Requests
      if (error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] || '60')
        rateLimitStatus.value = {
          remaining: 0,
          resetIn: retryAfter,
          isLimited: true
        }
        return false
      }

      // For other errors, log but allow request to proceed
      console.error('Rate limit check failed:', error)
      return true
    }
  }

  /**
   * Get remaining requests and reset time
   */
  const getStatus = () => readonly(rateLimitStatus)

  /**
   * Format reset time as human-readable string
   */
  const formatResetTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`
    }
    const minutes = Math.ceil(seconds / 60)
    return `${minutes}m`
  }

  return {
    checkLimit,
    getStatus,
    formatResetTime,
    status: readonly(rateLimitStatus)
  }
}
