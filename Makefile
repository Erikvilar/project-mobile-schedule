.PHONY: help install start clean outdated run-android run-ios pull-db export-db check status sync-db delete-db

APP_PACKAGE := com.project_mobile
APP_NAME := project_mobile
DB_NAME ?= seikohealthdb
DOWNLOAD_DIR := /sdcard/Download
LOCAL_DIR := db_backup
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
	@echo   make install              Instala dependencias
	@echo   make outdated             Mostra pacotes desatualizados
	@echo.
	@echo EXECUTAR APP:
	@echo   make start                Inicia Metro Bundler
	@echo   make run-android          Roda no Android
	@echo   make run-ios              Roda no iOS
	@echo.
	@echo BANCO DE DADOS:
	@echo   make pull-db DB_NAME=seu_banco
	@echo   make export-db DB_NAME=seu_banco
	@echo   make delete-db DB_NAME=seu_banco
	@echo   make sync-db              Sincroniza banco a cada 10s
	@echo   make check                Verifica arquivos do banco
	@echo   make status               Status do device
	@echo.
	@echo LIMPEZA:
	@echo   make clean                Remove node_modules
	@echo   make clean-db             Remove backups locais
	@echo   make clean-android        Limpa gradle do Android
	@echo.
	@echo EXEMPLOS:
	@echo   python gen.py repository UserRepository
	@echo   python gen.py screen HomeScreen
	@echo   python gen.py service AuthService
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

copy-to-sdcard:
	@echo [*] Copiando $(DB_NAME).db para SD Card...
	@adb shell "run-as $(APP_PACKAGE) cp $(DB_NAME).db $(DOWNLOAD_DIR)/$(DB_NAME).db" 2>nul || echo [!] Erro ao copiar

pull-db: copy-to-sdcard
	@if not exist $(LOCAL_DIR) mkdir $(LOCAL_DIR)
	@echo [*] Puxando $(DB_NAME) do device...
	adb pull $(DOWNLOAD_DIR)/$(DB_NAME).db $(LOCAL_DIR)/$(DB_NAME).db
	adb pull $(DOWNLOAD_DIR)/$(DB_NAME).db-shm $(LOCAL_DIR)/$(DB_NAME).db-shm 2>nul || echo [*] Arquivo shm nao encontrado
	adb pull $(DOWNLOAD_DIR)/$(DB_NAME).db-wal $(LOCAL_DIR)/$(DB_NAME).db-wal 2>nul || echo [*] Arquivo wal nao encontrado
	@echo.
	@echo [OK] Banco de dados baixado em: $(LOCAL_DIR)/$(DB_NAME).db
	@echo.

export-db:
	@if not exist $(LOCAL_DIR) mkdir $(LOCAL_DIR)
	@echo [*] Exportando $(DB_NAME)...
	adb shell "run-as $(APP_PACKAGE) cat $(DB_NAME).db" > $(LOCAL_DIR)/$(DB_NAME).db
	@echo [OK] Banco exportado para $(LOCAL_DIR)

delete-db:
	@echo [!] Deletando $(DB_NAME) do device...
	adb shell "run-as $(APP_PACKAGE) rm $(DB_NAME).db" 2>nul || echo [*] Arquivo nao encontrado
	@echo [OK] Banco deletado

sync-db:
	@echo [*] Sincronizando banco a cada 10 segundos...
	@echo [*] Pressione Ctrl+C para parar
:loop
	@cls
	@adb shell "run-as $(APP_PACKAGE) cp $(DB_NAME).db $(DOWNLOAD_DIR)/$(DB_NAME).db" >nul 2>&1
	@adb pull $(DOWNLOAD_DIR)/$(DB_NAME).db $(LOCAL_DIR)/$(DB_NAME).db >nul 2>&1
	@echo [OK] Sincronizado
	@timeout /t 10 >nul
	@goto loop

check:
	@echo [*] Verificando arquivos do banco $(DB_NAME)...
	@if exist $(LOCAL_DIR)\$(DB_NAME).db ( dir $(LOCAL_DIR)\$(DB_NAME).db* ) else ( echo [!] Nenhum arquivo encontrado )

status:
	@echo [*] Verificando device...
	adb devices
	@echo.
	@echo [*] Arquivos no device ($(DB_NAME)):
	adb shell "run-as $(APP_PACKAGE) ls -lh $(DB_NAME).db*" 2>nul || echo [!] Nenhum arquivo encontrado

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
	@echo App Package: $(APP_PACKAGE)
	@echo App Name: $(APP_NAME)
	@echo Banco Padrao: $(DB_NAME)
	@echo Device: $(DEVICE)
	@echo.
	@node -v
	@npm -v
	@yarn -v
