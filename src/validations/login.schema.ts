import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email é obrigatório',
  }),
  password: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 3 caracteres',
    'string.max': 'Senha deve ter no máximo 30 caracteres',
  }),
});

export default loginSchema;
