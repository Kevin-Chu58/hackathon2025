import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import { green, grey, pink } from "@mui/material/colors";
import { useEffect, useState } from "react";
import cookbookUtils from "../../../utils/cookbook";

const CookingStepper = ({
    steps,
    keywordMap,
    ingredientsFocus,
    setIngredientsFocus,
    toReplaces,
    curStep,
    completeDish,
    sx,
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [stepIngredients, setStepIngredients] = useState([]);

    const initStepIngredients = () => {
        let stepIngredients = toReplaces.map((toReplace) => {
            let ingredients = [];
            toReplace.map((span) => {
                ingredients.push(keywordMap.get(span.key) ?? span.key);
            });
            return ingredients;
        });
        setStepIngredients([...stepIngredients]);
    };

    const isStepCompleted = () => {
        console.log(curStep, activeStep === curStep);
        return activeStep === curStep;
    };

    const handleNext = () => {
        let nextStep = activeStep + 1;
        setActiveStep(nextStep);
        if (nextStep < steps.length)
            setIngredientsFocus(stepIngredients[nextStep]);
        else completeDish();
        moveScrollBar();
    };

    const moveScrollBar = () => {
        let activeStepElement = document.getElementById(getStepId(activeStep));
        let scrollPosition =
            activeStep < steps.length - 1
                ? activeStepElement.offsetTop - 20
                : 0;

        let stepperElement = document.getElementById("cooking-stepper");
        stepperElement.scrollTop = scrollPosition;
    };

    const getStepId = (id) => {
        return `cooking-stepper-step-${id}`;
    };

    useEffect(() => {
        if (stepIngredients.length === 0) {
            initStepIngredients();
        } else {
            setIngredientsFocus(stepIngredients[activeStep]);
        }
    }, [toReplaces, stepIngredients]);

    return (
        <Box id="cooking-stepper" maxWidth="md" sx={sx}>
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                sx={{
                    "& .MuiStepConnector-line": {
                        ml: 0.5,
                    },
                }}
            >
                {steps.map((step, index) => (
                    <Step
                        id={getStepId(index)}
                        key={getStepId(index)}
                        sx={{
                            "& .MuiStepContent-root": {
                                ml: 2,
                            },
                        }}
                    >
                        <StepLabel
                            sx={{
                                "& .MuiStepLabel-label": {
                                    fontFamily: "Solitreo",
                                    fontSize: "1.5rem",
                                    mt: 1,
                                    "&.Mui-active": {
                                        color: "white",
                                    },
                                    "&.Mui-completed": {
                                        color: green[500],
                                    },
                                    "&.Mui-disabled": {
                                        color: grey[600],
                                    },
                                },
                                "& .MuiStepIcon-root": {
                                    fontSize: "2em",
                                    color: grey[600],
                                    "&.Mui-active, &.Mui-completed": {
                                        color: green[500],
                                    },
                                    "& .MuiStepIcon-text": {
                                        fill: "black",
                                        width: 10,
                                        fontSize: "1rem",
                                    },
                                },
                            }}
                        >
                            Step {index + 1} / {steps.length}
                        </StepLabel>
                        <StepContent>
                            {cookbookUtils.getInteractiveStep(
                                step,
                                toReplaces?.at(index) ?? [],
                                keywordMap,
                                ingredientsFocus,
                                () => {},
                                cookbookUtils.hasIncludeIngredient,
                                () => {},
                                () => {}
                            )}
                            <Box
                                sx={{ mb: 2 }}
                            >
                                <Button
                                    disableElevation
                                    disableRipple
                                    disabled={!isStepCompleted()}
                                    variant="outlined"
                                    onClick={handleNext}
                                    sx={{
                                        minWidth: 60,
                                        mt: 4,
                                        mb: 0,
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
                                        "&.Mui-disabled": {
                                            borderColor: grey[700],
                                            background: grey[700],
                                            color: grey[300],
                                        }
                                    }}
                                >
                                    {index === steps.length - 1
                                        ? "Finish"
                                        : "Continue"}
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default CookingStepper;
