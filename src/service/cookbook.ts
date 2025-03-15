import http from "./http.ts";

type Recipe = {
    _id: string,
    recipe_name: string,
    model_path: string,
    ingredients: string[],
    step_dict: Map<string, string>,
    publisher_id: number,
    user_id: number,
};

type Recipes = Recipe[];

type Annotation = {
    annotation: string,
};

type Annotations = {
    annotations: Annotation[],
};

const getFoodAnnotation = async (text: string): Promise<string[]> => {

    const formData = new URLSearchParams();
    formData.append("text", text);

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const endpoint = `food/detect?apiKey=${http.apiKeys.spoonacular}`;

    const annotations = await getAnnotations(endpoint, formData.toString(), headers);
    
    return annotations.annotations.map<string>((a) => a.annotation);
};

const getCookbooks = async (): Promise<Recipes> => await http.get(http.apiBaseURLs.local, "api/recipes/get_recipes");

const getCookbookRecipe = async (recipeName: String): Promise<Recipe> => await http.get(http.apiBaseURLs.local, `api/recipes/get_recipe?recipe_name=${recipeName}`);

const getAnnotations = (endpoint: string, formString: string, headers: Headers): Promise<Annotations> => http.post(http.apiBaseURLs.spoonacular, endpoint, formString, headers);

const postRunModelPath = async (modelPath: string) => await http.post(http.apiBaseURLs.local, `api/progress/run_model?model_path=${modelPath}`);

const postStopProcess = async (processId: number) => await http.post(http.apiBaseURLs.local, `api/progress/kill_process?pid=${processId}`);

// TODO - add Promise type
const getLatestResult = async () => await http.get(http.apiBaseURLs.local, "api/process/get_latest_result");

const cookbookService = {
    getCookbooks,
    getCookbookRecipe,
    getFoodAnnotation,
    postRunModelPath,
    postStopProcess,
    getLatestResult,
};

export default cookbookService;