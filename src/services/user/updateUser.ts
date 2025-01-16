import { UpdateUser, updateUserSchema } from "@/validations/user";
import { UpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
import getCognitoClient from "./cognitoClient";

const updateUser = async (accessToken: string, user: UpdateUser) => {
  const updates = updateUserSchema.parse(user);
  const cognitoClient = getCognitoClient();
  const userAttributes = Object.entries(updates).map(([key, value]) => ({
    Name: key,
    Value: value,
  }));
  const command = new UpdateUserAttributesCommand({
    AccessToken: accessToken,
    UserAttributes: userAttributes,
  });

  await cognitoClient.send(command);
};

export default updateUser;
