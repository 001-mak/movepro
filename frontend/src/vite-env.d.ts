/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  interface ImportMetaEnv {
    readonly VITE_API_BASE_CONTOLLER_URL: string
    readonly VITE_API_BASE_URL: string
    // Add other environment variables as needed
  }