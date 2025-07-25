DOCKER_COMPOSE := $(shell if command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; elif docker compose version >/dev/null 2>&1; then echo "docker compose"; else echo ""; fi)

.PHONY: help install setup start stop restart logs reset clean build deploy sass

help:
	@echo "🎮 Space Shooter - Comandos Disponíveis"
	@echo "======================================"
	@echo "make install    - Instalar dependências"
	@echo "make setup      - Configurar projeto (Docker + DB)"
	@echo "make start      - Iniciar aplicação em desenvolvimento"
	@echo "make stop       - Parar containers Docker"
	@echo "make restart    - Reiniciar containers Docker"
	@echo "make reset      - Reset completo do banco de dados"
	@echo "make build      - Compilar TypeScript"
	@echo "make deploy     - Build para produção"
	@echo "make sass       - Compilar SCSS"
	@echo "make help       - Mostrar esta ajuda"

install:
	@echo "📦 Instalando dependências..."
	npm install

setup: install
	@echo "🚀 Configurando projeto..."
	@# --> Verificar se Docker Compose está disponível
	@if [ -z "$(DOCKER_COMPOSE)" ]; then \
		echo "❌ Erro: Docker Compose não encontrado!"; \
		echo "💡 Instale o Docker Compose ou certifique-se de que o Docker Desktop está instalado."; \
		exit 1; \
	fi
	@echo "✅ Docker Compose detectado: $(DOCKER_COMPOSE)"
	
	@# --> cria .env apenas se não existir
	@if [ ! -f .env ]; then \
		echo "📝 Criando arquivo .env..."; \
		echo "# Insert here the port you want to use" > .env; \
		echo "PORT=7799" >> .env; \
		echo "# insert here the environment you want to use" >> .env; \
		echo "NODE_ENV=development" >> .env; \
		echo "# insert here the path to the logs file" >> .env; \
		echo "LOGS_PATH=logs" >> .env; \
		echo "" >> .env; \
		echo "# insert here the secret for the session" >> .env; \
		echo "SECRET_SESSION=sua_chave_secreta_aqui" >> .env; \
		echo "" >> .env; \
		echo "# insert here the salt rounds for the password" >> .env; \
		echo "SALT_ROUNDS=10" >> .env; \
		echo "" >> .env; \
		echo "# insert here the password for the root user" >> .env; \
		echo "DATABASE_ROOT_PASSWORD=senhasegura" >> .env; \
		echo "" >> .env; \
		echo "# insert here the value to the database" >> .env; \
		echo 'DATABASE_URL="mysql://root:senhasegura@127.0.0.1:3307/game"' >> .env; \
	fi

	@# --> se o container mysql-game-app já existir
	@if docker ps -a --format '{{.Names}}' | grep -q '^mysql-game-app$$'; then \
		# se já estiver rodando, só informa; senão, inicia \
		if docker ps --format '{{.Names}}' | grep -q '^mysql-game-app$$'; then \
			echo "Container mysql-game-app já está em execução."; \
		else \
			echo "Iniciando container mysql-game-app existente..."; \
			docker start mysql-game-app; \
		fi; \
	else \
		# senão, cria e sobe **todos** os containers do projeto \
		echo "Criando e iniciando containers Docker..."; \
		$(DOCKER_COMPOSE) up -d; \
		if [ $? -ne 0 ]; then \
			echo "❌ Erro ao iniciar containers Docker!"; \
			echo "💡 Verifique se o Docker está rodando e se você tem permissões adequadas."; \
			exit 1; \
		fi; \
		echo "⏳ Aguardando MySQL inicializar..."; \
		sleep 10; \
	fi

	@echo "🗄️ Configurando banco de dados..."
	@npx prisma generate
	@npx prisma migrate deploy

	@echo "✅ Setup concluído!"
	@echo "🎮 Execute 'make start' para iniciar o jogo"



start:
	@echo "🎮 Iniciando Space Shooter..."
	npm start

stop:
	@echo "🛑 Parando containers..."
	$(DOCKER_COMPOSE) down

restart:
	@echo "🔄 Reiniciando containers..."
	$(DOCKER_COMPOSE) restart

reset:
	@echo "🗄️ Resetando banco de dados..."
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) up -d
	@sleep 10
	npx prisma migrate reset --force
	@echo "✅ Banco resetado!"

build:
	@echo "🔨 Compilando TypeScript..."
	npm run deploy

deploy: build
	@echo "🚀 Deploy para produção..."
	npm run start:prod

sass:
	@echo "🎨 Compilando SCSS..."
	npm run sass

dev: setup
	@echo "🎮 Iniciando ambiente de desenvolvimento..."
	@echo "📱 Aplicação: http://localhost:7788"
	@echo "🗄️ phpMyAdmin: http://localhost:8081"
	@echo "🎨 Execute 'make sass' em outro terminal para compilar SCSS"
	npm start 
