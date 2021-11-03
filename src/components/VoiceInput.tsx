import React, {useEffect, useState} from "react";
import {
    SpeechRecognizer,
    ResultReason, TranslationRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";
import {GetSpeechApiToken} from "../api/TokenApi";
import {CreateRecognizer} from "../helper/SpeechObjectCreator";
import Button from "@mui/material/Button";
import {CreateTranslator} from "../helper/TranslationObjectCreator";
import {grey, lightGreen} from "@mui/material/colors";

function VoiceInput() {
    const [recognizingText, setRecognizingText] = useState<string>("...");
    const [recognizedText, setRecognizedText] = useState<string>("...");
    const [translatedText, setTranslatedText] = useState<string>("...");
    const [translatingText, setTranslatingText] = useState<string>("...");
    const [translator, setTranslator] = useState<TranslationRecognizer>();
    const [recognizer, setRecognizer] = useState<SpeechRecognizer>();
    const [speechIsReady, setSpeechIsReady] = useState<boolean>(false);
    const [recognizing, SetRecogniszing] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");

    // Warning. Never do this in production!
    // Move the method using the securityKey to a custom backend service!
    const securityKey: string = "[KEY";
    const speechAPIEndpoint: string = "[URL]";
    const sourceLanguage: string = "de-DE";
    const translationTargetLanguage = "en";
    const region: string = "switzerlandnorth";

    // get token
    useEffect(() => {
        GetSpeechApiToken(securityKey, speechAPIEndpoint).then((token) => {
            if (token != null) setToken(token);
        });
    }, []);

    // get the recognizer & translator
    useEffect(() => {
        setTranslator(CreateTranslator(securityKey, region, sourceLanguage, translationTargetLanguage));
        setRecognizer(CreateRecognizer(token, region, sourceLanguage));
        setSpeechIsReady(true);
    }, [token]);

    async function sttFromMic() {
        if (speechIsReady && recognizer != null && translator != null) {
            recognizer.startContinuousRecognitionAsync();
            translator.startContinuousRecognitionAsync();

            setRecognizingText("...speak to your microphone...");
            setRecognizedText("... i do listen ...");

            // returns words understood, no punctuation
            recognizer.recognizing = (s, e) => {
                if (e.result.reason === ResultReason.RecognizingSpeech) {
                    setRecognizingText(e.result.text);
                }
            };

            // return whole sentences with punctuation.
            recognizer.recognized = (s, e) => {
                if (e.result.reason === ResultReason.RecognizedSpeech) {
                    setRecognizedText(e.result.text);
                }
            };

            //translates words, no punctuation
            translator.recognizing = (s, e) => {
                if (e.result.reason === ResultReason.TranslatingSpeech) {
                    setTranslatingText(e.result.translations.get(translationTargetLanguage));
                }
            };

            //translates whole sentences with punctuation.
            translator.recognized = (s, e) => {
                if (e.result.reason === ResultReason.TranslatedSpeech) {
                    setTranslatedText(e.result.translations.get(translationTargetLanguage));
                }
            };
            
            SetRecogniszing(true);
        }
    }

    async function sttFromMicStop() {
        setRecognizingText("...");
        setRecognizedText("...");
        setTranslatedText("...")
        setTranslatingText("...")
        
        recognizer?.stopContinuousRecognitionAsync();
        translator?.stopContinuousRecognitionAsync();

        SetRecogniszing(false);
    }

    return (
        <div>
            
            <p>{recognizingText}</p>
            <p>{translatingText}</p>
            <br/>
            <h3>{recognizedText}</h3>
            <h3>{translatedText}</h3>
            <Button onClick={sttFromMic} disabled={recognizing} variant="contained">start recognition</Button>
            <Button onClick={sttFromMicStop} disabled={!recognizing} variant="contained">stop recognition</Button>
        </div>
    );
}

export default VoiceInput;
