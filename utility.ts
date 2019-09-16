import crypto = require('crypto');

export function generateSasToken(resourceUri, signingKey, policyName, expiresInMins) {
    //encode the uri
    resourceUri = encodeURIComponent(resourceUri);

    // Set expiration in seconds
    let expires = Math.ceil((Date.now() / 1000) + expiresInMins * 60);

    // Use crypto
    let hmac = crypto.createHmac('sha256', Buffer.from(signingKey, 'base64'));
    hmac.update(resourceUri + '\n' + expires);

    // Construct authorization string
    let token = `SharedAccessSignature sr=${resourceUri}&sig=${encodeURIComponent(hmac.digest('base64'))}&se=${expires}`;
    if (policyName) token += "&skn=" + policyName;

    return token;
}