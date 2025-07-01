import { useEffect, useMemo, useState } from 'react';

const ThemeProps = {
    key: 'theme',
    light: 'light',
    dark: 'dark',
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export default function useTheme(defaultTheme?: Theme) {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;

        return storedTheme || (defaultTheme ?? ThemeProps.light);
    });

    const isDark = useMemo(() => theme === ThemeProps.dark, [theme]);

    const isLight = useMemo(() => theme === ThemeProps.light, [theme]);

    const updateTheme = (thm: Theme) => {
        localStorage.setItem(ThemeProps.key, thm);
        document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
        document.documentElement.classList.add(thm);
        setTheme(thm);
    };

    const setLightTheme = () => updateTheme(ThemeProps.light);

    const setDarkTheme = () => updateTheme(ThemeProps.dark);

    const toggleTheme = () => (theme === ThemeProps.dark ? setLightTheme() : setDarkTheme());

    useEffect(() => {
        updateTheme(theme);
    });

    return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
}
