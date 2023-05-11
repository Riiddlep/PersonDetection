import { TranslatorTextClient } from '@azure/cognitiveservices-translatortext';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

import dotenv from 'dotenv';

// Config .env
dotenv.config();

// Retrieve authentication data
const subscriptionKey: string = process.env['TRANSLATOR_TEXT_SUBSCRIPTION_KEY']!
const serviceEndpoint: string = process.env['TRANSLATOR_TEXT_ENDPOINT']!
const serviceRegion: string = process.env['TRANSLATOR_SERVICE_REGION']!

const apiCredentials = new ApiKeyCredentials({
    inHeader: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': serviceRegion
    }
})

const client = new TranslatorTextClient(apiCredentials, serviceEndpoint).translator

async function translateText(langs: string[], text: string) {

    let translation = await client.translate(langs, [{ text }])

    if (translation.length === 0)
        return;

    let translations = translation[0].translations!;
    let json =
    {
        langs: [] as Array<{ [key: string]: string }>
    };

    for (let i = 0; i < translations.length; i++) {
        let to: string = langs[i]!;
        let text: string = translations[i].text!;

        json.langs.push({[to]: text!});
    }

    return json
}

export {
    translateText
}
