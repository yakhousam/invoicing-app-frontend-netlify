import { fromCognitoIdentity } from "@aws-sdk/credential-providers";
import { S3Client } from "@aws-sdk/client-s3";
import * as config from "@/config";
import getIdentityId from "./identityId";

let cachedClient: S3Client | undefined = undefined;

const getS3Client = async (idToken: string) => {
  if (cachedClient) {
    return cachedClient;
  }
  const identityId = await getIdentityId(idToken);
  if (!identityId) {
    throw new Error("Failed to get IdentityId");
  }
  const s3Client = new S3Client({
    region: config.region,
    credentials: fromCognitoIdentity({
      identityId,
      logins: {
        [config.idpEndpoint]: idToken,
      },
    }),
  });
  cachedClient = s3Client;
  return s3Client;
};

export default getS3Client;
