# Getting Started with Azure Speech and React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary
This projects uses the azure cognitive service "Speech". 
The goal is to find out how to use this in a react SPA.

## Configuration
When you want to use this app, you need a Speech instance (https://azure.microsoft.com/en-us/services/cognitive-services/speech-to-text/#overview).

From the speech service you get the subscription Key, region and service url.

These Values can be configured in the component "VoiceInput"

```js
const securityKey: string = "[YOUR-KEY]";
const speechAPIEndpoint: string = "https://[YOUR-NAME].cognitiveservices.azure.com/sts/v1.0/issuetoken";
const language: string = "de-DE";
const region: string = "switzerlandnorth";
```

## Warning

This is not a boilerplate for production. If you want to go live you'll need a custom backendservice which holds the configs and provides you the token of the speech service.
