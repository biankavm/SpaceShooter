import { engine } from 'express-handlebars';
import express from 'express';
import dotenv from 'dotenv';
import logger, { LoggerType } from './middlewares/logger';
import validateEnv from './utils/validateEnv';
import router from './router/router';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import authView from './middlewares/authView';
import { User } from '@prisma/client';
// ideal tirar isso do arquivo principal e criar um arquivo separado para isso (um d.ts da vida)
declare module 'express-session' {
  // reabrir uma interface da sessão do express
  interface SessionData {
    logged: boolean; // para adicionar uma nova propriedade à sessão
    user: User | null;
  }
}

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 7788;
const publicPath = `${process.cwd()}/public`;

app.engine(
  'handlebars',
  engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`),
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: 'main',
  })
);

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`); // localização do diretório de views

app.use('/css', express.static(`${publicPath}/css`));
app.use('/js', express.static(`${publicPath}/js`));
app.use('/img', express.static(`${publicPath}/img`));
app.use('/utils', express.static(`${publicPath}/utils`));
app.use('/assets', express.static(`${publicPath}/assets`));

app.use(logger(LoggerType.COMPLETE));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // prepara a aplicação para usar cookies
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SECRET_SESSION!, // ! para garantir que a variável sempre vai existir
    resave: false, // garante que toda vez que o usuario acessar o servidor, a contagem do maxAge é reiniciada
    saveUninitialized: true, // mesmo se o usuário nao esteja logado, ele vai ter uma sessão
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 10 horas conectado no servidor
    },
  })
);

app.use(authView); // Adiciona informação de login para todas as views
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
