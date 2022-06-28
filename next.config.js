/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const isProd = process.env.NODE_ENV === 'production';

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  AWS_PROJECT_REGION: process.env.AWS_PROJECT_REGION,
  AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
  AWS_USER_POOLS_ID: process.env.AWS_USER_POOLS_ID,
  AWS_USERPOOLS_WEB_CLIENT_ID: process.env.AWS_USERPOOLS_WEB_CLIENT_ID,
  AWS_IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID,
  SOCIAL_LOGIN_DOMAIN: process.env.SOCIAL_LOGIN_DOMAIN,
  SOCIAL_LOGIN_REDIRECT: process.env.SOCIAL_LOGIN_REDIRECT,
  BUSINESS_URL: process.env.BUSINESS_URL,
  BUSINESS_LOGIN_URL: process.env.BUSINESS_LOGIN_URL,
  BUSINESS_SIGNUP_URL: process.env.BUSINESS_SIGNUP_URL,
  GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  CDN_IMAGE_URL: process.env.CDN_IMAGE_URL,
  GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
};

module.exports = () => {
  const withFonts = require('next-fonts');
  const configWithFonts = withFonts({
    env,
  });

  const imagesConfig = {
    images: {
      domains: [
        'resizer.otstatic.com',
        'static.heyyou.io',
        (env.CDN_IMAGE_URL || process.env.CDN_IMAGE_URL || '').replace(
          'https://',
          '',
        ),
      ],
    },
  };

  return {
    ...configWithFonts,
    ...imagesConfig,
    serverRuntimeConfig: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    experimental: {
      outputStandalone: true,
    },
    publicRuntimeConfig: env,
    assetPrefix: isProd ? process.env.CDN_URL : '',
    reactStrictMode: true,
    i18n,
    compiler: {
      styledComponents: true,
    },
    swcMinify: true,
    optimizeFonts: false,
  };
};
