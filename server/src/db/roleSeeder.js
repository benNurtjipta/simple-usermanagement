import db from './db.js';
import roleSchema from '../models/role.js';

async function seedRoles() {
  try {
    await db.connect();

    const roles = [
      {
        label: 'Regular user',
        privilegeLevel: 3,
        canRead: true,
        canWriteSelf: true,
        canWriteOthers: false,
        canDelete: false,
      },
      {
        label: 'Moderator',
        privilegeLevel: 2,
        canRead: true,
        canWriteSelf: true,
        canWriteOthers: true,
        canDelete: false,
      },
      {
        label: 'Administrator',
        privilegeLevel: 1,
        canRead: true,
        canWriteSelf: true,
        canWriteOthers: true,
        canDelete: true,
      },
      {
        label: 'Deactivated user',
        privilegeLevel: 4,
        canRead: false,
        canWriteSelf: false,
        canWriteOthers: false,
        canDelete: false,
      },
    ];

    await roleSchema.deleteMany({});
    console.log('Cleared existing roles');

    await roleSchema.insertMany(roles);
    console.log('Seeded roles successfully');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    await db.close();
  }
}

seedRoles();
