import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import * as config from "@/config";
import getIdentityId from "./identityId";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getS3Client from "./s3Client";

export const uploadSignature = async (signature: File, idToken: string) => {
  const s3Client = await getS3Client(idToken);
  const identityId = await getIdentityId(idToken);

  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: `cognito/invoicing-app/${identityId}/signature.png`,
    Body: signature,
    ContentType: signature.type,
  });

  const data = await s3Client.send(command);
  return data;
};

export const getSignature = async (idToken: string) => {
  const s3Client = await getS3Client(idToken);
  const identityId = await getIdentityId(idToken);

  const command = new GetObjectCommand({
    Bucket: config.bucket,
    Key: `cognito/invoicing-app/${identityId}/signature.png`,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
};
