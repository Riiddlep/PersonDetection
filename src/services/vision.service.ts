import { ComputerVisionClient, ComputerVisionModels } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import dotenv from 'dotenv';

// Config .env
dotenv.config();

// Retrieve authentication data
const subscriptionKey: string = process.env['VISION_SUBSCRIPTION_KEY']!
const serviceEndpoint: string = process.env['VISION_SERVICE_ENDPOINT']!
const serviceRegion: string = process.env['VISION_SERVICE_REGION']!

// Make ApiKeyCredentials instance
const apiCredentials = new ApiKeyCredentials({
    inHeader: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': serviceRegion
    }
})

// Fonction pour appeler l'API Azure Computer Vision et récupérer les résultats.
async function detectPersonsInImage(imageBuffer: Buffer): Promise<number> {
    const client = new ComputerVisionClient(apiCredentials, serviceEndpoint);
    const options: ComputerVisionModels.ComputerVisionClientAnalyzeImageInStreamOptionalParams = {
        visualFeatures: ["Objects"],
        language: "en",
    };

    const objects = (await client.detectObjectsInStream(imageBuffer, options)).objects!;
    
    return objects.filter((obj: ComputerVisionModels.DetectedObject) => obj.object === "person").length
}

export {
    detectPersonsInImage
}