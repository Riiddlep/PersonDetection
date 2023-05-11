import { AudioConfig, SpeechConfig, SpeechSynthesisResult, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import dotenv from 'dotenv';

// Config .env
dotenv.config();

// Replace with your own subscription key and service region (e.g., "westus")
const subscriptionKey: string = process.env['SPEECH_SUBSCRIPTION_KEY']!
const serviceRegion: string = process.env['SPEECH_SERVICE_REGION']!

// Speak the text
async function generateAudioFiles(text: string, lang: string, audioFileName: string) {
    // Configure speech synthesizer
    const audioConfig = AudioConfig.fromAudioFileOutput(audioFileName + '.wav')
    const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, serviceRegion)

    speechConfig.speechSynthesisLanguage = lang
    speechConfig.speechRecognitionLanguage = lang

    let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig)

    // Synthetize the text
    synthesizer.speakTextAsync(text, (_: SpeechSynthesisResult) => {
        synthesizer.close();
    }, (_: string) => {
        synthesizer.close();
    })
}

export {
    generateAudioFiles
}
