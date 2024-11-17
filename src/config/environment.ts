import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  EMAIL: string;
  PASSWORD: string;
  BASE_URL: string;
}

/**
 * @description Validates required environment variables.
 * @param keys Array of required environment variable keys.
 */
function validateEnvVariables(keys: (keyof Environment)[]) {
  keys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}

// Validate required environment variables
validateEnvVariables(['EMAIL', 'PASSWORD']);

export const environment: Environment = {
  EMAIL: process.env.EMAIL!,
  PASSWORD: process.env.PASSWORD!,
  BASE_URL: process.env.BASE_URL || 'https://main.d2t1pk7fjag8u6.amplifyapp.com',
};
