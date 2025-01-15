import { UpdateUser, updateUserSchema } from "@/validations/user";
import { UpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
import getCognitoClient from "./cognitoClient";

const updateUser = async (accessToken: string, user: UpdateUser) => {
  try {
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

    const response = await cognitoClient.send(command);
    console.log("Successfully updated custom attribute:", response);
  } catch (error) {
    console.error("Error updating custom attribute:", error);
  }
};

export default updateUser;
