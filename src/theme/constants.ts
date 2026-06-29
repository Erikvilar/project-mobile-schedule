// theme.ts

// theme.ts

export type Theme = {
  name: string;

  colors: {
    background: string;

    surface: string;
    surfaceDim: string;
    surfaceBright: string;

    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    surfaceVariant: string;

    primary: string;
    primaryContainer: string;
    onPrimary: string;
    onPrimaryContainer: string;

    secondary: string;
    secondaryContainer: string;
    onSecondary: string;
    onSecondaryContainer: string;

    tertiary: string;
    tertiaryContainer: string;
    onTertiary: string;
    onTertiaryContainer: string;

    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;

    surfaceTint: string;

    outline: string;
    outlineVariant: string;

    onBackground: string;
    onSurface: string;
    onSurfaceVariant: string;

    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;

    primaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixed: string;
    onPrimaryFixedVariant: string;

    secondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixed: string;
    onSecondaryFixedVariant: string;

    tertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixed: string;
    onTertiaryFixedVariant: string;

    border: string;
    card: string;
    text: string;
    textSecondary: string;
  };
};

export const THEMES: Record<
  | 'CyberElegancy'
  | 'Minimalist'
  | 'TechNoirMinimalist'
  | 'monokaiTheme'
  | 'monokaiProTheme'
  | 'draculaTheme'
  | 'lightTechTheme'
  | 'darkTechTheme'
  | 'softDayTheme'
  | 'chatgptTheme',
  Theme
> = {
  CyberElegancy: {
    name: 'Cyber Elegancy',
    colors: {
      background: '#131318',

      surface: '#131318',
      surfaceDim: '#131318',
      surfaceBright: '#39383e',

      surfaceContainerLowest: '#0e0e13',
      surfaceContainerLow: '#1b1b20',
      surfaceContainer: '#1f1f25',
      surfaceContainerHigh: '#2a292f',
      surfaceContainerHighest: '#35343a',
      surfaceVariant: '#35343a',

      primary: '#ecb2ff',
      primaryContainer: '#bd00ff',
      onPrimary: '#520071',
      onPrimaryContainer: '#ffffff',

      secondary: '#d3fbff',
      secondaryContainer: '#00eefc',
      onSecondary: '#00363a',
      onSecondaryContainer: '#00686f',

      tertiary: '#d5bcf3',
      tertiaryContainer: '#826d9e',
      onTertiary: '#3a2753',
      onTertiaryContainer: '#ffffff',

      error: '#ffb4ab',
      onError: '#690005',
      errorContainer: '#93000a',
      onErrorContainer: '#ffdad6',

      surfaceTint: '#ecb2ff',

      outline: '#9d8ba0',
      outlineVariant: '#514255',

      onBackground: '#e4e1e9',
      onSurface: '#e4e1e9',
      onSurfaceVariant: '#d4c0d7',

      inverseSurface: '#e4e1e9',
      inverseOnSurface: '#303036',
      inversePrimary: '#9900cf',

      primaryFixed: '#f8d8ff',
      primaryFixedDim: '#ecb2ff',
      onPrimaryFixed: '#320047',
      onPrimaryFixedVariant: '#74009f',

      secondaryFixed: '#7df4ff',
      secondaryFixedDim: '#00dbe9',
      onSecondaryFixed: '#002022',
      onSecondaryFixedVariant: '#004f54',

      tertiaryFixed: '#eddcff',
      tertiaryFixedDim: '#d5bcf3',
      onTertiaryFixed: '#24113d',
      onTertiaryFixedVariant: '#513e6b',

      border: '#514255',
      card: '#1f1f25',
      text: '#e4e1e9',
      textSecondary: '#d4c0d7',
    },
  },

  Minimalist: {
    name: 'Minimalist',
    colors: {
      background: '#FFFFFF',

      surface: '#FFFFFF',
      surfaceDim: '#F8F8F8',
      surfaceBright: '#FFFFFF',

      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#FAFAFA',
      surfaceContainer: '#F5F5F5',
      surfaceContainerHigh: '#EFEFEF',
      surfaceContainerHighest: '#E7E7E7',
      surfaceVariant: '#EFEFEF',

      primary: '#111111',
      primaryContainer: '#222222',
      onPrimary: '#FFFFFF',
      onPrimaryContainer: '#FFFFFF',

      secondary: '#6B7280',
      secondaryContainer: '#E5E7EB',
      onSecondary: '#111111',
      onSecondaryContainer: '#111111',

      tertiary: '#9CA3AF',
      tertiaryContainer: '#F3F4F6',
      onTertiary: '#111111',
      onTertiaryContainer: '#111111',

      error: '#DC2626',
      onError: '#FFFFFF',
      errorContainer: '#FEE2E2',
      onErrorContainer: '#7F1D1D',

      surfaceTint: '#111111',

      outline: '#D1D5DB',
      outlineVariant: '#E5E7EB',

      onBackground: '#111111',
      onSurface: '#111111',
      onSurfaceVariant: '#4B5563',

      inverseSurface: '#111111',
      inverseOnSurface: '#FFFFFF',
      inversePrimary: '#000000',

      primaryFixed: '#111111',
      primaryFixedDim: '#222222',
      onPrimaryFixed: '#FFFFFF',
      onPrimaryFixedVariant: '#FFFFFF',

      secondaryFixed: '#E5E7EB',
      secondaryFixedDim: '#D1D5DB',
      onSecondaryFixed: '#111111',
      onSecondaryFixedVariant: '#374151',

      tertiaryFixed: '#F3F4F6',
      tertiaryFixedDim: '#E5E7EB',
      onTertiaryFixed: '#111111',
      onTertiaryFixedVariant: '#374151',

      border: '#E5E7EB',
      card: '#FFFFFF',
      text: '#111111',
      textSecondary: '#6B7280',
    },
  },

  TechNoirMinimalist: {
    name: 'Tech-Noir Minimalist',
    colors: {
      background: '#131314',

      surface: '#131314',
      surfaceDim: '#131314',
      surfaceBright: '#3a393a',

      surfaceContainerLowest: '#0e0e0f',
      surfaceContainerLow: '#1c1b1c',
      surfaceContainer: '#201f20',
      surfaceContainerHigh: '#2a2a2b',
      surfaceContainerHighest: '#353436',
      surfaceVariant: '#353436',

      primary: '#c3f5ff',
      primaryContainer: '#00e5ff',
      onPrimary: '#00363d',
      onPrimaryContainer: '#00626e',

      secondary: '#c1c7cf',
      secondaryContainer: '#41474e',
      onSecondary: '#2b3137',
      onSecondaryContainer: '#afb6bd',

      tertiary: '#ffeac0',
      tertiaryContainer: '#fec931',
      onTertiary: '#3e2e00',
      onTertiaryContainer: '#6f5500',

      error: '#ffb4ab',
      onError: '#690005',
      errorContainer: '#93000a',
      onErrorContainer: '#ffdad6',

      surfaceTint: '#00daf3',

      outline: '#849396',
      outlineVariant: '#3b494c',

      onBackground: '#e5e2e3',
      onSurface: '#e5e2e3',
      onSurfaceVariant: '#bac9cc',

      inverseSurface: '#e5e2e3',
      inverseOnSurface: '#313031',
      inversePrimary: '#006875',

      primaryFixed: '#9cf0ff',
      primaryFixedDim: '#00daf3',
      onPrimaryFixed: '#001f24',
      onPrimaryFixedVariant: '#004f58',

      secondaryFixed: '#dde3eb',
      secondaryFixedDim: '#c1c7cf',
      onSecondaryFixed: '#161c22',
      onSecondaryFixedVariant: '#41474e',

      tertiaryFixed: '#ffdf96',
      tertiaryFixedDim: '#f3bf26',
      onTertiaryFixed: '#251a00',
      onTertiaryFixedVariant: '#594400',

      border: '#3b494c',
      card: '#201f20',
      text: '#e5e2e3',
      textSecondary: '#bac9cc',
    },
  },

  monokaiTheme: {
    name: 'monokai',
    colors: {
      background: '#272822',
      surface: '#3e3d32',
      surfaceDim: '#272822',
      surfaceBright: '#55544d',
      surfaceContainerLowest: '#1e1d1a',
      surfaceContainerLow: '#2a2925',
      surfaceContainer: '#35342d',
      surfaceContainerHigh: '#403f38',
      surfaceContainerHighest: '#4b4a43',
      surfaceVariant: '#49483e',
      primary: '#f92672',
      primaryContainer: '#f92672',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#ffffff',
      secondary: '#fd971f',
      secondaryContainer: '#fd971f',
      onSecondary: '#000000',
      onSecondaryContainer: '#000000',
      tertiary: '#a1efe4',
      tertiaryContainer: '#a1efe4',
      onTertiary: '#000000',
      onTertiaryContainer: '#000000',
      error: '#f92672',
      onError: '#ffffff',
      errorContainer: '#f92672',
      onErrorContainer: '#ffffff',
      surfaceTint: '#f92672',
      outline: '#75715e',
      outlineVariant: '#49483e',
      onBackground: '#f8f8f2',
      onSurface: '#f8f8f2',
      onSurfaceVariant: '#a6a6a6',
      inverseSurface: '#f8f8f2',
      inverseOnSurface: '#272822',
      inversePrimary: '#f92672',
      primaryFixed: '#f92672',
      primaryFixedDim: '#d91f64',
      onPrimaryFixed: '#ffffff',
      onPrimaryFixedVariant: '#ffffff',
      secondaryFixed: '#fd971f',
      secondaryFixedDim: '#e67e22',
      onSecondaryFixed: '#000000',
      onSecondaryFixedVariant: '#000000',
      tertiaryFixed: '#a1efe4',
      tertiaryFixedDim: '#66dcc7',
      onTertiaryFixed: '#000000',
      onTertiaryFixedVariant: '#000000',
      border: '#49483e',
      card: '#3e3d32',
      text: '#f8f8f2',
      textSecondary: '#a6a6a6',
    },
  },

  monokaiProTheme: {
    name: 'monokai-pro',
    colors: {
      background: '#2d2a2e',
      surface: '#423f34',
      surfaceDim: '#2d2a2e',
      surfaceBright: '#5b594c',
      surfaceContainerLowest: '#221f22',
      surfaceContainerLow: '#2d2a2e',
      surfaceContainer: '#423f34',
      surfaceContainerHigh: '#49453f',
      surfaceContainerHighest: '#54504a',
      surfaceVariant: '#49453f',
      primary: '#ff6188',
      primaryContainer: '#ff6188',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#ffffff',
      secondary: '#ffd866',
      secondaryContainer: '#ffd866',
      onSecondary: '#000000',
      onSecondaryContainer: '#000000',
      tertiary: '#a9dc76',
      tertiaryContainer: '#a9dc76',
      onTertiary: '#000000',
      onTertiaryContainer: '#000000',
      error: '#ff6188',
      onError: '#ffffff',
      errorContainer: '#ff6188',
      onErrorContainer: '#ffffff',
      surfaceTint: '#ff6188',
      outline: '#727072',
      outlineVariant: '#49453f',
      onBackground: '#f8f8f2',
      onSurface: '#f8f8f2',
      onSurfaceVariant: '#b8b8b8',
      inverseSurface: '#f8f8f2',
      inverseOnSurface: '#2d2a2e',
      inversePrimary: '#ff6188',
      primaryFixed: '#ff6188',
      primaryFixedDim: '#e04266',
      onPrimaryFixed: '#ffffff',
      onPrimaryFixedVariant: '#ffffff',
      secondaryFixed: '#ffd866',
      secondaryFixedDim: '#e6c547',
      onSecondaryFixed: '#000000',
      onSecondaryFixedVariant: '#000000',
      tertiaryFixed: '#a9dc76',
      tertiaryFixedDim: '#7ec850',
      onTertiaryFixed: '#000000',
      onTertiaryFixedVariant: '#000000',
      border: '#49453f',
      card: '#423f34',
      text: '#f8f8f2',
      textSecondary: '#b8b8b8',
    },
  },

  draculaTheme: {
    name: 'dracula',
    colors: {
      background: '#282a36',
      surface: '#44475a',
      surfaceDim: '#282a36',
      surfaceBright: '#6272a4',
      surfaceContainerLowest: '#21222c',
      surfaceContainerLow: '#282a36',
      surfaceContainer: '#44475a',
      surfaceContainerHigh: '#565c74',
      surfaceContainerHighest: '#6272a4',
      surfaceVariant: '#44475a',
      primary: '#ff79c6',
      primaryContainer: '#ff79c6',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#ffffff',
      secondary: '#50fa7b',
      secondaryContainer: '#50fa7b',
      onSecondary: '#000000',
      onSecondaryContainer: '#000000',
      tertiary: '#8be9fd',
      tertiaryContainer: '#8be9fd',
      onTertiary: '#000000',
      onTertiaryContainer: '#000000',
      error: '#ff5555',
      onError: '#ffffff',
      errorContainer: '#ff5555',
      onErrorContainer: '#ffffff',
      surfaceTint: '#ff79c6',
      outline: '#6272a4',
      outlineVariant: '#44475a',
      onBackground: '#f8f8f2',
      onSurface: '#f8f8f2',
      onSurfaceVariant: '#a1a1a1',
      inverseSurface: '#f8f8f2',
      inverseOnSurface: '#282a36',
      inversePrimary: '#ff79c6',
      primaryFixed: '#ff79c6',
      primaryFixedDim: '#d64a9f',
      onPrimaryFixed: '#ffffff',
      onPrimaryFixedVariant: '#ffffff',
      secondaryFixed: '#50fa7b',
      secondaryFixedDim: '#35d960',
      onSecondaryFixed: '#000000',
      onSecondaryFixedVariant: '#000000',
      tertiaryFixed: '#8be9fd',
      tertiaryFixedDim: '#50d9f0',
      onTertiaryFixed: '#000000',
      onTertiaryFixedVariant: '#000000',
      border: '#44475a',
      card: '#44475a',
      text: '#f8f8f2',
      textSecondary: '#a1a1a1',
    },
  },

  lightTechTheme: {
    name: 'light-tech',
    colors: {
      background: '#f5f5f7',
      surface: '#ffffff',
      surfaceDim: '#ebebf0',
      surfaceBright: '#ffffff',
      surfaceContainerLowest: '#f5f5f7',
      surfaceContainerLow: '#fafbfc',
      surfaceContainer: '#f3f3f6',
      surfaceContainerHigh: '#edeef3',
      surfaceContainerHighest: '#e8e8ed',
      surfaceVariant: '#e5e5ea',
      primary: '#0071e3',
      primaryContainer: '#e0efff',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#0071e3',
      secondary: '#34c759',
      secondaryContainer: '#d1fada',
      onSecondary: '#ffffff',
      onSecondaryContainer: '#34c759',
      tertiary: '#ff9500',
      tertiaryContainer: '#ffe4c8',
      onTertiary: '#ffffff',
      onTertiaryContainer: '#ff9500',
      error: '#ff3b30',
      onError: '#ffffff',
      errorContainer: '#ffebee',
      onErrorContainer: '#ff3b30',
      surfaceTint: '#0071e3',
      outline: '#c7c7cc',
      outlineVariant: '#e5e5ea',
      onBackground: '#1d1d1f',
      onSurface: '#1d1d1f',
      onSurfaceVariant: '#86868b',
      inverseSurface: '#1d1d1f',
      inverseOnSurface: '#ffffff',
      inversePrimary: '#64b5f6',
      primaryFixed: '#e0efff',
      primaryFixedDim: '#b3e5fc',
      onPrimaryFixed: '#0071e3',
      onPrimaryFixedVariant: '#0050a8',
      secondaryFixed: '#d1fada',
      secondaryFixedDim: '#a8f5c8',
      onSecondaryFixed: '#34c759',
      onSecondaryFixedVariant: '#248a3d',
      tertiaryFixed: '#ffe4c8',
      tertiaryFixedDim: '#ffd4a8',
      onTertiaryFixed: '#ff9500',
      onTertiaryFixedVariant: '#cc7700',
      border: '#e5e5ea',
      card: '#ffffff',
      text: '#1d1d1f',
      textSecondary: '#86868b',
    },
  },

  darkTechTheme: {
    name: 'dark-tech',
    colors: {
      background: '#0a0e27',
      surface: '#111829',
      surfaceDim: '#0a0e27',
      surfaceBright: '#1a1f3a',
      surfaceContainerLowest: '#050719',
      surfaceContainerLow: '#0a0e27',
      surfaceContainer: '#111829',
      surfaceContainerHigh: '#1a1f3a',
      surfaceContainerHighest: '#242d4a',
      surfaceVariant: '#1a1f3a',
      primary: '#4a90e2',
      primaryContainer: '#1a3a5c',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#4a90e2',
      secondary: '#00d4ff',
      secondaryContainer: '#003a47',
      onSecondary: '#000000',
      onSecondaryContainer: '#00d4ff',
      tertiary: '#7c3aed',
      tertiaryContainer: '#3d1f5c',
      onTertiary: '#ffffff',
      onTertiaryContainer: '#7c3aed',
      error: '#ff6b6b',
      onError: '#ffffff',
      errorContainer: '#5a2c2c',
      onErrorContainer: '#ff6b6b',
      surfaceTint: '#4a90e2',
      outline: '#3a4560',
      outlineVariant: '#1a1f3a',
      onBackground: '#e3e8f3',
      onSurface: '#e3e8f3',
      onSurfaceVariant: '#8b92a9',
      inverseSurface: '#e3e8f3',
      inverseOnSurface: '#0a0e27',
      inversePrimary: '#6ba3e5',
      primaryFixed: '#1a3a5c',
      primaryFixedDim: '#0f2844',
      onPrimaryFixed: '#ffffff',
      onPrimaryFixedVariant: '#4a90e2',
      secondaryFixed: '#003a47',
      secondaryFixedDim: '#002a33',
      onSecondaryFixed: '#ffffff',
      onSecondaryFixedVariant: '#00d4ff',
      tertiaryFixed: '#3d1f5c',
      tertiaryFixedDim: '#2d1542',
      onTertiaryFixed: '#ffffff',
      onTertiaryFixedVariant: '#7c3aed',
      border: '#1a1f3a',
      card: '#111829',
      text: '#e3e8f3',
      textSecondary: '#8b92a9',
    },
  },

  softDayTheme: {
    name: 'soft-day',
    colors: {
      background: '#fafbfc',
      surface: '#ffffff',
      surfaceDim: '#f0f1f3',
      surfaceBright: '#ffffff',
      surfaceContainerLowest: '#f5f6f8',
      surfaceContainerLow: '#fcfdfe',
      surfaceContainer: '#f9fafc',
      surfaceContainerHigh: '#f3f4f6',
      surfaceContainerHighest: '#ebeef2',
      surfaceVariant: '#e7eaef',
      primary: '#6366f1',
      primaryContainer: '#e0e7ff',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#6366f1',
      secondary: '#ec4899',
      secondaryContainer: '#fce7f3',
      onSecondary: '#ffffff',
      onSecondaryContainer: '#ec4899',
      tertiary: '#f59e0b',
      tertiaryContainer: '#fef3c7',
      onTertiary: '#ffffff',
      onTertiaryContainer: '#f59e0b',
      error: '#ef4444',
      onError: '#ffffff',
      errorContainer: '#fee2e2',
      onErrorContainer: '#ef4444',
      surfaceTint: '#6366f1',
      outline: '#d1d5db',
      outlineVariant: '#e7eaef',
      onBackground: '#374151',
      onSurface: '#374151',
      onSurfaceVariant: '#9ca3af',
      inverseSurface: '#374151',
      inverseOnSurface: '#ffffff',
      inversePrimary: '#a5b4fc',
      primaryFixed: '#e0e7ff',
      primaryFixedDim: '#c7d2fc',
      onPrimaryFixed: '#6366f1',
      onPrimaryFixedVariant: '#4f46e5',
      secondaryFixed: '#fce7f3',
      secondaryFixedDim: '#fbcfe8',
      onSecondaryFixed: '#ec4899',
      onSecondaryFixedVariant: '#db2777',
      tertiaryFixed: '#fef3c7',
      tertiaryFixedDim: '#fde68a',
      onTertiaryFixed: '#f59e0b',
      onTertiaryFixedVariant: '#d97706',
      border: '#e5e7eb',
      card: '#ffffff',
      text: '#374151',
      textSecondary: '#9ca3af',
    },
  },

  chatgptTheme: {
    name: 'chatgptTheme',
    colors: {
      background: '#ffffff',
      surface: '#f7f7f8',
      surfaceDim: '#ececf1',
      surfaceBright: '#ffffff',
      surfaceContainerLowest: '#f7f7f8',
      surfaceContainerLow: '#fafbfc',
      surfaceContainer: '#f7f7f8',
      surfaceContainerHigh: '#ececf1',
      surfaceContainerHighest: '#d1d5db',
      surfaceVariant: '#ececf1',
      primary: '#10a37f',
      primaryContainer: '#d1f1e8',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#10a37f',
      secondary: '#6366f1',
      secondaryContainer: '#e0e7ff',
      onSecondary: '#ffffff',
      onSecondaryContainer: '#6366f1',
      tertiary: '#8b5cf6',
      tertiaryContainer: '#f3e8ff',
      onTertiary: '#ffffff',
      onTertiaryContainer: '#8b5cf6',
      error: '#ff4444',
      onError: '#ffffff',
      errorContainer: '#ffe4e4',
      onErrorContainer: '#ff4444',
      surfaceTint: '#10a37f',
      outline: '#d1d5db',
      outlineVariant: '#e5e7eb',
      onBackground: '#0d0d0d',
      onSurface: '#0d0d0d',
      onSurfaceVariant: '#565869',
      inverseSurface: '#0d0d0d',
      inverseOnSurface: '#ffffff',
      inversePrimary: '#5ec983',
      primaryFixed: '#d1f1e8',
      primaryFixedDim: '#a8e6d7',
      onPrimaryFixed: '#10a37f',
      onPrimaryFixedVariant: '#0d7e5f',
      secondaryFixed: '#e0e7ff',
      secondaryFixedDim: '#c7d2fc',
      onSecondaryFixed: '#6366f1',
      onSecondaryFixedVariant: '#4f46e5',
      tertiaryFixed: '#f3e8ff',
      tertiaryFixedDim: '#e9d5ff',
      onTertiaryFixed: '#8b5cf6',
      onTertiaryFixedVariant: '#7c3aed',
      border: '#d1d5db',
      card: '#f7f7f8',
      text: '#0d0d0d',
      textSecondary: '#565869',
    },
  },
};



export const DEFAULT_THEME =
  THEMES.monokaiTheme;