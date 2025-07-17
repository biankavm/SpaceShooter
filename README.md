# Space Shooter

Olá! Este é um projeto que desenvolvi durante a graduação para a disciplina de Programação para Web.

O trabalho consiste na elaboração de um sistema com o Jogo Space Shooter, permitindo cadastro de usuários, cursos, e amostragem do ranking com os melhores colocados no Jogo!

## Páginas da Aplicação

![Lista de Cursos](screenshots/pages/login.png)
_Página de Login_

![Lista de Cursos](screenshots/pages/unlogged/createAccount.png)
_Página de Criação de Conta_

![Lista de Cursos](screenshots/pages/logged/home.png)
_Página Inicial para Usuários Logados_

![Lista de Cursos](screenshots/pages/logged/accountDetails.png)
_Página de Detalhes da Conta_

![Lista de Cursos](screenshots/pages/logged/accountUpdate.png)
_Página de Atualizar Conta_

![Lista de Cursos](screenshots/pages/logged/changePassword.png)
_Página de Alterar Senha_

![Lista de Cursos](screenshots/pages/about.png)
_Página de Sobre_

![Lista de Cursos](screenshots/pages/unlogged/home.png)
_Página Inicial para Usuários Deslogados - Jogo fica inacessível_

![Lista de Cursos](screenshots/pages/404.png)
_Página não existente (404)_

## Como Executar

### Passo a passo

1. **Baixe o projeto**

   ```bash
   git clone https://github.com/biankavm/web-programming.git
   cd web-programming/ExpTsFinal
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o arquivo de ambiente**

   ```bash
   cp .env.example .env
   ```

   Agora edite o arquivo `.env` com suas informações:

   ```env
   DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3307/game"
   PORT=7788
   SALT_ROUNDS=10
   SESSION_SECRET=sua_chave_secreta_aqui
   LOGS_PATH=logs
   ```

4. **Configure o banco de dados**

   ```bash
   npx prisma migrate reset
   npx prisma generate
   ```

5. **Rode o projeto**

   ```bash
   # para desenvolvimento
   npm start

   # para produção
   npm run deploy
   npm run start:prod

   # para compilar SCSS (em outro terminal)
   npm run sass
   ```

## Tecnologias Utilizadas

### **Backend**

- **Node.js** + **Express.js** + **TypeScript**
- **Prisma ORM** para banco de dados
- **bcryptjs** para criptografia de senhas
- **express-session** para controle de sessões
- **Morgan** para logs de acesso

### **Frontend**

- **Handlebars** para templates
- **Bootstrap 5** para interface responsiva
- **SCSS** para estilos organizados
- **JavaScript Modular** para o jogo

### **Banco de Dados**

- **MySQL** como banco principal
- **Prisma** para facilitar a interação com o banco

### **Ferramentas**

- **Nodemon** para desenvolvimento
- **TypeScript** para tipagem estática
- **SASS** para compilação de estilos

## 🚀 Contribuindo

Contribuições são sempre bem-vindas! Se você quiser melhorar este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

- **GitHub**: [@biankavm](https://github.com/biankavm)
- **LinkedIn**: [Bianca Viana](https://www.linkedin.com/in/biankavm/)

## 🎮 Jogue e Divirta-se!

Agora é hora de embarcar nesta aventura espacial! 🛸

```bash
npm start
```

E prepare-se para defender a galáxia dos invasores alienígenas!

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**

_Desenvolvido com 💜 durante a graduação em Ciência da Computação na UFAM_
