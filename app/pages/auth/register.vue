<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Account</h1>
          <p class="text-gray-600 dark:text-gray-400">Join GURPS Helper today</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div v-if="error" class="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg">
            Account created! Check your email to verify your account, then sign in.
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              required
              maxlength="100"
              inputmode="email"
              autocomplete="email"
              spellcheck="false"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="6"
              maxlength="100"
              autocomplete="new-password"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="At least 6 characters"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Must be at least 6 characters long</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              maxlength="100"
              autocomplete="new-password"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Already have an account?
            <NuxtLink to="/auth/login" class="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
              Sign in
            </NuxtLink>
          </p>
        </div>

        <div class="mt-4 text-center">
          <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ← Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signUp } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

const MAX_EMAIL_LENGTH = 100
const MAX_PASSWORD_LENGTH = 100

const handleRegister = async () => {
  if (loading.value) return
  error.value = ''
  success.value = false
  loading.value = true

  const trimmedEmail = email.value.trim()
  if (trimmedEmail.length === 0) {
    error.value = 'Email is required'
    loading.value = false
    return
  }

  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    error.value = `Email must be at most ${MAX_EMAIL_LENGTH} characters`
    loading.value = false
    return
  }

  if (password.value.length > MAX_PASSWORD_LENGTH) {
    error.value = `Password must be at most ${MAX_PASSWORD_LENGTH} characters`
    loading.value = false
    return
  }

  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  // Validate password length
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    loading.value = false
    return
  }

  try {
    await signUp(trimmedEmail, password.value)
    success.value = true
    
    // Clear form
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000)
  } catch (e: any) {
    error.value = e.message || 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
