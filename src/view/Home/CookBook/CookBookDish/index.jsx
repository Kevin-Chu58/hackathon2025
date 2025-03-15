import {
    Typography,
    Grid2 as Grid,
    Paper,
    Rating,
    Menu,
    Container,
    Divider,
    Box,
    Chip,
    Button,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { green, grey } from "@mui/material/colors";
import React from "react";
import cookbookService from "../../../../service/cookbook.ts";
import sortUtils from "../../../../utils/sort.js";
import matchUtils from "../../../../utils/match.js";
import cookbookUtils from "../../../../utils/cookbook.js";
import imgs from "../../../../asset/img/imgs";
import "./index.css";
import { useNavigate } from "react-router-dom";

const rating = 4.6;

const CookBookDish = ({ dish }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [ingredientFocus, setIngredientFocus] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [keywordMap, setKeywordMap] = useState();
    const [dishIngredients, setDishIngredients] = useState([]);
    const navigateTo = useNavigate();

    const navigateToCooking = () => {
        navigateTo(`/cooking/${dish.recipe_name}`);
    };

    const initKeywords = async () => {
        const annotations = [
            "scrambled eggs",
            "tomatoes",
            "tomato",
            "water",
            "sugar",
            "salt",
            "eggs",
            "oil",
        ];

        if (keywords.length === 0) {
            let groupSteps = getGroupSteps(Object.values(dish.step_dict));
            annotations = await cookbookService.getFoodAnnotation(
                groupSteps
            );
            annotations.push(dish.recipe_name.toLowerCase());
            annotations.sort((a, b) => sortUtils.sortStrings(b, a));
            // append water to ingredients if not
            let ingredients = cookbookUtils.adjustDishIngredients(
                annotations,
                dish.ingredients,
                setDishIngredients
            );
            // create keyword mapping
            let newKeywords = cookbookUtils.createKeywordMap(ingredients, annotations, setKeywordMap);
            setKeywords(newKeywords);
        }
    };

    const resetIngredient = () => {
        setIngredientFocus("");
    };

    const getGroupSteps = (steps) => {
        return steps.join(" ");
    };

    useEffect(() => {
        if (isExpanded) {
            initKeywords();
        }
    });

    useEffect(() => {}, [ingredientFocus]);

    return (
        <Grid size={3} p={4}>
            <Paper
                className="cookbook-paper"
                elevation={4}
                sx={{
                    background: grey[900],
                    overflow: "hidden",
                    color: "inherit",
                    transition:
                        "position .2s ease-in-out, width .2s ease-in-out",
                }}
            >
                {/* image content */}
                <img width="100%" src={imgs[dish.recipe_name]} />
                <Grid
                    px={1}
                    sx={{ display: "flex", alignItems: "center", mt: -3.5 }}
                >
                    <Rating
                        size="small"
                        value={rating}
                        precision={0.1}
                        readOnly
                    />
                    <Typography sx={{ fontFamily: "cursive" }}>
                        {rating}
                    </Typography>
                </Grid>
                {/* paper content */}
                <Grid
                    size={12}
                    p={1}
                    sx={{
                        fontFamily: "Solitreo",
                        cursor: "pointer",
                        ":hover": {
                            color: "cyan",
                        },
                    }}
                    onClick={() => setIsExpanded((b) => !b)}
                >
                    <Typography
                        sx={{
                            fontFamily: "inherit",
                            textTransform: "capitalize",
                        }}
                    >
                        {dish.recipe_name}
                    </Typography>
                </Grid>
            </Paper>

            <Menu
                sx={{
                    transition: "background .2s ease-in",
                    "& .MuiMenu-paper": {
                        background: "black",
                        color: "white",
                        border: `1px ${grey[800]} solid`,
                        "& .MuiMenu-list": {
                            p: 0,
                        },
                    },
                }}
                anchorEl={document.getElementById("root")}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                open={isExpanded}
                onClose={() => setIsExpanded(false)}
            >
                <Container maxWidth="md" p={0} disableGutters>
                    <Grid
                        container
                        alignItems="flex-start"
                        sx={{ background: grey[900] }}
                    >
                        <Grid container size={3} sx={{ pb: 0.5 }}>
                            {/* image content */}
                            <Grid size={12}>
                                <img
                                    width="100%"
                                    src={imgs[dish.recipe_name]}
                                    style={{ aspectRatio: 3 / 2 }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Typography
                                    className={`${
                                        cookbookUtils.hasSameIngredient(
                                            keywordMap,
                                            dish.recipe_name,
                                            ingredientFocus
                                        )
                                            ? "focus"
                                            : ""
                                    }`}
                                    sx={{
                                        p: 1,
                                        pb: 0.5,
                                        fontFamily: "Solitreo",
                                        textTransform: "capitalize",
                                        cursor: "pointer",
                                        ":hover, &.focus": {
                                            color: "cyan",
                                        },
                                    }}
                                    onMouseEnter={() =>
                                        cookbookUtils.updateIngredientFocus(
                                            keywordMap,
                                            dish.recipe_name,
                                            setIngredientFocus
                                        )
                                    }
                                    onMouseLeave={resetIngredient}
                                >
                                    {dish.recipe_name}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Divider
                                    sx={{
                                        width: "100%",
                                        pb: 1,
                                        mt: 2,
                                        fontSize: 16,
                                        ":before, :after": {
                                            borderTop: `2px cyan solid`,
                                            mx: 1,
                                        },
                                        "& .MuiDivider-wrapper": {
                                            px: 0,
                                        },
                                    }}
                                    textAlign="right"
                                >
                                    <Chip
                                        label="ingredients"
                                        sx={{
                                            fontFamily: "Solitreo",
                                            fontSize: 16,
                                            bgcolor: "cyan",
                                            pt: 1,
                                        }}
                                    />
                                </Divider>
                            </Grid>
                            <Grid size={12} sx={{ overflowY: "auto", px: 0.5 }}>
                                {dishIngredients.map((ingredient) => (
                                    <Chip
                                        className={`${
                                            cookbookUtils.hasSameIngredient(
                                                keywordMap,
                                                ingredient,
                                                ingredientFocus
                                            )
                                                ? "focus"
                                                : ""
                                        }`}
                                        key={`${dish._id}-${ingredient}`}
                                        label={ingredient}
                                        sx={{
                                            m: 0.25,
                                            p: 0.5,
                                            pb: 0,
                                            fontSize: 16,
                                            justifyItems: "center",
                                            position: "relative",
                                            border: "1px transparent solid",
                                            borderRadius: 2,
                                            color: "white",
                                            background: "transparent",
                                            fontFamily: "Solitreo",
                                            cursor: "pointer",
                                            ":hover, &.focus": {
                                                color: "cyan",
                                                background: "#00000066",
                                            },
                                        }}
                                        onMouseEnter={() =>
                                            cookbookUtils.updateIngredientFocus(
                                                keywordMap,
                                                ingredient,
                                                setIngredientFocus
                                            )
                                        }
                                        onMouseLeave={resetIngredient}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            size={9}
                            sx={{
                                background: "#00000066",
                            }}
                        >
                            <Grid
                                className="cookbook-steps"
                                size={12}
                                p={2}
                                mt={1}
                                mr={1}
                            >
                                {Object.keys(dish.step_dict).map((key, i) => (
                                    <Box
                                        key={`${dish._id}-${i}`}
                                        m={0}
                                        display="flex"
                                        alignItems="center"
                                        fontSize={18}
                                    >
                                        <div
                                            style={{
                                                border: "1px transparent solid",
                                                borderRadius: 50,
                                                background: grey[900],
                                                padding: 5,
                                                minWidth: 24,
                                                height: 24,
                                                justifyItems: "center",
                                                alignItems: "center",
                                                marginRight: 20,
                                                fontFamily: "Lexend Deca",
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                lineHeight={1}
                                                color="inherit"
                                                fontFamily="inherit"
                                            >
                                                {Number.parseInt(key) + 1}
                                            </Typography>
                                        </div>
                                        {cookbookUtils.getInteractiveStep(
                                            dish.step_dict[key],
                                            cookbookUtils.configStepSpanArray(dish.step_dict[key], keywords),
                                            keywordMap,
                                            ingredientFocus,
                                            setIngredientFocus,
                                            cookbookUtils.hasSameIngredient,
                                            cookbookUtils.updateIngredientFocus,
                                            resetIngredient,
                                        )}
                                    </Box>
                                ))}
                            </Grid>
                            <Grid size={12}>
                                <Stack padding="max" alignItems="end" p={1}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            minWidth: 60,
                                            bgcolor: "transparent",
                                            borderColor: green[500],
                                            borderRadius: 40,
                                            borderWidth: 2,
                                            color: green[500],
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            fontFamily: "Solitreo",
                                            pb: 0,
                                            textTransform: "none",
                                            transition: "all .2s ease-in-out",
                                            ":hover": {
                                                bgcolor: green[500],
                                                color: "black",
                                            },
                                        }}
                                        disableRipple
                                        onClick={navigateToCooking}
                                    >
                                        start!
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Menu>
        </Grid>
    );
};

export default CookBookDish;
