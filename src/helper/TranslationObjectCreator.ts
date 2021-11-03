import {AudioConfig, SpeechTranslationConfig, TranslationRecognizer} from "microsoft-cognitiveservices-speech-sdk";

export function CreateTranslator(subscriptionKey:string, region:string, sourceLanguage:string, targetLanguage:string):TranslationRecognizer{
    if (subscriptionKey === undefined || region === undefined ||sourceLanguage === undefined || targetLanguage === undefined)
        throw new Error('parameter missing in method CreateTranslator ');
    
    let speechTranslationConfig = SpeechTranslationConfig.fromSubscription(subscriptionKey, region);
    speechTranslationConfig.speechRecognitionLanguage = sourceLanguage;
    speechTranslationConfig.addTargetLanguage(targetLanguage);
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    return new TranslationRecognizer(speechTranslationConfig, audioConfig);
}
