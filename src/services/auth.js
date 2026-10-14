
import { Amplify } from "aws-amplify";
import {
  signIn,
  signOut,
  getCurrentUser,
} from "aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_FW8m072ZH",
      userPoolClientId: "51k7vee96g6rc6bfiq3f2q9ocr",
      loginWith: {
        email: true,
      },
    },
  },
});

export { signIn, signOut, getCurrentUser };
