import { environment } from '../../config/environment';

export const testUsers = {
	validUser: {
		email: environment.EMAIL,
		password: environment.PASSWORD,
	},
	invalidUser: {
		email: `${Date.now()}@example.com`,
		password: 'wrongPassword',
	},
	lockoutUser: {
		email: 'lockout@example.com',
		password: 'wrongPassword',
	},
};

export const productCombinations = [
	{
		products: [
			{ id: '1', name: 'Product 1', quantity: 2 },
			{ id: '2', name: 'Product 2', quantity: 3 },
		],
	},
	{
		products: [
			{ id: '3', name: 'Product 3', quantity: 1 },
			{ id: '4', name: 'Product 4', quantity: 4 },
		],
	},
	{
		products: [
			{ id: '2', name: 'Product 2', quantity: 5 },
			{ id: '5', name: 'Product 5', quantity: 2 },
		],
	},
];
