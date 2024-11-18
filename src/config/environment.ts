import dotenv from 'dotenv';

dotenv.config();

interface Environment {
	EMAIL: string;
	PASSWORD: string;
	BASE_URL: string;
}

function getEnvVariable(key: keyof Environment): string {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Missing environment variable: ${key}`);
	}
	return value;
}

export const environment: Environment = {
	EMAIL: getEnvVariable('EMAIL'),
	PASSWORD: getEnvVariable('PASSWORD'),
	BASE_URL:
		process.env.BASE_URL || 'https://main.d2t1pk7fjag8u6.amplifyapp.com',
};
