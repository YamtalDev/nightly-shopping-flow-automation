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

export const testProducts = [
  { id: '1', name: 'Product 1', price: 20 },
  { id: '2', name: 'Product 2', price: 30 },
  { id: '3', name: 'Product 3', price: 40 },
  { id: '4', name: 'Product 4', price: 50 },
  { id: '5', name: 'Product 5', price: 10.5 },
];