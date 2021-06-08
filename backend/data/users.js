import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Adminstartor',
    email: 'abc@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Barak Obama',
    email: 'presient@us.com',
    password: bcrypt.hashSync('12456', 10),
  },
  {
    name: 'vladimir putin',
    email: 'president@russia.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
