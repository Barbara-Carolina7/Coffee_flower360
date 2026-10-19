import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_FW8m072ZH",
      userPoolClientId: "51k7vee96g6rc6bfiq3f2q9ocr",
    },
  },
});

export default Amplify;