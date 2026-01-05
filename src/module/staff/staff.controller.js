import {
  createFirmUser,
  getFirmUsers,
  deactivateFirmUser
} from '../services/staff.service.js';

export const createUser = async (req, res) => {
  try {
    await createFirmUser(req.user, req.body);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await getFirmUsers(req.user);
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    await deactivateFirmUser(req.user, req.params.id);
    res.json({ message: 'User deactivated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
