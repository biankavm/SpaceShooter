import { Request, Response, NextFunction } from 'express';
import fsPromises from 'fs/promises';

export enum LoggerType {
  COMPLETE = 'complete',
  SIMPLE = 'simple',
}

function logger(type: LoggerType) {
  const path = `${process.env.LOGS_PATH}/logs.log`;
  const acess_hour = new Date().toISOString();

  if (type === LoggerType.SIMPLE) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await fsPromises.writeFile(
        `${path}`,
        `${acess_hour}, ${req.url}, ${req.method}\n`,
        { flag: 'a' }
      );
      next();
    };
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    await fsPromises.writeFile(
      `${path}`,
      `${acess_hour}, ${req.method}, ${req.url}, ${req.httpVersion}, ${req.get(
        'User-Agent'
      )}\n`,
      { flag: 'a' }
    );
    next();
  };
}

export default logger;
