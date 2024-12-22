import React, { useEffect } from 'react';
import { RiSunFill } from "react-icons/ri";
import { useUserPreferencesStore } from '@/weatherForecast/stores/UserStore/UserPreferences.provider';
import { useTranslations } from 'next-intl';
import { RiMoonFill } from "react-icons/ri";

const DarkModeToggle = () => {
    const t = useTranslations()
    const theme = useUserPreferencesStore(store => store.theme)
    const changeTheme = useUserPreferencesStore(store => store.changeTheme)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        if(theme == "dark") {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        changeTheme(theme == "light" ? "dark" : "light")
    };

    return (
        <div className="flex items-center justify-center p-4">
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    checked={theme === 'light'}
                    onChange={toggleTheme}
                    className="hidden"
                />

                <div className="swap-on flex items-center gap-2 dark:text-white text-gray-800">
                    <RiMoonFill className="h-6 w-6" color={theme == "light" ? "black" : "white"} />
                    <span className="text-sm font-medium">{t("dark")}</span>
                </div>

                <div className="swap-off flex items-center gap-2 dark:text-white text-gray-800">
                    <RiSunFill className="h-6 w-6" color={theme == "light" ? "black" : "white"} />
                    <span className="text-sm font-medium dark:text-white">{t("light")}</span>
                </div>
            </label>
        </div>
    );
};

export default DarkModeToggle;