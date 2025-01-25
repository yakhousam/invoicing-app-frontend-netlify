import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import { chromium, FullConfig } from "@playwright/test";

const authKey = `oidc.user:${process.env.VITE_APP_COGNITO_AUTHORITY}:${process.env.VITE_APP_COGNITO_CLIENT_ID}`;

// Autheticate once and save the session state to a file. the tests will use this file to authenticate
// This is useful when you want to run the tests multiple times without having to authenticate each time
async function globalSetup(config: FullConfig) {
  console.log("running global setup.............................");
  console.log("authkey", authKey);
  const browser = await chromium.launch();
  const { baseURL, storageState } = config.projects[0].use;
  console.log("baseURL", baseURL);
  console.log("storageState", storageState);
  const context = await browser.newContext({
    storageState: undefined,
  });
  const page = await context.newPage();

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    // Authenticate with Cognito
    const authValue = await cognitoAuthenticate();

    await page.goto(baseURL!);
    await page.evaluate(
      ({ authKey, authValue }) => {
        localStorage.setItem(authKey, JSON.stringify(authValue));
      },
      { authKey, authValue }
    );
    // Save storage state
    await context.storageState({ path: storageState as string });

    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: "./test-results/failed-setup-trace.zip",
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;

const TEST_USER = {
  EMAIL: process.env.COGNITO_TEST_EMAIL!,
  PASSWORD: process.env.COGNITO_TEST_PASSWORD!,
};

const poolData = {
  UserPoolId: process.env.VITE_APP_USER_POOL_ID!,
  ClientId: process.env.VITE_APP_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

type AuthStorageValue = ReturnType<typeof transformCognitoSession>;

async function cognitoAuthenticate() {
  const authenticationDetails = new AuthenticationDetails({
    Username: TEST_USER.EMAIL,
    Password: TEST_USER.PASSWORD,
  });

  const userData = {
    Username: TEST_USER.EMAIL,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise<AuthStorageValue>((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async (result) => {
        const authValue = transformCognitoSession(result);
        resolve(authValue);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

function transformCognitoSession(session: Record<string, any>) {
  return {
    id_token: session.idToken.jwtToken,
    session_state: null,
    access_token: session.accessToken.jwtToken,
    refresh_token: session.refreshToken.token,
    token_type: "Bearer",
    scope: session.accessToken.payload.scope,
    profile: {
      sub: session.idToken.payload.sub,
      iss: session.idToken.payload.iss,
      "cognito:username": session.idToken.payload["cognito:username"],
      origin_jti: session.idToken.payload.origin_jti,
      aud: session.idToken.payload.aud,
      event_id: session.idToken.payload.event_id,
      token_use: session.idToken.payload.token_use,
      name: session.idToken.payload.name,
      exp: session.idToken.payload.exp,
      iat: session.idToken.payload.iat,
      email: session.idToken.payload.email,
    },
    expires_at: session.idToken.payload.exp,
  };
}
