import { useEditorStore } from "@/store/editor-store";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const useThemePresetFromUrl = () => {
  const [preset, setPreset] = useQueryState("theme");
  const applyThemePreset = useEditorStore((state) => state.applyThemePreset);

  // Apply the theme preset from the URL if it exists and clear the URL
  useEffect(() => {
    if (preset) {
      applyThemePreset(preset);
      setPreset(null); // Clear the URL
    }
  }, [preset, setPreset, applyThemePreset]);
};
