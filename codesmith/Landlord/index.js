
// const myForm = document.getElementById("myForm");
// const csvFile = document.getElementById("csvFile");

// myForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const input = csvFile.files[0];
//     const reader = new FileReader();

//     reader.onload = function (e) {
//         const text = e.target.result;
//         const data = d3.csvParse(text);
        
//         document.write(JSON.stringify(data));
//     };

//     reader.readAsText(input);
// });

//from: https://byrayray.dev/posts/2022-09-16-convert-csv-to-javascript-array-objects

const form = document.querySelector("#csvForm");
const csvFileInput = document.querySelector("#csvInput");
const textArea = document.querySelector("#csvResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = csvFileInput.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (e) {
    const csvArray = csvToArr(e.target.result, ",");
    console.log("textarea: ", textArea);
    //textArea.value = JSON.stringify(csvArray, null, 4);
    
    // const deposits = [];
    // for(let x of csvArray) {
  
    //   if(x.Type === "Deposit"  && (x.Description === "Room #1" || x.Description === "Room #2" || x.Description === "Room #3")) {
    //       deposits.push(x);
    //    console.log(new Date(x.Date).toDateString().substring(4, 7))   
    //   }  
  
    // }

    const deposits = {};
    for(let x of csvArray) {
  
      if(x.Type === "Deposit"  && (x.Description === "Room #1" || x.Description === "Room #2" || x.Description === "Room #3")) {
          if(deposits[x.Description])
            deposits[x.Description].push(new Date(x.Date).toDateString().substring(4, 7))
          else
            deposits[x.Description]=[new Date(x.Date).toDateString().substring(4, 7)]  
       
      }  
  
    }
    const sortedDeposits = Object.keys(deposits).sort().reduce((objEntries, key) => {
        objEntries[key] = deposits[key];
        return objEntries;
    }, {});
    textArea.value="";

    for(let room in sortedDeposits){
        textArea.value += room + " rent was received for:"
        deposits[room].forEach(ele => textArea.value += " " + ele);
        textArea.value +="\n";
    }


    //textArea.value = JSON.stringify(deposits, null, 4);
  };


});

function csvToArr(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));

  const formedArr = rest.map((item) => {
    const object = {};
    keys.forEach((key, index) => (object[key.trim()] = item[index].split('"').join('')));
    return object;
  });


  return formedArr;
}


//Display text that lists room#s and the months that were paid
