import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório',
  }),
  password: Joi.string().min(5).max(30).required().messages({
    'any.required': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 5 caracteres',
    'string.max': 'Senha deve ter no máximo 30 caracteres',
  }),
});

export default loginSchema;
