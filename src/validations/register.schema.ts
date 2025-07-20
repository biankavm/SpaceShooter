import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email é obrigatório',
  }),
  password: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 3 caracteres',
    'string.max': 'Senha deve ter no máximo 30 caracteres',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'As senhas não conferem',
    'string.empty': 'Confirmar senha é obrigatório',
  }),
  majorId: Joi.string().required().messages({
    'string.empty': 'Curso é obrigatório',
  }),
});

export default registerSchema;
