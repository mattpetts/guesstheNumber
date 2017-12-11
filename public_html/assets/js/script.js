var cpuNumber;
var input;
var guess = 3;

function gameStart(){
	cpuNumber =  Math.floor(Math.random() * 10) + 1;
	console.log("game has started" + cpuNumber)
}

function gameEnd(){
	console.log("game has Ended")
	guess = 3;
}

function formSubmit() {
    input = parseInt(document.getElementById("userNumber").value);
    validateForm();
}

function validateForm() {
    var value = document.forms["myForm"]["number"].value;
    if (value == "") {
        document.getElementById('announcer').innerHTML = "You Must Guess A Number!" ;
        return false;
    }else if(value > 10){
    	document.getElementById('announcer').innerHTML = "You Must Guess A Number Between 1 and 10!" ;
        return false;
    }else if (value < 1){
    	document.getElementById('announcer').innerHTML = "You Must Guess A Number Between 1 and 10!" ;
    	return false;
    }else if (isNaN(value)){
    	document.getElementById('announcer').innerHTML = "Hey! That's Not A Number!" ;
    	return false;
    }else{
    	compare(input,cpuNumber);
    }
}

function guessLeft() {
	if(guess === 0){
		document.getElementById('announcer').innerHTML = "You are out of guesses. The number was " + cpuNumber ;
		document.getElementById('announcer2').innerHTML = "The Number Has Been Reset." ;
		gameEnd();
		gameStart();
	}else{
		document.getElementById('announcer2').innerHTML = "You have " +guess+ " guess(s) left" ;
	}
}

function compare(choice1,choice2){
	if(choice1 === choice2){
		document.getElementById('announcer').innerHTML = "You Guessed Right - Well Done" ;
		document.getElementById('announcer2').innerHTML = "The Number Has Been Reset." ;
		gameEnd();
		gameStart();
	}else{
		document.getElementById('announcer').innerHTML = "You Guessed Wrong - Try Again" ;
		guess = guess - 1;
		guessLeft()
	}
}

gameStart();

