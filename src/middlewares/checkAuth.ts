import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.logged) {
    res.status(403).render('account/blocked');
  } else next();
};

export default checkAuth;
