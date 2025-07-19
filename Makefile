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
	@# --> cria .env apenas se não existir
	@if [ ! -f .env ]; then \
		echo "📝 Criando arquivo .env..."; \
		cp .env.example .env; \
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
		docker-compose up -d; \
		echo "⏳ Aguardando MySQL inicializar..."; \
		sleep 10; \
	fi

	@echo "🗄️ Configurando banco de dados..."
	@npx prisma generate

	@echo "✅ Setup concluído!"
	@echo "🎮 Execute 'make start' para iniciar o jogo"



start:
	@echo "🎮 Iniciando Space Shooter..."
	npm start

stop:
	@echo "🛑 Parando containers..."
	docker-compose down

restart:
	@echo "🔄 Reiniciando containers..."
	docker-compose restart

reset:
	@echo "🗄️ Resetando banco de dados..."
	docker-compose down -v
	docker-compose up -d
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
