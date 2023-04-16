import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: cyan[700],
            dark: cyan[800],
            light: cyan[500],
            contrastText: "#fff"
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: "#fff"
        },
        background: {
            paper: "#fff",
            default: "#f7f6f3"
        }
    }
});