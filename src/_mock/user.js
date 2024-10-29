import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'inactive']),
  mainEvent: sample(['100m', '200m', '400m', 'Long Jump', 'Hurdler']),
}));
