import { Box } from "@mui/material";
import { deepOrange, cyan } from "@mui/material/colors";
import NavButton from "../NavBar/NavButton";

const NavTab = ({ isFocus, startIcon, endIcon, onClick, children }) => {
    return (
        <Box
            sx={{
                borderBottom: `2px transparent solid`,
                borderColor: isFocus ? cyan[300] : "transparent",
                pb: 1,
            }}
        >
            <NavButton
                isFocus={isFocus}
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={onClick}
            >
                {children}
            </NavButton>
        </Box>
    );
};

export default NavTab;
