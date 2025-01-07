

# Building the Library

## Installing Dependencies

First, install all necessary dependencies:


npm run build:dev && npm run build:test && npm run build:prod

```bash
# Initialize npm (if not already done)
npm init -y 

# Install dependencies
npm install cross-fetch 

# Install development dependencies
npm install --save-dev @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-json @rollup/plugin-terser cross-env dotenv jest rollup
```

## Building for Different Environments

Use the provided npm scripts to build the library for each environment.

### Build for Development

```bash
npm run build:dev
```

**Output Files:**

- `dist/besperbot.development.js`
- `dist/besperbot.development.mjs`

### Build for Testing

```bash
npm run build:test
```

**Output Files:**

- `dist/besperbot.test.js`
- `dist/besperbot.test.mjs`

### Build for Production

```bash
npm run build:prod
```

**Output Files:**

- `dist/besperbot.production.js`
- `dist/besperbot.production.mjs`

### Build All Environments

```bash
npm run build
```

This command sequentially builds for development, testing, and production, generating all corresponding files in the `dist/` directory.

## Explanation of Build Process

- **Environment Variables:** Based on the `NODE_ENV` variable, the corresponding `.env` file is loaded, and `API_ENDPOINT` is injected into the code.
- **Bundling:** Rollup bundles your source code into UMD and ES Module formats.
- **Minification:** Only the production build is minified using terser to reduce file size.

## Publishing to npm

### Prerequisites

- **npm Account:** Ensure you have an npm account.
- **Login:** Log in to your npm account via the command line.

```bash
npm login
```

### Publishing Steps

#### Build the Library

Ensure that you have built the library for production:

```bash
npm run build:prod
```

#### Verify Package Contents

Check that the `dist/` folder contains the built files:

```bash
ls dist/
# You should see besperbot.production.js and besperbot.production.mjs
```

#### Publish to npm

Publish your package to npm:

```bash
npm publish
```

*Note:* If you encounter permission issues or the package name is already taken, you may need to adjust the package name in `package.json` or contact npm support.

### Versioning

To publish updates, increment the version in `package.json` following semantic versioning, and then publish again.

```bash
npm version patch # for bug fixes
npm version minor # for new features
npm version major # for breaking changes
npm publish
```