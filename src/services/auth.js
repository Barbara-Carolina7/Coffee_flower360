import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_kyvppdpRt",
      userPoolClientId: "74bnuckac4l5l6975ibq4s024c",
    },
  },
});

export default Amplify;