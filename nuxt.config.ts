// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // Nuxt 4 optimizations
  experimental: {
    payloadExtraction: false,
    viewTransition: true,
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    // typeCheck: true, // Disabled for now - requires vue-tsc
  },

  // Build optimizations
  nitro: {
    preset: 'node-server',
    experimental: {
      wasm: true,
    },
  },

  // Runtime config (can be overridden by environment variables)
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      appName: 'GURPS Helper',
      appVersion: '1.0.0',
    },
  },
})
