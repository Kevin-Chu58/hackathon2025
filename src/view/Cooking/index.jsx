import {
    Container,
    Grid2 as Grid,
    Typography,
    Divider,
    Chip,
    Box,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import imgs from "../../asset/img/imgs.js";
import CookingStepper from "./CookingStepper";
import sortUtils from "../../utils/sort.js";
import cookbookUtils from "../../utils/cookbook.js";
import cookbookService from "../../service/cookbook.ts";

const cookbookDish = {
    _id: "abcdefg",
    recipe_name: "tomato scrambled eggs",
    rating: 4.6,
    ingredients: ["Chopped tomatoes", "Beaten eggs", "Oil", "Sugar", "Salt"],
    step_dict: {
        0: "Pour oil into the pan and heat it.",
        1: "Pour the beaten eggs into the pan and stir-fry.",
        2: "Take out the scrambled eggs and set them aside.",
        3: "Add the tomatoes to the pan and stir-fry.",
        4: "Add the scrambled eggs back, then add salt, sugar, and some water, and stir-fry.",
        5: "Serve the tomato scrambled eggs.",
    },
    model_path: "",
};
const Cooking = () => {
    const uris = ["/cooking/", "/cooking"];
    const [recipeId, setRecipeId] = useState("");
    const [dish, setDish] = useState();
    const [ingredientsFocus, setIngredientsFocus] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [keywordMap, setKeywordMap] = useState();
    const [dishIngredients, setDishIngredients] = useState([]);
    const [stepSpanArrays, setStepSpanArrays] = useState([]);
    const [processId, setProcessId] = useState();
    const [curStep, setCurStep] = useState(-1);
    const [intervalId, setIntervalId] = useState();
    const navigateTo = useNavigate();
    // TODO - add navigateTo 404 when url doesn't match the records

    const getRecipeIdFromURL = () => {
        const currentURL = window.location.pathname;
        const pathParams = currentURL.split("/");

        setRecipeId(pathParams[2]?.replaceAll("%20", " ") ?? "");
    };

    const initDish = async () => {
        const dish = await cookbookService.getCookbookRecipe();
        setDish(dish);
    }

    const initProcess = async () => {
        const processId = await cookbookService.postRunModelPath(dish.model_path);
        setProcessId(processId);
    }

    const checkCurStep = async () => {
        const curStep = await cookbookService.getLatestResult();
        setCurStep(curStep);
    }

    const completeDish = () => {
        clearInterval(intervalId);
    }

    const initStepSpanArrays = () => {
        let newStepSpanArrays = Object.values(dish.step_dict).map(step => {
            const result = cookbookUtils.configStepSpanArray(step, keywords);
            return result;
        });
        setStepSpanArrays(newStepSpanArrays);
    };

    /// ingredient focus

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
            let newKeywords = cookbookUtils.createKeywordMap(
                ingredients,
                annotations,
                setKeywordMap
            );
            setKeywords(newKeywords);
    };

    useEffect(() => {
        if (!dish) {
            initDish();
        }
    })

    useEffect(() => {
        if (dish && !processId) {
            initProcess();
        }
    }, [dish]);

    useEffect(() => {
        if (processId) {
            setIntervalId(setInterval(checkCurStep(), 1000));
        }
    }, [processId]);

    useEffect(() => {
        if (keywords.length === 0) {
            getRecipeIdFromURL();
            initKeywords();
        } else {
            initStepSpanArrays();
        }
    }, [keywords]);

    if (uris.includes(window.location.pathname)) {
        return <Navigate to={"/home"} replace />;
    }

    return (
        <Container sx={{ p: 4 }}>
            <Grid
                container
                alignItems="flex-start"
                sx={{
                    border: `1px ${grey[800]} solid`,
                    borderRadius: 1,
                    overflow: "hidden",
                    background: grey[900],
                }}
            >
                <Grid container size={3} sx={{ pb: 0.5 }}>
                    {/* image content */}
                    <img
                        width="100%"
                        src={imgs[dish.recipe_name]}
                        style={{ aspectRatio: 3 / 2 }}
                    />
                    <Grid size={12}>
                        <Typography
                            className={`${
                                cookbookUtils.hasIncludeIngredient(
                                    keywordMap,
                                    dish.recipe_name,
                                    ingredientsFocus
                                )
                                    ? "focus"
                                    : ""
                            }`}
                            sx={{
                                p: 1,
                                pb: 0.5,
                                fontFamily: "Solitreo",
                                textTransform: "capitalize",
                                "&.focus": {
                                    color: "cyan",
                                },
                            }}
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
                                    cookbookUtils.hasIncludeIngredient(
                                        keywordMap,
                                        ingredient,
                                        ingredientsFocus
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
                                    "&.focus": {
                                        color: "cyan",
                                        background: "#00000066",
                                    },
                                }}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid container size={9}>
                    <Grid
                        size={12}
                        sx={{
                            background: "#00000066",
                        }}
                    >
                        <Box>
                            <CookingStepper
                                steps={Object.values(dish.step_dict)}
                                keywordMap={keywordMap}
                                ingredientsFocus={ingredientsFocus}
                                toReplaces={stepSpanArrays}
                                setIngredientsFocus={setIngredientsFocus}
                                curStep={curStep}
                                completeDish={completeDish}
                                sx={{
                                    p: 2,
                                    pl: 10,
                                    height: 360,
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        container
                        size={12}
                        sx={{ height: "80px", fontFamily: "Solitreo" }}
                    >
                        <Grid size={3}>
                            <Typography
                                variant="h5"
                                fontFamily="inherit"
                                pl={2}
                                pt={2}
                                sx={{ textDecoration: "underline" }}
                            >
                                Chief's Feedback:
                            </Typography>
                        </Grid>
                        <Grid size={9} pt={2} fontSize={18}>
                            AI feeback here
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cooking;
