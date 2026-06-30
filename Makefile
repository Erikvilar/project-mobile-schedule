.PHONY: help install start clean outdated run-android run-ios pull-db export-db check status sync-db delete-db clean-db clean-android logs dev info watch-db

APP_PACKAGE := com.project_mobile
APP_NAME := project_mobile

DB_NAME ?= seikohealthdb
SYNC_INTERVAL ?= 10

# Diretório local onde os backups serão salvos
LOCAL_DIR := db_backup

# Arquivos do banco
DB_FILE := $(DB_NAME).db
DB_SHM := $(DB_NAME).db-shm
DB_WAL := $(DB_NAME).db-wal

ADB := adb
DEVICE ?= default

help:
	@echo.
	@echo ======================================================
	@echo   React Native + WatermelonDB Development Manager
	@echo ======================================================
	@echo.
	@echo GERADOR DE ARQUIVOS:
	@echo   python gen.py repository NomeRepository
	@echo   python gen.py screen NomeScreen
	@echo   python gen.py service NomeService
	@echo   python gen.py hook useNome
	@echo   python gen.py util nomeutil
	@echo.
	@echo DEPENDENCIAS:
	@echo   make install
	@echo   make outdated
	@echo.
	@echo EXECUTAR APP:
	@echo   make start
	@echo   make run-android
	@echo   make run-ios
	@echo.
	@echo BANCO DE DADOS:
	@echo   make pull-db DB_NAME=seu_banco
	@echo   make export-db DB_NAME=seu_banco
	@echo   make delete-db DB_NAME=seu_banco
	@echo   make sync-db
	@echo   make watch-db
	@echo   make check
	@echo   make status
	@echo.
	@echo LIMPEZA:
	@echo   make clean
	@echo   make clean-db
	@echo   make clean-android
	@echo.
	@echo EXEMPLOS:
	@echo   make pull-db DB_NAME=seikohealthdb
	@echo   make sync-db DB_NAME=seikohealthdb SYNC_INTERVAL=2
	@echo.

install:
	@echo [*] Instalando dependencias...
	yarn install
	@echo [OK] Dependencias instaladas

outdated:
	@echo [*] Verificando pacotes desatualizados...
	yarn outdated

start:
	@echo [*] Iniciando Metro Bundler...
	npx react-native start --reset-cache

run-android:
	@echo [*] Rodando app no Android...
	npx react-native run-android

run-ios:
	@echo [*] Rodando app no iOS...
	npx react-native run-ios

pull-db:
	@if not exist $(LOCAL_DIR) mkdir $(LOCAL_DIR)

	@echo [*] Baixando $(DB_NAME)...

	@$(ADB) exec-out run-as $(APP_PACKAGE) cat $(DB_FILE) > $(LOCAL_DIR)/$(DB_FILE)

	@$(ADB) exec-out run-as $(APP_PACKAGE) cat $(DB_SHM) > $(LOCAL_DIR)/$(DB_SHM) 2>nul || echo [*] Arquivo shm nao encontrado

	@$(ADB) exec-out run-as $(APP_PACKAGE) cat $(DB_WAL) > $(LOCAL_DIR)/$(DB_WAL) 2>nul || echo [*] Arquivo wal nao encontrado

	@echo.
	@echo [OK] Banco salvo em $(LOCAL_DIR)
	@echo.

export-db: pull-db

delete-db:
	@echo [!] Deletando $(DB_NAME) do device...
	@$(ADB) shell "run-as $(APP_PACKAGE) rm -f $(DB_FILE)"
	@$(ADB) shell "run-as $(APP_PACKAGE) rm -f $(DB_SHM)"
	@$(ADB) shell "run-as $(APP_PACKAGE) rm -f $(DB_WAL)"
	@echo [OK] Banco deletado
sync-db:
	@$(MAKE) pull-db
	@timeout /t $(SYNC_INTERVAL) >nul
	@$(MAKE) sync-db

sync-loop:
	@echo.
	@echo [%TIME%] Atualizando banco...

	@$(ADB) exec-out run-as $(APP_PACKAGE) cat $(DB_FILE) > $(LOCAL_DIR)/$(DB_FILE)

	@$(ADB) exec-out run-as $(APP_PACKAGE) cat $(DB_SHM) > $(LOCAL_DIR)/$(DB_SHM) 2>nul || echo [*] Arquivo shm nao encontrado

	@$(ADB) exec-out run-as $(APP_PACKAGE) cat $(DB_WAL) > $(LOCAL_DIR)/$(DB_WAL) 2>nul || echo [*] Arquivo wal nao encontrado

	@for %%A in ($(LOCAL_DIR)\$(DB_FILE)) do @echo DB : %%~zA bytes
	@for %%A in ($(LOCAL_DIR)\$(DB_WAL)) do @echo WAL: %%~zA bytes

	@timeout /t $(SYNC_INTERVAL) >nul
	@goto sync-loop

watch-db:
	@$(MAKE) sync-db SYNC_INTERVAL=1 DB_NAME=$(DB_NAME)

check:
	@echo.
	@echo ======================================================
	@echo Arquivos locais de $(DB_NAME)
	@echo ======================================================
	@if exist $(LOCAL_DIR)\$(DB_FILE) (dir $(LOCAL_DIR)\$(DB_NAME).db*) else (echo [!] Nenhum arquivo encontrado)
	@echo.

status:
	@echo.
	@echo ======================================================
	@echo Device
	@echo ======================================================
	@$(ADB) devices
	@echo.
	@echo ======================================================
	@echo Banco no device
	@echo ======================================================
	@$(ADB) shell "run-as $(APP_PACKAGE) ls -lh $(DB_NAME).db*" 2>nul || echo [!] Nenhum arquivo encontrado
	@echo.

clean:
	@echo [*] Limpando node_modules...
	@if exist node_modules rmdir /s /q node_modules
	@echo [OK] Limpeza concluida

clean-db:
	@echo [*] Limpando backups locais...
	@if exist $(LOCAL_DIR) rmdir /s /q $(LOCAL_DIR)
	@echo [OK] Backups removidos

clean-android:
	@echo [*] Limpando gradle do Android...
	cd android && call gradlew clean && cd ..
	@echo [OK] Android limpo

logs:
	adb logcat | Select-String "ReactNativeJS"

dev:
	@echo Iniciando ambiente de desenvolvimento...
	@start npx react-native start --reset-cache
	@timeout /t 5 >nul
	npx react-native run-android

info:
	@echo.
	@echo ======================================================
	@echo Informacoes do Projeto
	@echo ======================================================
	@echo App Package : $(APP_PACKAGE)
	@echo App Name    : $(APP_NAME)
	@echo Banco       : $(DB_NAME)
	@echo Intervalo   : $(SYNC_INTERVAL)s
	@echo Device      : $(DEVICE)
	@echo.
	@node -v
	@npm -v
	@yarn -v