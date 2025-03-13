import {
    Container,
    Divider,
    Grid2 as Grid,
    Paper,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CookBookDish from "./CookBookDish";

const cookbookDishes = [
    {
        _id: "abcdefg",
        name: "tomato scrambled eggs",
        realName: "番茄炒蛋",
        rating: 4.6,
        href: "https://www.sidechef.com/recipe/9103268d-f5cc-4415-bf98-37e16513045f.jpg?d=1408x1120",
        ingredients: [
            "Chopped tomatoes",
            "Beaten eggs",
            "Oil",
            "Sugar",
            "Salt",
        ],
        step_dict: {
            "0": "Pour oil into the pan and heat it.",
            "1": "Pour the beaten eggs into the pan and stir-fry.",
            "2": "Take out the scrambled eggs and set them aside.",
            "3": "Add the tomatoes to the pan and stir-fry.",
            "4": "Add the scrambled eggs back, then add salt, sugar, and some water, and stir-fry.",
            "5": "Serve the tomato scrambled eggs.",
        }
    },
];

const CookBook = () => {

    return (
        <Container id="cookbook" sx={{ p: 4 }}>
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
                        {cookbookDishes.map((dish) => 
                            <CookBookDish key={dish._id} dish={dish}/>)}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CookBook;
