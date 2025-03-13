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
} from "@mui/material";
import { useEffect, useState } from "react";
import { blue, cyan, grey } from "@mui/material/colors";
import React from "react";
import cookbookService from "../../../../service/cookbook.ts";
import sortUtils from "../../../../utils/sort.js";
import matchUtils from "../../../../utils/match.js";
import "./index.css";

const CookBookDish = ({ dish }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [ingredientFocus, setIngredientFocus] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [keywordMap, setKeywordMap] = useState();

    const initKeywords = async () => {
        const keywords1 = [
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
            // let groupSteps = getGroupSteps(Object.values(dish.step_dict));
            // const annotations = await cookbookService.getFoodAnnotation(
            //     groupSteps
            // );
            keywords1.push(dish.name.toLowerCase());
            keywords1.sort((a, b) => sortUtils.sortStrings(b, a));
            let newKeywords = createKeywordMap(keywords1);
            setKeywords(newKeywords);
        }
    };

    const hasSameIngredient = (ingredient) => {
        ingredient = ingredient.toLowerCase();
        let trueIngredient = keywordMap?.get(ingredient) ?? ingredient;
        return ingredientFocus === trueIngredient;
    };

    const updateIngredientFocus = (ingredient) => {
        ingredient = ingredient.toLowerCase();
        let trueIngredient = keywordMap?.get(ingredient) ?? ingredient;
        setIngredientFocus(trueIngredient);
    };

    const resetIngredient = () => {
        setIngredientFocus("");
    };

    const getGroupSteps = (steps) => {
        return steps.join(" ");
    };

    const createKeywordMap = (keywords) => {
        let map = new Map();

        // map ingredient to keywords: e.g. chopped tomatoes -> tomatoes
        dish.ingredients.forEach((ingredient) => {
            ingredient = ingredient.toLowerCase();

            keywords.forEach((keyword) => {
                if (
                    !map.has(ingredient) &&
                    ingredient.includes(keyword) &&
                    ingredient.length > keyword.length
                )
                    map.set(ingredient, keyword);
            });
        });

        setKeywordMap(map);

        // update keywords with the kepword map keys
        let newKeywords = keywords.concat(...map.keys());
        return newKeywords.sort((a, b) => sortUtils.sortStrings(b, a));
    };

    const getInteractiveStep = (step) => {
        if (keywords.length > 0) {
            let toReplace = []; // []: {index, key}
            let stepLowerCase = step.toLowerCase();

            keywords.forEach((keyword) => {
                let matches = matchUtils.findAllOccurrencesMatchAll(
                    stepLowerCase,
                    keyword
                );

                // check if is duplicated in toReplace
                matches.forEach((startIndex) => {
                    let hasTaken = false;

                    toReplace.forEach((to) => {
                        if (
                            startIndex >= to.index &&
                            startIndex < to.index + to.key.length
                        ) {
                            hasTaken = true;
                        }
                    });

                    if (!hasTaken) {
                        toReplace.push({
                            index: startIndex,
                            key: keyword,
                        });
                    }
                });
            });

            toReplace.sort((a, b) => a.index - b.index);

            /// create an array of subString object to generate the interactive step component

            let subStrings = [];

            let curIndex = 0;

            const appendSubString = () => {
                let endIndex = toReplace[0]?.index ?? step.length;

                subStrings.push({
                    text: step.substring(curIndex, endIndex),
                });
                curIndex = endIndex;
            };

            // append any subString before the first toReplace subString
            if (toReplace[0].index > 0) {
                appendSubString();
            }
            while (curIndex < step.length) {
                let toReplaceNext = toReplace.shift();
                // append the toReplace subString
                subStrings.push({
                    text: step.substring(
                        curIndex,
                        curIndex + toReplaceNext.key.length
                    ),
                    key: toReplaceNext.key,
                });
                curIndex += toReplaceNext.key.length;

                // append the subString between the next toReplace subString
                appendSubString();
            }

            return (
                <p style={{ fontFamily: "Lexend Deca" }}>
                    {subStrings.map((subString, i) => (
                        <React.Fragment key={i}>
                            {subString.key ? (
                                <span
                                    className={`cookbook-highlight-keyword ${
                                        hasSameIngredient(subString.key)
                                            ? "focus"
                                            : ""
                                    }`}
                                    key={`${step}-${i}`}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={() =>
                                        updateIngredientFocus(subString.key)
                                    }
                                    onMouseLeave={resetIngredient}
                                >
                                    {subString.text}
                                </span>
                            ) : (
                                <span>{subString.text}</span>
                            )}
                        </React.Fragment>
                    ))}
                </p>
            );
        } else return <p>{step}</p>;
    };

    useEffect(() => {
        if (isExpanded) initKeywords();
    }, [isExpanded]);

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

            <Menu
                sx={{
                    background: "#00000066",
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
                    <Grid container>
                        <Grid
                            container
                            size={3}
                            sx={{ background: grey[900], pb: 0.5 }}
                        >
                            {/* image content */}
                            <img width="100%" src={dish.href} />
                            <Typography
                                className={`${
                                    hasSameIngredient(dish.name) ? "focus" : ""
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
                                    updateIngredientFocus(dish.name)
                                }
                                onMouseLeave={resetIngredient}
                            >
                                {dish.name}
                            </Typography>
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
                            {dish.ingredients.map((ingredient) => (
                                <Grid
                                    className={`${
                                        hasSameIngredient(ingredient)
                                            ? "focus"
                                            : ""
                                    }`}
                                    key={`${dish._id}-${ingredient}`}
                                    size={12}
                                    sx={{
                                        mx: 1,
                                        p: 1,
                                        pb: 0,
                                        justifyItems: "center",
                                        position: "relative",
                                        border: "1px transparent solid",
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        ":hover, &.focus": {
                                            color: "cyan",
                                            background: "#00000066",
                                        },
                                    }}
                                    onMouseEnter={() =>
                                        updateIngredientFocus(ingredient)
                                    }
                                    onMouseLeave={resetIngredient}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Solitreo",
                                        }}
                                    >
                                        {ingredient}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container size={9} direction="column" p={2}>
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

                                    {getInteractiveStep(dish.step_dict[key])}
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </Menu>
        </Grid>
    );
};

export default CookBookDish;
