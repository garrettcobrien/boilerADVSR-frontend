import { createTheme } from '@mui/material/styles';
import {red} from '@mui/material/colors';
const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1E1E1E',
        },
        secondary: {
            main: '#ceb888',
        },
        text: {
            primary: '#ffffff',
        },
        background: {
            default: '#1e1e1e',
            paper: '#ceb888',
        },
    },
    typography: {
          fontFamily: [
            'Poppins',
            'sans-serif',
          ].join(','),
    },
});

export default theme;

