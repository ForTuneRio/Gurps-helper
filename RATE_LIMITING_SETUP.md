# Rate Limiting Implementation Guide

## Overview

This guide explains the rate limiting system for GURPS Helper. The system limits users to 30 requests per minute for write operations (creating, updating, deleting realms and spaceships).

**Architecture:**
- **Database**: `rate_limits` table tracks requests per user/endpoint per minute
- **Edge Function**: `/functions/rate-limit/index.ts` validates rate limits
- **API Endpoint**: `server/api/rate-limit.post.ts` bridges client to Edge Function
- **Composable**: `useRateLimit()` checks limit before write operations

---

## Setup Instructions

### 1. Deploy Database Migration

First, add the `rate_limits` table to Supabase:

```bash
# From the project root
supabase db push
```

This will run the migration file: `supabase/migrations/20260223_create_rate_limits.sql`

**What it creates:**
- `rate_limits` table with RLS policies
- Unique constraint: `(user_id, endpoint, window_start)` — one record per user/endpoint per minute
- Index for faster lookups

### 2. Deploy Edge Function

```bash
supabase functions deploy rate-limit
```

The function will be available at:
```
https://<your-project>.supabase.co/functions/v1/rate-limit
```

**What it does:**
- Accepts POST requests with: `{ endpoint: string }`
- Requires `Authorization: Bearer <JWT>` header
- Returns:
  - `200`: Request allowed with `{ allowed: true, remaining: X, resetIn: Y }`
  - `429`: Rate limit exceeded with `{ allowed: false, retryAfter: Y }`

### 3. Update Runtime Config (if needed)

In `nuxt.config.ts`, ensure the public Supabase URL is configured:

```typescript
export default defineNuxtConfig({
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY
  }
})
```

---

## How It Works

### Flow: User saves a realm

1. **Component** → Calls `saveRealm()` in `useRealms` composable
2. **Composable** → Calls `useRateLimit().checkLimit('realm-save')`
3. **Composable** → Posts to `/api/rate-limit` with JWT token
4. **API Route** → Calls Supabase Edge Function `/functions/v1/rate-limit`
5. **Edge Function** → Queries `rate_limits` table
   - If `request_count < 30` → Returns allowed + increments counter
   - If `request_count >= 30` → Returns 429 Too Many Requests
6. **Composable** → Throws error if rate limited, otherwise proceeds with DB save
7. **Database** → RLS policies ensure user can only access own realms

### Rate Limit Window

- **Per minute**, per user, per endpoint
- Window automatically shifts forward each minute
- Example:
  - 12:34:10 → First request of 12:34 minute
  - 12:34:50 → Request 50 of 12:34 minute
  - 12:35:05 → New minute, counter resets to 1

### Error Messages

When rate limited, users see:
```
Rate limit exceeded. Please wait 42s before saving again.
```

---

## Testing

### Test Rate Limiting Locally

```typescript
// In a component or test file
const { checkLimit, formatResetTime, status } = useRateLimit()

// Simulate 30 requests
for (let i = 0; i < 30; i++) {
  const allowed = await checkLimit('realm-save')
  console.log(`Request ${i + 1}: allowed=${allowed}`)
}

// On the 31st request
const allowed = await checkLimit('realm-save')
console.log(`Request 31: allowed=${allowed}`) // false

// Check status
const s = status.value
console.log(`Remaining: ${s.remaining}, Reset in: ${s.resetIn}s`)
```

### Test Edge Function Directly

```bash
# Deploy with verbose output
supabase functions deploy rate-limit --no-verify-jwt

# Test via cURL
curl -X POST https://<project>.supabase.co/functions/v1/rate-limit \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"endpoint": "realm-save"}'
```

---

## Monitoring

### Check rate limit records in Supabase

```sql
SELECT user_id, endpoint, request_count, window_start, updated_at
FROM public.rate_limits
WHERE DATE_TRUNC('minute', window_start) = DATE_TRUNC('minute', NOW())
ORDER BY updated_at DESC
LIMIT 20;
```

### View rate limit errors in logs

- **Client**: Browser console shows user-friendly error message
- **Supabase**: Edge Function logs appear in Project Settings → Functions → Logs

---

## Customization

### Change the limit (30/min)

Edit in multiple places:

1. **`supabase/functions/_shared/rateLimit.ts`:**
```typescript
const RATE_LIMIT_PER_MINUTE = 30  // Change here
```

2. **`app/composables/useRateLimit.ts`:**
   - No change needed (reads from Edge Function response)

3. **Headers in Edge Function** (`supabase/functions/rate-limit/index.ts`):
```typescript
'X-RateLimit-Limit': RATE_LIMIT_PER_MINUTE.toString(),
```

### Add different limits per endpoint

Modify `checkRateLimit()` in `_shared/rateLimit.ts`:

```typescript
export async function checkRateLimit(
  userId: string,
  endpoint: string,
  supabaseClient: any
): Promise<RateLimitResult> {
  // Different limits per endpoint
  const limits: Record<string, number> = {
    'realm-save': 30,
    'spaceship-save': 20,
    'magic-calculate': 60
  }
  
  const limit = limits[endpoint] || 30
  // ... rest of logic using `limit` instead of RATE_LIMIT_PER_MINUTE
}
```

### Bypass rate limit for admins

In Edge Function, before the limit check:

```typescript
if (userData.user.user_metadata?.is_admin === true) {
  return {
    allowed: true,
    remaining: RATE_LIMIT_PER_MINUTE,
    resetIn: 60
  }
}
```

---

## Troubleshooting

### "CORS error" when calling Edge Function

- **Cause**: CORS headers not set
- **Fix**: Edge Function includes `'Access-Control-Allow-Origin': '*'`
- Check: Look at network tab in DevTools → check `rate-limit` request

### "Missing authorization header" error

- **Cause**: JWT token not sent
- **Fix**: Ensure `useSupabaseClient()` is initialized in composable
- Check: `const token = await supabaseClient.auth.session()?.access_token`

### "Rate limits table doesn't exist"

- **Cause**: Migration not deployed
- **Fix**: Run `supabase db push`
- Check: Supabase console → Database → Tables → see `rate_limits`

### Rate limit function returns 500

- **Cause**: Edge Function has a runtime error
- **Fix**: Check Supabase Edge Function logs
  - Console → Project Settings → Functions → View logs
  - Look for SQL errors or runtime errors

---

## Security Notes

✅ **RLS Policies Protect Data:**
- Users can only view their own rate limit records
- Service role only can modify records (via Edge Function)

✅ **JWT Validation:**
- Edge Function validates token authenticity
- Anonymous requests rejected

✅ **Client-Side NOT Trusted:**
- UI shows the rest, but server enforces the actual limit
- DevTools manipulation doesn't bypass the server check

---

## Files Added/Modified

### New Files
- `supabase/migrations/20260223_create_rate_limits.sql` — Database table
- `supabase/functions/rate-limit/index.ts` — Edge Function
- `supabase/functions/_shared/rateLimit.ts` — Shared utility
- `server/api/rate-limit.post.ts` — Nuxt API endpoint
- `app/composables/useRateLimit.ts` — Vue composable

### Modified Files
- `app/composables/useRealms.ts` — Integrated rate limit check
- `app/composables/useSpaceships.ts` — Integrated rate limit check

---

## Next Steps

1. **Deploy**: Run `supabase db push` and `supabase functions deploy rate-limit`
2. **Test**: Try saving a realm/spaceship, check console for rate limit info
3. **Monitor**: Check Supabase dashboard for rate limit table entries
4. **Document**: Update team with rate limit limits (30/min)

---

## Questions?

See the inline comments in:
- `supabase/functions/rate-limit/index.ts` — Core logic
- `app/composables/useRateLimit.ts` — Client integration
- `supabase/functions/_shared/rateLimit.ts` — Shared utilities
