/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_INVOICES_URL: string;
  readonly VITE_APP_CLIENTS_URL: string;
  readonly VITE_APP_COGNITO_AUTHORITY: string;
  readonly VITE_APP_COGNITO_DOMAIN: string;
  readonly VITE_APP_AWS_REGION: string;
  readonly VITE_APP_COGNITO_CLIENT_ID: string;
  readonly VITE_APP_COGNITO_USER_POOL_ID: string;
  readonly VITE_APP_COGNITO_REDIRECT_URI: string;
  readonly VITE_APP_COGNITO_SIGN_OUT_URI: string;
  readonly VITE_APP_COGNITO_RESPONSE_TYPE: string;
  readonly VITE_APP_COGNITO_SCOPE: string;
  readonly VITE_APP_COGNITO_IDENTITY_POOL_ID: string;
  readonly VITE_APP_S3_BUCKET_NAME: string;
  readonly VITE_APP_COGNITO_IDP_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
