
# BesperBot Session Token Generation

## Overview

BesperBot, built on the Azure Bot Framework by Microsoft, empowers you to create intelligent and scalable chatbots. To authenticate and maintain secure conversations with your BesperBot, you need to generate a **session token**. This token is essential for establishing authenticated sessions between your application and BesperBot.

## Including the Library

Since `besperjs` is intended for client-side usage, you can include it directly in your HTML by adding a `<script>` tag that points to the library hosted on a CDN. Below is an example using [UNPKG](https://unpkg.com/) to include the `besperjs` library.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BesperBot Integration</title>
</head>
<body>
  <!-- Your content here -->

  <!-- Include BesperBot library from UNPKG CDN -->
  <script src="https://unpkg.com/besperjs@1.0.0/dist/besperjs.min.js"></script>
  <script>
    // Your JavaScript code will go here
  </script>
</body>
</html>
```

**Note:** Ensure that the version number (`@1.0.0`) matches the version you intend to use. You can replace it with the latest version if available.

## Generate Session Token

The `getSessionToken` method allows you to create a session token using your unique **Bot ID**. This token ensures that your conversations with BesperBot are authenticated and secure.

### Function: `getSessionToken`

```javascript
/**
 * Retrieve a session token for the specified bot ID using the API endpoint.
 *
 * @param {string} botId - The unique identifier for your Azure Bot.
 * @param {string} [environment] - Optional environment to customize the API endpoint.
 * @returns {Promise<string>} - A promise that resolves to the session token.
 * @throws {Error} - Throws an error if the request fails or the response is invalid.
 */
async function getSessionToken(botId, environment) {
  if (!botId) {
    throw new Error('botId is required to retrieve a session token.');
  }

  // Construct the API endpoint based on the environment parameter
  const apiEndpoint = environment
    ? `https://b-esper-apim.azure-api.net/${environment}/sessions/initiate`
    : 'https://b-esper-apim.azure-api.net/sessions/initiate';

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: 'directline-access',
        action: 'init_conversation',
        data: {
          'bot-identifier': botId
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to initialize conversation: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success || !data.token) {
      throw new Error('Invalid response structure: Missing success or token fields.');
    }

    return data.token;
  } catch (error) {
    throw new Error(`Error retrieving session token: ${error.message}`);
  }
}
```

## Usage Example

Below is an example of how to use the `getSessionToken` method with your Bot ID to obtain a session token.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BesperBot Integration</title>
</head>
<body>
  <!-- Your content here -->

  <!-- Include BesperBot library from UNPKG CDN -->
  <script src="https://unpkg.com/besperjs@1.0.0/dist/besperjs.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const botId = 'asst_H1Fr5RAWUdTWorW694uI7tjX';
      const environment = 'dev'; // e.g., dev, staging, prod

      BesperBot.getSessionToken(botId, environment)
        .then(token => {
          console.log('Session Token:', token);
          // Use the token to authenticate conversations with BesperBot
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    });
  </script>
</body>
</html>
```

## Important Notes

- **Security**: The session token is a sensitive piece of information. Ensure that you handle it securely and do not expose it publicly.
- **Bot ID**: Replace `'asst_H1Fr5RAWUdTWorW694uI7tjX'` with your actual BesperBot ID.
- **Environment**: The `environment` parameter is optional. Use it if you need to specify a particular environment like `dev`, `staging`, or `prod`.
- **Error Handling**: Always implement proper error handling to manage failed requests or invalid responses gracefully.

## Summary

Generating a session token is a straightforward process that enables secure and authenticated interactions with your BesperBot. By utilizing the `getSessionToken` method with your Bot ID, you can establish reliable communication channels for your chatbot applications.

For more information, refer to the [BesperJS Repository](https://github.com/wsperger/BesperJS) or visit the [B-esper Homepage](https://b-esper.com).