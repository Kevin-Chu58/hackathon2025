import { EnvironmentPlugin } from 'webpack';

export const plugins = [
    new EnvironmentPlugin({
        SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY || '' // Use your environment variable
    }),
];
