import { Request, Response, NextFunction } from 'express';

const authView = (req: Request, res: Response, next: NextFunction) => {
  // adicionar a informação de login para todas as views
  // todas as views devem ter as informações do usuario logado
  res.locals.logged = req.session.logged || false;
  res.locals.user = req.session.user || null;
  next();
};

export default authView;
