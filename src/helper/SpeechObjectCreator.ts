import {AudioConfig, SpeechConfig, SpeechRecognizer} from "microsoft-cognitiveservices-speech-sdk";

export function CreateRecognizer(token:string, region:string, language:string): SpeechRecognizer {
    
    if (token !== undefined && region !== undefined && language !== undefined) {
        const speechConfig = SpeechConfig.fromAuthorizationToken(token, region);
        speechConfig.speechRecognitionLanguage = language;
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        return new SpeechRecognizer(speechConfig, audioConfig);
    }
    else
        throw Error();
}