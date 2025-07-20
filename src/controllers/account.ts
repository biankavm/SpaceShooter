import { Request, Response } from 'express';
import { checkCredentials } from '../services/account';
import { getUserByEmail, updateUserPassword } from '../services/user';
import loginSchema from '../validations/login.schema';

const login = async (req: Request, res: Response) => {
  if (req.method === 'GET') res.render('account/login');
  else {
    try {
      const body = req.body;
      const { error, value } = loginSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors: { [key: string]: string } = {};
        error.details.forEach((detail) => {
          const key = detail.path.join('.');
          errors[key] = detail.message;
        });

        return res.render('account/login', { values: body, errors });
      }
      const { email, password } = body;
      const ok = await checkCredentials(email, password);
      const user = await getUserByEmail(email);

      if (ok) {
        // criar variável de sessão para saber se o usuário está logado
        req.session.logged = true;
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('account/login', {
          error: 'Email ou senha incorretos. Tente novamente!',
        });
      }
    } catch (error) {
      console.log('Erro no login:', error);
      res.render('account/login', {
        error: 'Erro interno do servidor',
      });
    }
  }
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/about');
  });
};

const changePassword = async (req: Request, res: Response) => {
  if (req.method === 'GET') res.render('account/changePassword');
  else {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = req.body;
      const user = req.session.user;
      const ok = await checkCredentials(
        user ? user.email : '',
        currentPassword
      );

      if (ok) {
        if (newPassword === confirmNewPassword && user) {
          await updateUserPassword(user.id, newPassword);
          res.redirect(`/`);
        } else {
          res.render('account/changePassword', {
            error: 'As senhas não conferem. Tente novamente!',
          });
        }
      } else {
        res.render('account/changePassword', {
          error: 'Senha atual incorreta. Tente novamente!',
        });
      }
    } catch (error) {
      console.log('Erro na alteração de senha:', error);
    }
  }
};

export default { login, logout, changePassword };
