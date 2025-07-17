import { Request, Response } from 'express';
import lorem from '../middlewares/lorem';
import constants from './constants';
import { getTopScores } from '../services/gameSession';
import { getUserById } from '../services/user';
import { getMajorById } from '../services/major';

const index = (req: Request, res: Response) => {
  res.render('main/index', {
    game: true,
  });
};

const loremIpsum = lorem(4);

const cookie = (req: Request, res: Response) => {
  if (!('nome-cookie' in req.cookies)) {
    // req.cookies vetor com todos os cookies
    res.cookie('nome-cookie', 123); // nome e valor do cookie (res.cookie; // função que pede para o browser criar um cookie)
    res.send('Novo cookie criado!');
  } else {
    res.send('Cookie já existe!');
  }
};

// handlebars views

const about = (req: Request, res: Response) => {
  res.render('main/about', constants.about);
};

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', constants.university);
};

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  });
};

const hb3 = (req: Request, res: Response) => {
  res.render('main/hb3', {
    professors: constants.professorsList,
  });
};

const hb4 = (req: Request, res: Response) => {
  res.render('main/hb4', {
    technologies: constants.technologiesList,
  });
};

const ranking = async (req: Request, res: Response) => {
  const topScores = await getTopScores();
  let topScoresByUsers = [];

  for (const score of topScores) {
    const user = await getUserById(score.userId);
    const major = await getMajorById(user?.majorId || '');
    topScoresByUsers.push({
      ...score,
      user: user,
      major: major,
    });
  }

  res.render('main/ranking', { topScoresByUsers });
};

export default {
  index,
  about,
  loremIpsum,
  cookie,
  hb1,
  hb2,
  hb3,
  hb4,
  ranking,
};
