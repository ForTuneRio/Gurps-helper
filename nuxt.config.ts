// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode'
  ],

  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      exclude: ['/', '/auth/*', '/calculator*'],
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'theme'
  },

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
    preset: 'static',
    experimental: {
      wasm: true,
    },
  },

  // SEO & Meta Tags
  app: {
    head: {
      title: 'GURPS Helper - Realms Management, Spaceship & Magic Calculator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Free GURPS helper for realms management, spaceships, and Ritual Path Magic calculations. Open source portfolio project.' },
        { name: 'keywords', content: 'GURPS, Ritual Path Magic, realm builder, spaceship sheet, gaming calculator' },
        { name: 'og:title', content: 'GURPS Helper - Free Tool' },
        { name: 'og:description', content: 'Manage GURPS realms, spaceships, and calculate Ritual Path Magic spells.' },
        { name: 'og:image', content: 'https://www.gurps-helper.com/og-image.png' },
        { name: 'og:url', content: 'https://www.gurps-helper.com/' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.gurps-helper.com/' },
      ],
    },
  },

  // Runtime config (can be overridden by environment variables)
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      appName: 'GURPS Helper',
      appVersion: '1.0.0',
      siteUrl: 'https://www.gurps-helper.com',
    },
  },
})
