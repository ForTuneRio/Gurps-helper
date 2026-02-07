# Supabase Setup Guide for GURPS Helper

This guide will help you set up Supabase authentication and database for your GURPS Helper application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/sign in
3. Click "New Project"
4. Fill in:
   - **Name**: GURPS Helper (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project" and wait ~2 minutes for setup

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
4. Copy these values

## Step 3: Configure Your Local Environment

1. Create a `.env` file in your project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and paste your credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your_anon_key_here
   ```

3. **IMPORTANT**: Never commit `.env` to git! It's already in `.gitignore`.

## Step 4: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **+ New query**
3. Copy and paste this SQL:

```sql
-- Create realms table
CREATE TABLE IF NOT EXISTS public.realms (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spaceships table
CREATE TABLE IF NOT EXISTS public.spaceships (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS realms_user_id_idx ON public.realms(user_id);
CREATE INDEX IF NOT EXISTS realms_created_at_idx ON public.realms(created_at DESC);
CREATE INDEX IF NOT EXISTS spaceships_user_id_idx ON public.spaceships(user_id);
CREATE INDEX IF NOT EXISTS spaceships_created_at_idx ON public.spaceships(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.realms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaceships ENABLE ROW LEVEL SECURITY;

-- Create policies for realms
CREATE POLICY "Users can view their own realms"
  ON public.realms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own realms"
  ON public.realms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own realms"
  ON public.realms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own realms"
  ON public.realms FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for spaceships
CREATE POLICY "Users can view their own spaceships"
  ON public.spaceships FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own spaceships"
  ON public.spaceships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spaceships"
  ON public.spaceships FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spaceships"
  ON public.spaceships FOR DELETE
  USING (auth.uid() = user_id);
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 5: Configure Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** provider
3. Enable these settings:
   - ✅ **Enable Email provider**
   - ✅ **Confirm email** (recommended for production)
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/**`

4. For production, update these to your actual domain

## Step 6: Test Your Setup

1. Start your dev server:
   ```bash
   pnpm dev
   ```

2. Navigate to `http://localhost:3000`

3. Click **Sign Up** and create a test account

4. Check your email for the verification link (if email confirmation is enabled)

5. Sign in and test creating a realm or spaceship

6. In Supabase dashboard, go to **Table Editor** → **realms** to see your data!

## Step 7: Migrate Existing localStorage Data (Optional)

If you have existing realms/spaceships in localStorage:

1. Sign in to your account
2. Open browser console (F12)
3. Run:
   ```javascript
   // Import the migration utilities
   const { migrateLocalStorageToSupabase, hasLocalStorageData } = await import('/app/utils/migrateLocalStorage')
   
   // Check if you have data to migrate
   console.log('Has data to migrate:', hasLocalStorageData())

   // Get Supabase client and user (these are auto-imported in Nuxt)
   const supabase = useSupabaseClient()
   const user = useSupabaseUser()

   // Migrate the data
   if (user.value) {
     const results = await migrateLocalStorageToSupabase(supabase, user.value)
     console.log('Migration results:', results)
   }
   ```

Your data will be copied to Supabase and localStorage will be cleared (with a backup).

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env` file has the correct `SUPABASE_URL` and `SUPABASE_KEY`
- Restart your dev server after changing `.env`

### "Row Level Security" errors
- Make sure you ran the SQL script in Step 4
- Verify policies are created in **Authentication** → **Policies**

### Email not sending
- Check **Authentication** → **Email Templates**
- For development, check Supabase **Logs** for email delivery
- Consider using a custom SMTP provider in **Settings** → **Auth** → **SMTP Settings**

### Can't see data in tables
- Make sure you're signed in
- Check **Table Editor** and verify the `user_id` matches your user
- Look in **SQL Editor** and run: `SELECT * FROM realms WHERE user_id = auth.uid();`

## Production Deployment

Before deploying to production:

1. Update `.env` with production Supabase URL/key
2. In Supabase **Authentication** settings:
   - Update **Site URL** to your production domain
   - Add production domain to **Redirect URLs**
3. Enable **Confirm email** for security
4. Consider adding:
   - Email templates customization
   - Custom SMTP provider
   - Database backups (automatic in Supabase Pro)

## Security Best Practices

- ✅ Never commit `.env` file
- ✅ Use environment variables for sensitive data
- ✅ Enable Row Level Security (already done)
- ✅ Enable email confirmation in production
- ✅ Use strong passwords
- ✅ Regularly rotate API keys if compromised

## Next Steps

- [ ] Customize email templates in **Authentication** → **Email Templates**
- [ ] Add password reset functionality
- [ ] Add user profile page
- [ ] Implement data sharing features
- [ ] Set up automated backups

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Nuxt Supabase: https://supabase.nuxtjs.org

---

**Congratulations!** 🎉 Your GURPS Helper now has authentication and cloud storage!
