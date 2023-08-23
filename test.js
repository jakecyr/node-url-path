const { URLPath } = require('./dist/URLPath');
const urlPath = new URLPath('https://google.com/api/?someExistingParams=1')
  .joinPath('/query')
  .addQueryParams({
    query: "How to make URLs easier when working with Node",
    apiKey: "1234567890",
  });

console.log(urlPath.href);
