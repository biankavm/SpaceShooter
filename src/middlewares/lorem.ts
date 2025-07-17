import { loremIpsum } from 'lorem-ipsum';
import { Request, Response, NextFunction } from 'express';

function lorem(paragraphs: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const lorem = loremIpsum({
      count: paragraphs,
      format: 'html',
      units: 'paragraphs',
      suffix: '\n',
    });
    res.send(lorem);
  };
}

export default lorem;
