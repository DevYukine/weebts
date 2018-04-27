# WeebTS
Typescript wrapper around weeb.sh, usable in both TS and JS.

Example usage:

Typescript:
```Typescript
import { Client, TokenType: { Wolke }} from 'weebts';

const client: Client = new Client({ token: "Your-Super-Secret-Token", tokenType: Wolke });

client.getRandom({ type: 'some_type'})
	.then(console.log)
	.catch(console.error);
```

Javascript:
```js
const { Client, TokenType: { Wolke }} = require('weebts');
const client = new Client({ token: "Your-Super-Secret-Token", tokenType: Wolke });

client.getRandom({ type: 'some_type'})
	.then(console.log)
	.catch(console.error);
```