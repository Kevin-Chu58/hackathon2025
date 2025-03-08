import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const NavButton = ({ isFocus, children }) => {
    return (
        <Button
            disableRipple
            sx={{
                textTransform: "none",
                color: grey[200],
                px: 1,
                py: 0.5,
                fontSize: 14,
                fontWeight: isFocus ? "bold" : "none",
                minWidth: 0,
                ":hover": {
                    background: grey[900],
                },
            }}
        >
            {children}
        </Button>
    );
};

export default NavButton;
