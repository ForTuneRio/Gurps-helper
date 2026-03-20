// Nuxt server route — proxies rate-limit check to the Supabase edge function.

let hasWarnedMissingConfig = false
let hasWarnedAuthRejected = false
let hasWarnedEdgeError = false
let hasWarnedRequestFailed = false

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  // @nuxtjs/supabase stores under public.supabase.url/key; fall back to custom keys.
  const supabaseUrl =
    (runtimeConfig.public as any)?.supabase?.url ||
    runtimeConfig.public?.supabaseUrl ||
    runtimeConfig.supabaseUrl ||
    ''

  const supabaseAnonKey =
    (runtimeConfig.public as any)?.supabase?.key ||
    runtimeConfig.public?.supabaseAnonKey ||
    runtimeConfig.supabaseAnonKey ||
    ''

  const authHeader = getHeader(event, 'authorization')

  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Missing authorization header' })
  }

  const body = await readBody(event)
  const endpoint = body?.endpoint || 'api'

  if (!supabaseUrl || !supabaseAnonKey) {
    if (!hasWarnedMissingConfig) {
      console.warn('Rate limit check skipped: missing Supabase runtime config')
      hasWarnedMissingConfig = true
    }
    return { allowed: true, remaining: 30, resetIn: 60 }
  }

  const rateLimitUrl = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/rate-limit`

  try {
    const response = await fetch(rateLimitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'apikey': supabaseAnonKey
      },
      body: JSON.stringify({ endpoint })
    })

    const data = await response.json().catch(() => ({} as any))

    if (!response.ok) {
      if (response.status === 429) {
        return {
          allowed: false,
          remaining: 0,
          resetIn: Number(data.retryAfter || 60),
          retryAfter: Number(data.retryAfter || 60)
        }
      }

      if (response.status === 401 || response.status === 403) {
        if (!hasWarnedAuthRejected) {
          console.warn('Rate limit check skipped: edge function auth rejected request')
          hasWarnedAuthRejected = true
        }
        return { allowed: true, remaining: 30, resetIn: 60 }
      }

      throw createError({
        statusCode: response.status,
        statusMessage: data.error || 'Rate limit check failed',
        data: { error: data.error, retryAfter: data.retryAfter, message: data.message }
      })
    }

    return { allowed: data.allowed, remaining: data.remaining, resetIn: data.resetIn }
  } catch (error: any) {
    if (error?._code === 'H3_STATUS_ERROR') {
      if (error?.statusCode === 429) throw error

      if (!hasWarnedEdgeError) {
        console.warn('Rate limit check skipped: non-rate-limit edge error')
        hasWarnedEdgeError = true
      }
      return { allowed: true, remaining: 30, resetIn: 60 }
    }

    if (!hasWarnedRequestFailed) {
      console.warn('Rate limit check skipped: request failed')
      hasWarnedRequestFailed = true
    }
    return { allowed: true, remaining: 30, resetIn: 60 }
  }
})
