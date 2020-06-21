import Constants from 'expo-constants';

const ENV = {
  local: {
    API_URL: 'https://api-dev.ratetracker.io',
    DEMO_ACCOUNT: {
      name: 'Demo',
      email: 'aaron@aaronblankenship.com',
      password: '1337Tech',
    },
    PLAID_PUBLIC_KEY: 'dd7b1b5bc0db299d7a610d8c5586df',
    PLAID_ENV: 'development',
  },
  dev: {
    API_URL: 'https://api-dev.ratetracker.io',
    PLAID_PUBLIC_KEY: 'dd7b1b5bc0db299d7a610d8c5586df',
    PLAID_ENV: 'development',
  },
  default: {
    API_URL: 'https://api-dev.ratetracker.io',
    PLAID_PUBLIC_KEY: 'dd7b1b5bc0db299d7a610d8c5586df',
    PLAID_ENV: 'development',
  },
  prod: {
    API_URL: 'https://api-prod.ratetracker.io',
  },
};

const getEnvVars = (env = 'local') => ENV[env];

export default getEnvVars(Constants.manifest.releaseChannel);