import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: "#fff"
        },
        secondary: {
            main: yellow[500],
            dark: yellow[400],
            light: yellow[300],
            contrastText: "#fff"
        },
        background: {
            paper: "#303134",
            default: "#202124"
        }
    },
    typography: {
        allVariants: {
            color: 'white',
        }
    },
});