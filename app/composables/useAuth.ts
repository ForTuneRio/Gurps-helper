import type { User } from '@supabase/supabase-js'

const AUTH_COOLDOWN_MS = 1500
let lastAuthRequestAt = 0

const enforceAuthCooldown = () => {
  const now = Date.now()
  if (now - lastAuthRequestAt < AUTH_COOLDOWN_MS) {
    throw new Error('Please wait a moment before trying again.')
  }
  lastAuthRequestAt = now
}

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const signUp = async (email: string, password: string) => {
    enforceAuthCooldown()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    return data
  }
  
  const signIn = async (email: string, password: string) => {
    enforceAuthCooldown()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  }
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Redirect to home after logout
    await navigateTo('/')
  }
  
  const isAuthenticated = computed(() => !!user.value)
  
  return {
    user: readonly(user),
    isAuthenticated,
    signUp,
    signIn,
    signOut,
  }
}
