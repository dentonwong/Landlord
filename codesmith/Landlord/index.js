const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('transactions.csv')
  .pipe(csv({mapHeaders: ({ header, index }) => header.toLowerCase()}))
  .on('data', (data) => results.push(data))
  .on('end', () => {


    console.log(results);

  });
document.write("test");
alert("This alert box was called with the onload event");