import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '375px',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            prefix: 'GoZupees',
            layout: {
                radius: {
                    // small: '0px',
                    // medium: '28px',
                    // large: '28px',
                },
            },
            themes: {
                light: {
                    colors: {
                        background: '#ffffff',
                        // default: {
                        //     DEFAULT: '#101010',
                        //     100: '#f2f2f2',
                        //     200: '#d9d9d9',
                        //     300: '#bfbfbf',
                        //     400: '#a6a6a6',
                        //     500: '#8c8c8c',
                        //     600: '#737373',
                        //     700: '#595959',
                        //     800: '#404040',
                        //     900: '#101010',
                        // },
                        foreground: '#101010',
                        light: '#FFFFFF',
                        white: '#FFFFFF',
                        divider: '#E8E8E8',
                        primary: {
                            DEFAULT: '#5350F9',
                            foreground: '#101010',
                        },
                        secondary: {
                            DEFAULT: '#262467',
                        },
                        success: {
                            DEFAULT: '#20C230',
                            100: '#ECFEED',
                        },
                        danger: {
                            DEFAULT: '#F90000',
                            100: '#FEECED',
                        },
                        warning: {
                            DEFAULT: '#FF7A1A',
                            100: '#FFE7D5',
                            600: '#FF7A1A',
                        },
                        greyed: {
                            DEFAULT: '#757575',
                            100: '#ECECEC',
                        },
                        info: '#0294FF',
                        'GoZupees-blue': '#5350F9',
                        violet: '#5350F9',
                        pink: '#E84187',
                        focus: '#0094ff',
                        // content1: '#101010',
                        content2: '#444444',
                    },
                },
                dark: {
                    colors: {
                        background: '#3f3f46',
                        foreground: '#f8f8f8',
                        light: '#000000',
                        white: '#000000',
                        divider: '#5d5d5d',
                        primary: {
                            DEFAULT: '#0094ff',
                            foreground: '#101010',
                        },
                        secondary: {
                            DEFAULT: '#0094ff',
                        },
                        danger: '#C22020',
                        focus: '#0094ff',
                    },
                },
            },
        }),
    ],
};
