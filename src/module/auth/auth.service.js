import db from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.js';

export const registerCA = async (payload) => {
  const { firm_name, ca_name, email, password, phone } = payload;

  // check existing user
  const existing = await db('users').where({ email }).first();
  if (existing) throw new Error('Email already registered');

  return await db.transaction(async trx => {
    // create firm
    const [firmId] = await trx('firms').insert({
      firm_name,
      ca_name,
      email,
      phone,
      status: 'inactive'
    });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create CA user
    await trx('users').insert({
      firm_id: firmId,
      name: ca_name,
      email,
      password: hashedPassword,
      role: 'ca',
      status: 'inactive'
    });

    return { firmId };
  });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = await db('users')
    .where({ email })
    .where('status', 'active')
    .first();

  if (!user) throw new Error('Invalid credentials or inactive user');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      firm_id: user.firm_id
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      firm_id: user.firm_id
    }
  };
};
