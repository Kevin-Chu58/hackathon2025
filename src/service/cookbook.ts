import http from "./http.ts";

type Annotation = {
    annotation: string,
};

type Annotations = {
    annotations: Annotation[],
}

const getFoodAnnotation = async (text: string): Promise<string[]> => {

    const formData = new URLSearchParams();
    formData.append("text", text);

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const endpoint = `food/detect?apiKey=${http.apiKeys.spoonacular}`;

    const annotations = await getAnnotations(endpoint, formData.toString(), headers);
    
    return annotations.annotations.map<string>((a) => a.annotation);
};

const getAnnotations = (endpoint: string, formString: string, headers: Headers): Promise<Annotations> => http.post(http.apiBaseURLs.spoonacular, endpoint, formString, headers);

const cookbookService = {
    getFoodAnnotation,
};

export default cookbookService;