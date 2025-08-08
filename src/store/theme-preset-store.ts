import { getThemes } from '@/actions/themes';
import { ThemePreset } from '@/types/theme';
import { defaultPresets } from '@/utils/theme-presets';
import { create } from 'zustand';

interface ThemePresetStore {
  presets: Record<string, ThemePreset>;
  registerPreset: (name: string, presets: ThemePreset) => void;
  unregisterPreset: (name: string) => void;
  updatePreset: (name: string, presets: ThemePreset) => void;
  getPreset: (name: string) => ThemePreset | undefined;
  getAllPresets: () => Record<string, ThemePreset>;
  loadSavedPresets: () => Promise<void>;
  unloadSavedPresets: () => void;
}

export const useThemePresetStore = create<ThemePresetStore>()((set, get) => ({
  presets: defaultPresets,
  registerPreset: (name: string, presets: ThemePreset) => {
    set((state) => ({
      presets: {
        ...state.presets,
        [name]: presets,
      },
    }));
  },
  unregisterPreset: (name: string) => {
    set((state) => {
      const { [name]: _, ...remainingPresets } = state.presets;
      return { presets: remainingPresets };
    });
  },
  loadSavedPresets: async () => {
    try {
      const savedThemes = await getThemes();
      const savedPresets = savedThemes.reduce(
        (acc, theme) => {
          acc[theme.id] = {
            label: theme.name,
            styles: theme.styles,
            source: 'SAVED',
          };
          return acc;
        },
        {} as Record<string, ThemePreset>
      );
      set((state) => ({
        presets: {
          ...state.presets,
          ...savedPresets,
        },
      }));
    } catch (error) {
      console.error('Error loading saved presets', error);
    }
  },
  unloadSavedPresets: () => {
    set({ presets: defaultPresets });
  },
  updatePreset: (name: string, presets: ThemePreset) => {
    set((state) => ({
      presets: {
        ...state.presets,
        [name]: presets,
      },
    }));
  },
  getPreset: (name: string) => {
    return get().presets[name];
  },
  getAllPresets: () => {
    return get().presets;
  },
}));
