import { Request, Response } from 'express';
import {
  createMajor,
  getMajors,
  getMajorById,
  updateMajor,
  destroyMajor
} from '../services/major';

const index = async (req: Request, res: Response) => {
  try {
    const majors = await getMajors();
    res.render('major/index', { majors });
  } catch (error) {
    res.status(500).send('Erro ao buscar os majors');
    console.log(error);
  }
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('major/create');
  } else {
    try {
      await createMajor(req.body);
      res.redirect('/users/create');
    } catch (error) {
      res.status(500).send('Erro ao criar o major');
      console.log(error);
    }
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const major = await getMajorById(id);
    res.render('major/read', {
      major
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao buscar o curso');
  }
};

const update = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const { id } = req.params;
    try {
      const major = await getMajorById(id);
      res.render('major/update', { major });
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar o curso');
    }
  } else {
    try {
      await updateMajor(req.params.id, req.body);
      res.redirect('/majors/index');
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao atualizar o curso');
    }
  }
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const major = await destroyMajor(id);
    res.status(200).send(major);
    res.redirect('/majors/index');
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao deletar o curso');
  }
};

export default { index, read, create, update, destroy };
