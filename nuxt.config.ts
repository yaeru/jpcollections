// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@samk-dev/nuxt-uikit3'],

  runtimeConfig: {
    public: {
      gtmContainerId: '', // set NUXT_PUBLIC_GTM_CONTAINER_ID in .env file
    },
  },

  uikit3: {
    css: {
      // disable core and theme css to minimize final css bundle 
      coreCss: false,
      coreTheme: false,
      build: {
        preprocessor: 'scss',
        stylesPath: '~/assets/styles/main.scss',
        variablesPath: '~/assets/styles/variables.scss'
      }
    }
  },

  supabase: {
    redirect: false
  },
  
})
