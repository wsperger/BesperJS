(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD environment
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS environment
    module.exports = factory();
  } else {
    // Browser global
    root.BesperBot = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * BesperBot module that provides a function to retrieve a session token
   * for Azure Bot Direct Line with a configurable API endpoint.
   */
  const BesperBot = (function () {
    // Version of the library
    const VERSION = '1.0.0';

    // API endpoint injected via environment variables
    const API_ENDPOINT = process.env.API_ENDPOINT || 'https://b-esper-apim.azure-api.net/dev/sessions/initiate';

    /**
     * Retrieve a session token for the specified bot ID using the API endpoint.
     *
     * @param {string} botId - The unique identifier for your Azure Bot.
     * @returns {Promise<string>} - A promise that resolves to the session token.
     * @throws {Error} - Throws an error if the request fails or the response is invalid.
     */
    async function getSessionToken(botId) {
      if (!botId) {
        throw new Error('botId is required to retrieve a session token.');
      }

      try {
        const response = await fetch(API_ENDPOINT, {
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
        // Re-throw the error for the caller to handle
        throw new Error(`Error retrieving session token: ${error.message}`);
      }
    }

    // Publicly exposed methods and properties
    return {
      getSessionToken,
      VERSION
    };
  })();

  // Return the constructed object
  return BesperBot;
}));
