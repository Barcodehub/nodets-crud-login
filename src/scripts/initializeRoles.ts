import Role from '../models/Role';

const roles = ['user', 'admin'];

const initializeRoles = async () => {
  for (const roleName of roles) {
    const roleExists = await Role.findOne({ name: roleName });
    if (!roleExists) {
      const role = new Role({ name: roleName });
      await role.save();
      console.log(`Role ${roleName} created`);
    }
  }
};

export default initializeRoles;