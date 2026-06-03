import { tableSchema } from '@nozbe/watermelondb';

export const appConfigSchema = tableSchema({
  name: 'app_config',
  columns: [
    { name: 'key', type: 'string', isIndexed: true }, // Chave única
    { name: 'value', type: 'string' }, // Valor em JSON
    { name: 'description', type: 'string', isOptional: true }, // Descrição
    { name: 'type', type: 'string' }, // 'boolean' | 'string' | 'number' | 'json'
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

/**
 * Chaves de Configuração do App
 * Use essas constantes para evitar erros de digitação
 */
export const APP_CONFIG_KEYS = {
  // ===== ONBOARDING =====
  SKIP_INTRO: 'skipIntro',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  FIRST_LAUNCH: 'firstLaunch',

  // ===== USUÁRIO =====
  USER_ID: 'userId',
  USER_NAME: 'userName',
  USER_EMAIL: 'userEmail',
  USER_PROFILE_IMAGE: 'userProfileImage',
  USER_AGE: 'userAge',
  USER_GENDER: 'userGender',
  USER_WEIGHT: 'userWeight',
  USER_HEIGHT: 'userHeight',
  USER_GOAL: 'userGoal', // 'perder_peso' | 'ganhar_musculo' | 'saude'

  // ===== METAS DIÁRIAS =====
  DAILY_STEPS_GOAL: 'dailyStepsGoal',
  DAILY_CALORIES_GOAL: 'dailyCaloriesGoal',
  DAILY_WATER_GOAL: 'dailyWaterGoal',
  DAILY_WORKOUT_GOAL: 'dailyWorkoutGoal',

  // ===== TEMA E VISUAL =====
  THEME_MODE: 'themeMode', // 'light' | 'dark' | 'auto'
  PRIMARY_COLOR: 'primaryColor',
  LANGUAGE: 'language', // 'pt' | 'en' | 'es'

  // ===== NOTIFICAÇÕES =====
  NOTIFICATIONS_ENABLED: 'notificationsEnabled',
  WATER_REMINDER_ENABLED: 'waterReminderEnabled',
  WATER_REMINDER_INTERVAL: 'waterReminderInterval', // em minutos
  WORKOUT_REMINDER_ENABLED: 'workoutReminderEnabled',
  STEPS_REMINDER_ENABLED: 'stepsReminderEnabled',

  // ===== RASTREAMENTO =====
  STEP_TRACKING_ENABLED: 'stepTrackingEnabled',
  GPS_TRACKING_ENABLED: 'gpsTrackingEnabled',
  HEART_RATE_TRACKING_ENABLED: 'heartRateTrackingEnabled',
  AUTO_PAUSE_WORKOUT: 'autoPauseWorkout',

  // ===== DADOS SENSÍVEIS =====
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  IS_PREMIUM: 'isPremium',
  PREMIUM_EXPIRES_AT: 'premiumExpiresAt',

  // ===== SINCRONIZAÇÃO =====
  LAST_SYNC: 'lastSync',
  SYNC_ENABLED: 'syncEnabled',
  AUTO_SYNC_INTERVAL: 'autoSyncInterval', // em minutos

  // ===== PRIVACIDADE =====
  ANALYTICS_ENABLED: 'analyticsEnabled',
  CRASH_REPORT_ENABLED: 'crashReportEnabled',
  SHARE_DATA_ENABLED: 'shareDataEnabled',

  // ===== DADOS LOCAIS =====
  LAST_STEPS_SYNC: 'lastStepsSync',
  CACHE_WORKOUTS: 'cacheWorkouts',
  OFFLINE_MODE_ENABLED: 'offlineModeEnabled',

  // ===== VERSÃO DO APP =====
  APP_VERSION: 'appVersion',
  LAST_UPDATE_CHECK: 'lastUpdateCheck',

  // ===== DADOS DE SESSÃO =====
  CURRENT_WORKOUT_ID: 'currentWorkoutId',
  WORKOUT_PAUSED: 'workoutPaused',
  WORKOUT_PAUSE_TIME: 'workoutPauseTime',
} as const;

/**
 * Valores padrão para as configurações
 */
export const DEFAULT_APP_CONFIG = {
  [APP_CONFIG_KEYS.SKIP_INTRO]: 'false',
  [APP_CONFIG_KEYS.ONBOARDING_COMPLETED]: 'false',
  [APP_CONFIG_KEYS.FIRST_LAUNCH]: 'true',

  [APP_CONFIG_KEYS.DAILY_STEPS_GOAL]: '10000',
  [APP_CONFIG_KEYS.DAILY_CALORIES_GOAL]: '2500',
  [APP_CONFIG_KEYS.DAILY_WATER_GOAL]: '8',
  [APP_CONFIG_KEYS.DAILY_WORKOUT_GOAL]: '60', // minutos

  [APP_CONFIG_KEYS.THEME_MODE]: 'light',
  [APP_CONFIG_KEYS.PRIMARY_COLOR]: '#000000',
  [APP_CONFIG_KEYS.LANGUAGE]: 'pt',

  [APP_CONFIG_KEYS.NOTIFICATIONS_ENABLED]: 'true',
  [APP_CONFIG_KEYS.WATER_REMINDER_ENABLED]: 'true',
  [APP_CONFIG_KEYS.WATER_REMINDER_INTERVAL]: '60', // 1 hora
  [APP_CONFIG_KEYS.WORKOUT_REMINDER_ENABLED]: 'true',
  [APP_CONFIG_KEYS.STEPS_REMINDER_ENABLED]: 'true',

  [APP_CONFIG_KEYS.STEP_TRACKING_ENABLED]: 'true',
  [APP_CONFIG_KEYS.GPS_TRACKING_ENABLED]: 'false',
  [APP_CONFIG_KEYS.HEART_RATE_TRACKING_ENABLED]: 'false',
  [APP_CONFIG_KEYS.AUTO_PAUSE_WORKOUT]: 'true',

  [APP_CONFIG_KEYS.ANALYTICS_ENABLED]: 'true',
  [APP_CONFIG_KEYS.CRASH_REPORT_ENABLED]: 'true',
  [APP_CONFIG_KEYS.SHARE_DATA_ENABLED]: 'false',

  [APP_CONFIG_KEYS.SYNC_ENABLED]: 'true',
  [APP_CONFIG_KEYS.AUTO_SYNC_INTERVAL]: '30', // 30 minutos

  [APP_CONFIG_KEYS.OFFLINE_MODE_ENABLED]: 'false',
};
