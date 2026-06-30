import { THEMES, Theme } from '@/theme/constants';
import {UserRepository} from "@/database/repository/UserRepository.ts";


export const DEFAULT_THEME = THEMES.draculaTheme;


export let CURRENT_THEME: Theme = DEFAULT_THEME;

const repository = new UserRepository();


export const loadThemeFromDB = async () => {
  try {
    const profileCurrent = await repository.getAllProfile();
    const profile = profileCurrent[0]?._raw
      console.log(profile)
    if (!profile?.theme) {
      CURRENT_THEME = DEFAULT_THEME;
      return CURRENT_THEME;
    }

    const themeKey = profile.theme as keyof typeof THEMES;

    CURRENT_THEME = THEMES[themeKey] ?? DEFAULT_THEME;

    console.log('[ThemeManager] Tema carregado:', CURRENT_THEME.name);

    return CURRENT_THEME;
  } catch (error) {
    console.error('[ThemeManager] erro ao carregar tema:', error);
    CURRENT_THEME = DEFAULT_THEME;
    return CURRENT_THEME;
  }
};
