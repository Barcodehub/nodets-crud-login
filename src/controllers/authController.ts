import { Request, Response } from 'express';
import User from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, roles } = req.body;

  try {
    // Asignar roles al usuario
    const assignedRoles = [];
    if (roles && roles.length > 0) {
      for (const roleName of roles) {
        const role = await Role.findOne({ name: roleName });
        if (role) assignedRoles.push(role._id);
      }
    } else {
      // Asignar rol "user" por defecto
      const userRole = await Role.findOne({ name: 'user' });
      if (userRole) assignedRoles.push(userRole._id);
    }

    const user = new User({ username, email, password, roles: assignedRoles });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('roles');
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generar token con roles
    const token = jwt.sign(
      { id: user._id, roles: user.roles.map((role: any) => role.name) },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getCsrfToken = (req: Request, res: Response) => {
  res.json({ csrfToken: res.locals.csrfToken });
};