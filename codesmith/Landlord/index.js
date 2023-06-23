const form = document.querySelector("#csvForm");
const csvFileInput = document.querySelector("#csvInput");
const textArea = document.querySelector("#csvResult");
const printOut = document.getElementById("test");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = csvFileInput.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (e) {
    const csvArray = csvToArr(e.target.result, ",");
   // console.log("textarea: ", textArea);


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
    printOut.innerHTML = "Second way to do this <br>";

    for(let room in sortedDeposits){
        printOut.innerHTML += room + " rent was received for:";
        deposits[room].forEach(ele => printOut.innerHTML += " " + ele);
        printOut.innerHTML += "<br>";
        
        textArea.value += room + " rent was received for:"
        deposits[room].forEach(ele => textArea.value += " " + ele);
        textArea.value +="\n";
    }
    

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



