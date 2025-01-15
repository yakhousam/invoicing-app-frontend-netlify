import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import getCognitoClient from "./cognitoClient";
import { userSchema } from "@/validations/user";

const getUser = async (accessToken: string) => {
  const cognitoClient = getCognitoClient();

  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  const data = await cognitoClient.send(command);

  const formatedData = data.UserAttributes?.reduce<Record<string, string>>(
    (acc, attr) => {
      if (attr.Name && attr.Value) {
        acc[attr.Name] = attr.Value;
      }
      return acc;
    },
    {}
  );
  return userSchema.parse(formatedData);
};

export default getUser;
