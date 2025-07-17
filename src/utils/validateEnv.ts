import { cleanEnv, num, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port({ default: 7788 }),
    NODE_ENV: str({ choices: ['development', 'production'] }),
    LOGS_PATH: str({ default: 'logs' }),
    SECRET_SESSION: str(),
    SALT_ROUNDS: num(),
  });
};

export default validateEnv;
