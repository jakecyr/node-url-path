# Node URL Path

Simple utility class to help join URLs and add query parameters to URLs similar to how Python's pathlib Path object works with file paths.

## Installation

Install the latest version using `npm` with:

```bash
npm install node-url-path
```

## Usage

Using the `URLPath` class makes working with URLs simple. You can add paths to a URL that already has query parameters added to it and add additional query parameters if needed with the call of a method.

All `URLPath` methods return a `URLPath` instance so you can chain them together.

Get the final URL from a `URLPath` instance by retrieving the public `href` property.

```typescript
import { URLPath } from 'node-url-path';

const urlPath = new URLPath('https://google.com/api/')
  .joinPath('/query')
  .addQueryParams({
    query: 'How to make URLs easier when working with Node',
    apiKey: '1234567890',
  });

console.log(urlPath.href);

// Outputs:
// https://google.com/api/query?query=How%20to%20make%20URLs%20easier%20when%20working%20with%20Node&apiKey=1234567890
```

or a more complex example:

```typescript
import { URLPath } from 'node-url-path';

const urlPath = new URLPath('https://google.com/api/?someExistingParams=1')
  .joinPath('/query')
  .addQueryParams({
    query: 'How to make URLs easier when working with Node',
    apiKey: '1234567890',
  });

console.log(urlPath.href);

// Outputs:
// https://google.com/api/query?someExistingParams=1&query=How%20to%20make%20URLs%20easier%20when%20working%20with%20Node&apiKey=1234567890
```
