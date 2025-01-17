import { AuthProviderProps } from "react-oidc-context";

// COGNITO
export const authority = import.meta.env.VITE_APP_COGNITO_AUTHORITY;
export const domain = import.meta.env.VITE_APP_COGNITO_DOMAIN;
export const region = import.meta.env.VITE_APP_AWS_REGION;
export const clientId = import.meta.env.VITE_APP_COGNITO_CLIENT_ID;
export const identityPoolId = import.meta.env.VITE_APP_COGNITO_IDENTITY_POOL_ID;
export const responeType = import.meta.env.VITE_APP_COGNITO_RESPONSE_TYPE;
export const scope = import.meta.env.VITE_APP_COGNITO_SCOPE;
export const bucket = import.meta.env.VITE_APP_S3_BUCKET_NAME;
export const idpEndpoint = import.meta.env.VITE_APP_COGNITO_IDP_ENDPOINT;

export const redirectUri = `${window.location.origin}/overview`;
export const singoutUri = window.location.origin;

// API
export const invoicesUrl = import.meta.env.VITE_APP_INVOICES_URL;
export const clientsUrl = import.meta.env.VITE_APP_CLIENTS_URL;

export const cognitoAuthConfig: AuthProviderProps = {
  authority,
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: responeType,
  scope,
  onSigninCallback() {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
