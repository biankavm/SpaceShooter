import { Request, Response, NextFunction } from 'express';

const checkExists = (req: Request, res: Response) => {
  // se chegou até aqui, significa que nenhuma rota foi encontrada
  res.status(404).render('error/404', {
    originalUrl: req.originalUrl,
    message: 'Página não encontrada',
    helperMessage: 'Ops! Parece que essa página não existe.',
  });
};

export default checkExists;
