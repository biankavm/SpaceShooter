import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  destroyUser,
} from '../services/user';
import { getMajorById, getMajors } from '../services/major';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../types/user';
import {
  getGameSession,
  saveScoreUser,
  updateScoreUser,
} from '../services/gameSession';
import registerSchema from '../validations/register.schema';
import updateSchema from '../validations/update.schema';

// ctrl + shift + seta para baixo permite edição em bloco

const index = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.render('user/index', { users });
  } catch (error) {
    res.status(500).send('Erro ao buscar os usuários');
    console.log(error);
  }
};

const create = async (req: Request, res: Response) => {
  const majors = await getMajors();

  if (req.method === 'GET') {
    const majors = await getMajors();
    res.render('user/create', { majors });
  } else if (req.method === 'POST') {
    try {
      const body = req.body;

      const { error } = registerSchema.validate(body, {
        abortEarly: false,
      });

      if (error) {
        const errors: { [key: string]: string } = {};
        error.details.forEach((detail) => {
          const key = detail.path.join('.');
          errors[key] = detail.message;
        });
        return res.render('user/create', { values: body, errors, majors });
      }

      const { confirmPassword, ...userData } = req.body;
      if (confirmPassword !== userData.password) {
        res.render('user/create', {
          majors,
          error: 'As senhas não conferem. Tente novamente!',
        });
      } else {
        await createUser(userData as CreateUserDTO);
        res.redirect(`/account/login`);
      }
    } catch (error) {
      res.status(500).send('Erro ao criar o usuário');
      console.log(error);
    }
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    const major = await getMajorById(`${user?.majorId}`);
    res.render('user/read', { user, major });
  } catch (error) {
    res.status(500).send('Erro ao buscar o usuário');
    console.log(error);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(id);
  const majors = await getMajors();

  if (req.method === 'GET') {
    try {
      res.render('user/update', { user, majors });
    } catch (error) {
      res.status(500).send('Erro ao buscar dados para atualização');
      console.log(error);
    }
  } else if (req.method === 'POST') {
    const body = req.body;
    const { error } = updateSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      const errors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        const key = detail.path.join('.');
        errors[key] = detail.message;
      });
      return res.render('user/update', { user, majors, errors });
    }
    try {
      const updatedUser = await updateUser(id, req.body);

      // atualizar a sessão se o usuário atualizado for o mesmo da sessão
      if (req.session.user && req.session.user.id === id)
        req.session.user = updatedUser;

      res.redirect('/');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o usuário');
      console.log(error);
    }
  }
};

const destroy = async (req: Request, res: Response) => {
  console.log('Estou no controller de destroy');
  const { id } = req.params;
  try {
    await destroyUser(id);
    res.redirect('/users/index');
  } catch (error) {
    res.status(500).send('Erro ao deletar o usuário');
    console.log(error);
  }
};

const saveScore = async (req: Request, res: Response) => {
  const { score } = req.params;
  const user = req.session.user;

  if (!user) {
    res.status(401).json({ message: 'Usuário não autenticado!' });
    return;
  }

  // salvar na tabela game_sessions
  try {
    const actualGameSession = await getGameSession(user.id);
    let gameSession;
    if (actualGameSession && parseInt(score) > actualGameSession.score)
      gameSession = await updateScoreUser(parseInt(score), user.id);
    else if (!actualGameSession)
      gameSession = await saveScoreUser(parseInt(score), user.id);

    console.log(gameSession);
    console.log('Pontuação salva com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar a pontuação!' });
    console.log(error);
  }
};

export default { index, create, read, update, destroy, saveScore };
