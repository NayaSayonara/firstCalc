import { createTheme } from "@mui/material";
import { unstable_getThemeValue } from "@mui/system";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary:{ main:"#9984D4"},
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                   borderRadius: 20,
                },
            },
        },
     },
        typography:{
            button:{
                fontSize:"1.5rem"
            },
        },
    
});

export default theme;
