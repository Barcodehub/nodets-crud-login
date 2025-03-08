import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRoles = (req as any).user?.roles;

    if (!userRoles || !userRoles.some((role: string) => roles.includes(role))) {
      res.status(403).json({ message: 'Access denied. Unauthorized role.' });
      return;
    }

    next();
  };
};
