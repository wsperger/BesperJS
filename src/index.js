// src/index.js

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

    // Base API URL
    const BASE_API_URL = 'https://b-esper-apim.azure-api.net';

    /**
     * Construct the API endpoint based on the environment parameter.
     *
     * @param {string} [environment] - Optional environment segment to include in the API URL.
     * @returns {string} - The constructed API endpoint URL.
     */
    function constructApiEndpoint(environment) {
      // Remove any leading or trailing slashes from the environment parameter
      if (environment) {
        environment = environment.replace(/^\/+|\/+$/g, '');
        return `${BASE_API_URL}/${environment}/sessions/initiate`;
      } else {
        return `${BASE_API_URL}/sessions/initiate`;
      }
    }

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
      const apiEndpoint = constructApiEndpoint(environment);

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

    return {
      getSessionToken,
      VERSION
    };
  })();

  return BesperBot;
}));
