let level = 1;
let lives = 3;
let multiplier = 5;
let userInput;
const randomNumber = Math.floor(Math.random() * multiplier + 1);
const inputField = document.getElementById("userInput");

function validateInput(){
  userInput = document.forms["userInputForm"]["userInput"].value;
  event.preventDefault()
  if (userInput == ""){
    inputField.value = "";
    console.log("Must not be blank");
  }else if(isNaN(userInput)){
    inputField.value = "";
    console.log("Must be a number");
  }else{
    compareNumbers(userInput, randomNumber)
  }
}

function compareNumbers(val1, val2){
  if(val1 > val2){
    inputField.value = "";
    console.log("too high");
    lives -= 1;
  }else if (val1 < val2){
    inputField.value = "";
    console.log("too low");
    lives -= 1;
  }else if (val1 == val2){
    inputField.value = "";
    console.log("success");
  }
}
console.log(lives);
