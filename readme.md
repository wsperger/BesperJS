
# BesperJS

**BesperJS** is the official JavaScript library by [Besper](https://github.com/yourorg). It provides tools to interact with B-Esper resources.

> **Current Functionality**
> 
> - Retrieve a session token for the resource **BesperBot**.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [get_session_token(botId)](#get_session_tokenbotid)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
# Using npm
npm install besperjs

# Using yarn
yarn add besperjs
```

Or simply include the UMD build in your HTML:

```html
<script src="besper.min.js"></script>
```

You can then access the global BesperBot object in the browser.

## Usage

### 1. Importing/Require

If you’re using a module bundler (e.g., Webpack, Rollup, etc.) or a Node environment:

```js
// CommonJS
const { get_session_token, VERSION } = require('besperjs');

// ES Modules
import { get_session_token, VERSION } from 'besperjs';
```

### 2. Retrieve a Session Token

```js
(async function() {
  try {
    const botId = 'YOUR_BOT_ID';
    const token = await get_session_token(botId);
    console.log('Session Token:', token);
  } catch (err) {
    console.error('Error retrieving session token:', err);
  }
})();
```

## API

### get_session_token(botId)

- **Parameters:**
  - `botId` (string): Your unique Bot ID
- **Returns:** Promise<string> - Resolves to the session token.

**Example:**

```js
(async () => {
  const token = await get_session_token('my-awesome-bot');
  console.log(token);
})();
```

## Contributing

1. Fork this repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

MIT