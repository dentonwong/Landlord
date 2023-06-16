// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];

// //alert("Test 1");

// fs.createReadStream('transactions.csv')
//   .pipe(csv({mapHeaders: ({ header, index }) => header.trim()}))
//   .on('data', (data) => results.push(data))
//   .on('end', () => {


//     console.log(results);
//     alert("Test 2");
//   });
// //document.write("test");
// //alert("Test 2");

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const data = d3.csvParse(text);
        
        document.write(JSON.stringify(data));
    };

    reader.readAsText(input);
});