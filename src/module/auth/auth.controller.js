import { registerCA, loginUser } from './auth.service.js';

export const register = async (req, res) => {
  try {
    await registerCA(req.body);
    res.status(201).json({
      message: 'Registration successful. Await admin approval.'
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
