# CSV-To-Object
My own very quickly written parser for CSV data

## Usage
```js
/* this line is for node.js */
const csv2obj = require('./csv2obj.js');

let csv = `"id", "username", "email"
0, "HeapOverride", "arran.bishop89@aol.com"`;

let obj = csvToObject(csv);
```
