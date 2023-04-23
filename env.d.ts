/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_AUTH0_CLIENT_SECRET: string
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_SERVER: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
