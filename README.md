# 🎮 Space Shooter

Olá! Esse é um projeto que desenvolvi durante a graduação para a disciplina de Programação para Web.

O trabalho consiste na elaboração de um sistema com o Jogo Space Shooter, permitindo cadastro de usuários, cursos, e amostragem do ranking com os melhores colocados no Jogo!

## Como Jogar

### Controles do Jogo

| Tecla                 | Ação                                 |
| --------------------- | ------------------------------------ |
| **Barra de Espaço**   | Inicia o jogo / Atira durante o jogo |
| **P**                 | Pausa/Despausa o jogo                |
| **←** (Seta Esquerda) | Move a nave para a esquerda          |
| **→** (Seta Direita)  | Move a nave para a direita           |

### Objetivo

- **Destrua os inimigos** que aparecem na tela
- **Evite colisões** com as naves inimigas
- **Sobreviva o máximo possível** para conseguir a maior pontuação
- **Suba no ranking** e compare sua pontuação com outros jogadores!

### Regras do Jogo

#### **Sistema de Vidas**

- **3 vidas** no início de cada partida
- **Perde 1 vida** ao colidir com qualquer inimigo
- **Game Over** quando todas as vidas acabam

#### **Sistema de Pontuação**

- **Meteorito Pequeno**: 100 pontos (mais valioso!)
- **Nave Inimiga**: 50 pontos
- **Disco voador**: 20 pontos
- **Meteorito Grande**: 10 pontos

#### **Dificuldade Progressiva**

- **Velocidade dos inimigos aumenta** a cada 60 segundos
- **Multiplicador de velocidade**: +5% a cada minuto
- **Inimigos ficam mais rápidos** conforme o tempo passa

#### **Mecânicas Especiais**

- **Invencibilidade temporária**: 5 segundos após tomar dano
- **Nave muda sua aparência** quando danificada
- **Lasers são destruídos** ao tomar dano
- **Pausa disponível** a qualquer momento (tecla P)

#### **Sistema de Ranking**

- **Maior pontuação salva automaticamente** ao final da partida
- **Ranking dos 10 melhores** jogadores

## Como Executar

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Docker** e **Docker Compose** instalados
- **Git**
- **Make** (geralmente já vem instalado no Linux/macOS)

### Setup

1. **Clone o repositório**

   ```bash
   git clone https://github.com/biankavm/SpaceShooter.git
   cd SpaceShooter
   ```

2. **Instale as dependências**

   ```bash
   make setup
   ```

3. **Configure as variáveis de ambiente**
   Edite o arquivo `.env` que foi criado pelo make setup, deixando-o de forma similar a do exemplo abaixo:

```env
PORT=7799
NODE_ENV=development # também pode ser production
SALT_ROUNDS=10
SESSION_SECRET=sua_chave_secreta_aqui # pode ser uma sequência aleatória de letras e números
DATABASE_ROOT_PASSWORD=umasenhasegura
```

4. **Inicie o jogo**

   ```bash
   make start
   ```

5. **Acesse a aplicação**
   `http://localhost:PORT`

## Tecnologias Utilizadas

### **Backend**

- **Node.js** + **Express.js** + **TypeScript**
- **Prisma ORM** para banco de dados
- **bcryptjs** para criptografia de senhas
- **express-session** para controle de sessões
- **Morgan** para logs de acesso
- **Joi** para validação de dados

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

## 🎥 Vídeo de Demonstração

Confira o jogo em ação! Os vídeos abaixo mostram a jogabilidade e as funcionalidades do sistema:

[![Assistir vídeo de Jogabilidade](videos/game-thumbnail.png)](https://drive.google.com/file/d/1zaB3QcmFWuKu3K6DxrXHkIxLH19QXNE-/view?usp=sharing)

[![Assistir vídeo das Funcionalidades](videos/navigation-thumbnail.png)](https://drive.google.com/file/d/1fzD_76yP7k2vYee2tKhXgbUPrjZ_1O7g/view?usp=sharing)

## Músicas e Créditos

### Trilha Sonora do Jogo

No projeto utilizei músicas de fundo para criar uma experiência mais imersiva, dentre elas:

- **Música Principal**: "Battle in Stars" - Tema de fundo durante o jogo
- **Música de Fim de Jogo**: "Defeat" - Toca quando o jogador perde
- **Efeitos Sonoros**: Sons de tiro e colisão para maior imersão

### Créditos das Músicas

As músicas e efeitos sonoros utilizados nesse projeto foram obtidos do [OpenGameArt.org](https://opengameart.org/), uma plataforma de recursos gratuitos para desenvolvedores de jogos.

## Contribuindo

Contribuições são sempre bem-vindas! Se você quiser melhorar este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Contato Comigo

- **GitHub**: [@biankavm](https://github.com/biankavm)
- **LinkedIn**: [Bianka Vasconcelos](https://www.linkedin.com/in/biankavmaciel/)

## Jogue e Divirta-se!

Agora é hora de embarcar nesta aventura espacial!

```bash
npm start
```

E prepare-se para defender a galáxia dos invasores alienígenas!

## Agradecimentos

- Agradeço ao professor **David Fernandes** pelos ensinamentos na disciplina de Programação para Web
- Agradeço a comunidade open source pelos recursos e bibliotecas utilizadas
- Grata aos criadores das músicas que tornam o jogo mais imersivo
- Por fim, agradeço a todos que testaram e deram feedback durante o desenvolvimento

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**

_Desenvolvido com 💜 durante a graduação em Ciência da Computação na UFAM_
