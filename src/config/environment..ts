import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  EMAIL: string;
  PASSWORD: string;
  BASE_URL: string;
}

if (!process.env.EMAIL) {
  throw new Error('Missing required environment variable: EMAIL');
}

if (!process.env.PASSWORD) {
  throw new Error('Missing required environment variable: PASSWORD');
}

export const environment: Environment = {
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  BASE_URL: process.env.BASE_URL || 'https://main.d2t1pk7fjag8u6.amplifyapp.com',
};