
# BesperJS

BesperJS is a lightweight JavaScript library designed to interface with various **B-esper** resources. It provides a streamlined way to handle key operations—starting with generating secure session tokens. Over time, BesperJS will evolve to include more capabilities, making it a central hub for all B-esper integrations.

---
## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Generating a Session Token](#generating-a-session-token)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---
## Features
- **Session Token Generation**: Obtain a secure session token for further communication with B-esper services.
- **Future Extensions**: The library will grow to include additional features for deeper integration with various B-esper platforms.

---
## Installation

You can include **BesperJS** in your project via a package manager or a CDN.

### Via NPM
```bash
npm install besperjs
```

Then import and start using it:
```js
import { BesperBot } from 'besperjs';

(async () => {
    const token = await BesperBot.getSessionToken('YOUR_BOT_ID');
    console.log('Token:', token);
})();
```

### Via CDN
```html
<!-- Include BesperJS from a CDN (example using UNPKG) -->
<script src="https://unpkg.com/besperjs@1.0.1/src/index.js"></script>
<script>
    // Once the script is loaded, you can use BesperBot
    (async () => {
        const token = await BesperBot.getSessionToken('YOUR_BOT_ID');
        console.log('Token:', token);
    })();
</script>
```

## Usage

### Generating a Session Token

The primary function currently available in BesperJS is the ability to generate a secure session token. This token can be used with various B-esper services that require authenticated sessions.

```js
// Example: Using ES Modules
import { BesperBot } from 'besperjs';

(async () => {
    try {
        const token = await BesperBot.getSessionToken('YOUR_BOT_ID');
        console.log('Successfully obtained token:', token);
        // Use the token as needed
    } catch (error) {
        console.error('Error fetching token:', error);
    }
})();
```

**Parameters**
- `botId` (string): A unique identifier for your B-esper resource or environment.

**Returns**
- `Promise<string>`: A promise that resolves with the session token.

## Roadmap

BesperJS is intended to serve as a unified, overarching library for the entire B-esper ecosystem. Session token generation is just the beginning. Future plans include:
- Advanced Authentication: Streamlined login flows, user management, and refresh token logic.
- Data & Analytics: Enhanced methods for sending/receiving analytical data.
- Configuration & Management: Tools to manage B-esper environment settings.
- Plugin Support: Adaptable architecture to integrate custom plugins.

Stay tuned for updates as the library evolves.

## Contributing

We welcome contributions to make BesperJS more robust and versatile. To get started:
1. Fork the repository
2. Create a new branch for your feature/fix
3. Submit a pull request describing your changes

Please follow the Code of Conduct and ensure all tests pass before submitting a PR.

## License

This project is licensed under the MIT License. Feel free to use and modify the code in your own projects. We appreciate feedback and contributions!
