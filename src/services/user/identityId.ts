import {
  CognitoIdentityClient,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";
import * as config from "@/config";

let cachedIdentityId: string | undefined = undefined;

const getIdentityId = async (idToken: string) => {
  if (cachedIdentityId) {
    return cachedIdentityId;
  }
  try {
    const client = new CognitoIdentityClient({
      region: config.region,
    });

    // Call the GetIdCommand to get the IdentityId
    const command = new GetIdCommand({
      IdentityPoolId: config.identityPoolId,
      Logins: {
        [config.idpEndpoint]: idToken,
      },
    });

    const data = await client.send(command);
    cachedIdentityId = data.IdentityId;
    return cachedIdentityId;
  } catch (error) {
    console.error("Error getting IdentityId:", error);
    return null;
  }
};

export default getIdentityId;
