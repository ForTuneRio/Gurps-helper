/**
 * API endpoint to check rate limit
 * This endpoint calls the Supabase Edge Function for rate limiting
 */
export default defineEventHandler(async (event) => {
  const supabaseUrl = useRuntimeConfig().public.supabaseUrl
  const supabaseAnonKey = useRuntimeConfig().public.supabaseAnonKey

  // Get authorization header from client
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing authorization header'
    })
  }

  const body = await readBody(event)
  const endpoint = body.endpoint || 'api'

  try {
    // Call Supabase Edge Function
    const response = await fetch(`${supabaseUrl}/functions/v1/rate-limit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        endpoint
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: data.error || 'Rate limit check failed',
        data: {
          error: data.error,
          retryAfter: data.retryAfter,
          message: data.message
        }
      })
    }

    return {
      allowed: data.allowed,
      remaining: data.remaining,
      resetIn: data.resetIn
    }
  } catch (error: any) {
    console.error('Rate limit check error:', error)
    
    if (error._code === 'H3_STATUS_ERROR') {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: {
        error: error.message
      }
    })
  }
})
