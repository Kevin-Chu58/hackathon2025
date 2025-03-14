import sortUtils from "./sort";
import matchUtils from "./match";
import React from "react";

const adjustDishIngredients = (keywords, ingredients, setDishIngredients) => {
    let moreIngredients = ingredients;
    if (!ingredients.includes("water") && keywords.includes("water")) {
        moreIngredients.push("water");
    }
    setDishIngredients(moreIngredients);

    return moreIngredients;
};

// single ingredient on focus

const hasSameIngredient = (keywordMap, ingredient, ingredientFocus) => {
    ingredient = ingredient.toLowerCase();
    let trueIngredient = keywordMap?.get(ingredient) ?? ingredient;
    return ingredientFocus === trueIngredient;
};

const updateIngredientFocus = (keywordMap, ingredient, setIngredientFocus) => {
    ingredient = ingredient.toLowerCase();
    let trueIngredient = keywordMap?.get(ingredient) ?? ingredient;
    setIngredientFocus(trueIngredient);
};

// multiple ingredients on focus

const hasIncludeIngredient = (keywordMap, ingredient, ingredientsFocus) => {
    ingredient = ingredient.toLowerCase();
    let trueIngredient = keywordMap?.get(ingredient) ?? ingredient;
    return ingredientsFocus.includes(trueIngredient);
};

const createKeywordMap = (ingredients, keywords, setKeywordMap) => {
    let map = new Map();

    // map ingredient to keywords: e.g. chopped tomatoes -> tomatoes
    ingredients.forEach((ingredient) => {
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

const configStepSpanArray = (step, keywords) => {
    let toReplace = []; // []: {index, key?}
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

    return toReplace.sort((a, b) => a.index - b.index);
};

const getInteractiveStep = (
    step,
    spanArray,
    keywordMap,
    ingredientFocus,
    setIngredientFocus,
    isFocusFunc,
    updateFocusFunc,
    resetFocusFunc
) => {
    let toReplace = [...spanArray];
    if (toReplace.length > 0) {

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

            let text = step.substring(
                curIndex,
                curIndex + toReplaceNext.key.length
            );
            // if replace the beginning of a string, captialize the first letter
            if (curIndex === 0) {
                text = text.charAt(0).toUpperCase() + text.slice(1);
            }

            subStrings.push({
                text: text,
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
                                    isFocusFunc(
                                        keywordMap,
                                        subString.key,
                                        ingredientFocus
                                    )
                                        ? "focus"
                                        : ""
                                }`}
                                key={`${step}-${i}`}
                                style={{
                                    cursor: "pointer",
                                }}
                                onMouseEnter={() =>
                                    updateFocusFunc(
                                        keywordMap,
                                        subString.key,
                                        setIngredientFocus
                                    )
                                }
                                onMouseLeave={resetFocusFunc}
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

const cookbookUtils = {
    // methods
    adjustDishIngredients,
    hasSameIngredient,
    updateIngredientFocus,
    hasIncludeIngredient,
    createKeywordMap,
    configStepSpanArray,
    // components
    getInteractiveStep,
};

export default cookbookUtils;
