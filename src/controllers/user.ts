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
    res.render('user/create', { majors });
  } else if (req.method === 'POST') {
    try {
      const { confirmPassword, ...userData } = req.body;
      console.log(confirmPassword, userData.password);
      if (confirmPassword !== userData.password) {
        res.render('user/create', {
          majors,
          error: 'As senhas não conferem. Tente novamente!',
        });
      } else {
        const user = await createUser(userData as CreateUserDTO);
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
  if (req.method === 'GET') {
    try {
      const user = await getUserById(id);
      const majors = await getMajors();
      res.render('user/update', { user, majors });
    } catch (error) {
      res.status(500).send('Erro ao buscar dados para atualização');
      console.log(error);
    }
  } else if (req.method === 'POST') {
    try {
      await updateUser(id, req.body);
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o usuário');
      console.log(error);
    }
  }
};

const destroy = async (req: Request, res: Response) => {
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
