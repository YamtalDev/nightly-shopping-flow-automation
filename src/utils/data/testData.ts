import { environment } from '../../config/environment.';

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