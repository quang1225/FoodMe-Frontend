/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsExports = {
  aws_user_pools_web_client_id: process.env.AWS_USERPOOLS_WEB_CLIENT_ID,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_region: process.env.AWS_PROJECT_REGION,
  oauth: {
    domain: process.env.SOCIAL_LOGIN_DOMAIN,
    scope: ['aws.cognito.signin.user.admin', 'openid'],
    redirectSignIn: process.env.SOCIAL_LOGIN_REDIRECT,
    redirectSignOut: process.env.NEXT_PUBLIC_APP_URL,
    responseType: 'code',
  },
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: ['Google', 'Facebook'],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  ssr: true,
};

export default awsExports;
