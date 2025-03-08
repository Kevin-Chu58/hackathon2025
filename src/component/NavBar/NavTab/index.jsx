import { Box, Button } from "@mui/material";
import { deepOrange, lime, orange } from "@mui/material/colors";
import NavButton from "../NavButton";

const NavTab = ({isFocus, startIcon, endIcon, children}) => {

    return (
        <Box sx={{
            borderBottom: `2px transparent solid`,
            borderColor: isFocus ? deepOrange[300] : "transparent",
            pb: 1,
        }}>
            <NavButton isFocus={isFocus} startIcon={startIcon} endIcon={endIcon}>
                {children}
            </NavButton>
        </Box>
    )
}

export default NavTab;