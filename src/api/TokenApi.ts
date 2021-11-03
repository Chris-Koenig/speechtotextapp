// you should never call the api endpoint directly in a 
// single page application like this.
// you cannot hide the securityKey
// in production you should move this method in a 
// custom backend api
export async function GetSpeechApiToken(securityKey: string, speechAPIEndpoint: string): Promise<string> {
    if (securityKey === undefined || speechAPIEndpoint === undefined) {
        throw new Error('parameter missing in method GetSpeechApiToken ');
    }

    return await fetch(
        speechAPIEndpoint,
        {method: 'POST', headers: {'Ocp-Apim-Subscription-Key': securityKey}}
    )
        .then(response => {
                if (response.status === 200) {
                    return response.text();
                }
            }
        )
        .catch(error => {
                return error.message;
            }
        );
}