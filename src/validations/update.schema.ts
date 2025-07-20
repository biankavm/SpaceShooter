import Joi from 'joi';

const updateSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email é obrigatório',
  }),
  majorId: Joi.string().required().messages({
    'string.empty': 'Curso é obrigatório',
  }),
});

export default updateSchema;
