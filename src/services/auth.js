
export const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_FW8m072ZH",

  client_id: "51k7vee96g6rc6bfiq3f2q9ocr",

  redirect_uri: `${window.location.origin}/`,

  response_type: "code",

  scope: "openid email profile",

  post_logout_redirect_uri: `${window.location.origin}/`,
};
