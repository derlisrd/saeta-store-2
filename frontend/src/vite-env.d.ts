/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL_END_POINT: string;
  readonly VITE_X_API_TOKEN: string;
  readonly VITE_SECRETO: string;
  readonly VITE_WEBSITE_NAME: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ICON: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
