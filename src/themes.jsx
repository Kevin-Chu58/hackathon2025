import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            50: '#fcf4e7',
            100: '#f9e2c4',
            200: '#f7d19f',
            300: '#f4be7d',
            400: '#f1b169',
            500: '#eca661',
            600: '#e79b5c',
            700: '#de8e56',
            800: '#d58252',
            900: '#c4714e',
            main: '#d58252', // 800
            light: '#eca661', // 500
            dark: '#c4714e', // 900
            contrastText: '#fff',
        },
        secondary: {
            50: '#e3f4fa',
            100: '#b9e3f3',
            200: '#8fd1ea',
            300: '#6ebfe1',
            400: '#5cb2db',
            500: '#52a5d5',
            600: '#4b97c7',
            700: '#4385b3',
            800: '#3e749f',
            900: '#31557c',
            main: '#52a5d5', // 500
            light: '#8fd1ea', // 200
            dark: '#4385b3', // 700
            contrastText: '#000',
        },
    }
})

export default theme;