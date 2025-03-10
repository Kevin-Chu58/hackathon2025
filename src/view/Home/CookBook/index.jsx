import {
    Container,
    Divider,
    Grid2 as Grid,
    Paper,
    Rating,
    Typography,
} from "@mui/material";
import "../../../asset/css/solitreo.css";
import { cyan, grey } from "@mui/material/colors";

const cookbookDishes = [
    {
        name: "stir-fried tomato and scrambled eggs",
        realName: "番茄炒蛋",
        rating: 4.6,
        href: "https://www.sidechef.com/recipe/9103268d-f5cc-4415-bf98-37e16513045f.jpg?d=1408x1120",
    },
];

const CookBook = () => {
    const cookbookDish = (dish) => {
        return (
            <Grid size={3} p={4}>
                <Paper
                    elevation={4}
                    sx={{
                        background: "#ffffff11",
                        overflow: "hidden",
                        color: "inherit",
                    }}
                >
                    {/* image content */}
                    <img width="100%" src={dish.href} />

                    <Grid
                        px={1}
                        sx={{ display: "flex", alignItems: "center", mt: -3.5 }}
                    >
                        <Rating
                            size="small"
                            value={dish.rating}
                            precision={0.1}
                            readOnly
                        />
                        <Typography sx={{ fontFamily: "cursive" }}>
                            {dish.rating}
                        </Typography>
                    </Grid>
                    {/* paper content */}
                    <Grid size={12} p={1} 
                            sx={{
                                fontFamily: "Solitreo",
                                cursor: "pointer",
                                ":hover": {
                                    color: "cyan",
                                }
                            }}>
                        <Typography
                            sx={{
                                fontFamily: "inherit",
                                textTransform: "capitalize",
                            }}
                        >
                            {dish.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "inherit",
                            }}
                        >
                            ({dish.realName})
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        );
    };

    return (
        <Container sx={{ p: 4 }}>
            <Paper
                sx={{
                    bgcolor: "inherit",
                    boxShadow: "none",
                    border: `1px ${grey[800]} solid`,
                }}
            >
                <Grid container color="white">
                    <Grid
                        size={12}
                        py={0.5}
                        px={1}
                        sx={{ background: "#ffffff11" }}
                    >
                        <Typography
                            variant="h5"
                            letterSpacing={1}
                            sx={{ fontFamily: "Solitreo", pt: 1 }}
                        >
                            AI Chief's CookBook
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Divider
                            variant="fullWidth"
                            flexItem
                            sx={{ bgcolor: grey[800] }}
                        />
                    </Grid>
                    <Grid size={12} p={1} spacing={1}>
                        {cookbookDishes.map((dish) => cookbookDish(dish))}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CookBook;
