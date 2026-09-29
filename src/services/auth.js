import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_kvyppdRp",
      userPoolClientId: "74nbuckac4l5l6975ibq4s024c",
    },
  },
});