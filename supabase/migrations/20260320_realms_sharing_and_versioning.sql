-- Add sharing and optimistic concurrency support for realms
ALTER TABLE public.realms
  ADD COLUMN IF NOT EXISTS is_shared boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS share_token text,
  ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1;

-- Ensure share token uniqueness when present.
CREATE UNIQUE INDEX IF NOT EXISTS realms_share_token_unique_idx
  ON public.realms (share_token)
  WHERE share_token IS NOT NULL;

-- Helpful index for shared realm lookups.
CREATE INDEX IF NOT EXISTS realms_is_shared_idx
  ON public.realms (is_shared);

-- Keep version monotonic for optimistic locking.
CREATE OR REPLACE FUNCTION public.bump_realm_version()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.version = COALESCE(OLD.version, 0) + 1;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bump_realm_version ON public.realms;
CREATE TRIGGER trg_bump_realm_version
BEFORE UPDATE ON public.realms
FOR EACH ROW
EXECUTE FUNCTION public.bump_realm_version();

-- Allow authenticated users to read shared realms.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'realms'
      AND policyname = 'Authenticated users can view shared realms'
  ) THEN
    CREATE POLICY "Authenticated users can view shared realms"
      ON public.realms
      FOR SELECT
      TO authenticated
      USING (is_shared = true);
  END IF;
END;
$$;
