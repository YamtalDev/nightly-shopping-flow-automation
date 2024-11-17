import dotenv from 'dotenv';

dotenv.config();

interface Credentials {
  EMAIL: string;
  PASSWORD: string;
  BASE_URL: string;
}

if (!process.env.EMAIL || !process.env.PASSWORD) {
  throw new Error('Please define EMAIL and PASSWORD in your .env file');
}

export const credentials: Credentials= {
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  BASE_URL: process.env.BASE_URL || 'https://main.d2t1pk7fjag8u6.amplifyapp.com',
};