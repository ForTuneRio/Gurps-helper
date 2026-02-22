import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.95.3'

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
 */
async function checkRateLimit(
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
            onConflict: 'user_id,endpoint'
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RATE_LIMIT_HEADERS = {
  'X-RateLimit-Limit': RATE_LIMIT_PER_MINUTE.toString(),
  'X-RateLimit-Window': '60'
}

export async function POST(req: Request): Promise<Response> {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client with auth context
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get user ID from JWT token
    const { data: userData, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const userId = userData.user.id
    const body = await req.json()
    const endpoint = body.endpoint || 'unknown'

    // Check rate limit for this user and endpoint
    const rateLimitResult = await checkRateLimit(userId, endpoint, supabase)

    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter,
          message: `Maximum 30 requests per minute. Try again in ${rateLimitResult.retryAfter} seconds.`
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
            ...RATE_LIMIT_HEADERS,
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(Date.now() + rateLimitResult.resetIn * 1000).toISOString()
          }
        }
      )
    }

    // Request allowed
    return new Response(
      JSON.stringify({
        allowed: true,
        remaining: rateLimitResult.remaining,
        resetIn: rateLimitResult.resetIn
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          ...RATE_LIMIT_HEADERS,
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(Date.now() + rateLimitResult.resetIn * 1000).toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Rate limit function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
}

Deno.serve(POST)
