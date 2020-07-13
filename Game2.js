var c, n, p; // empty variables.
var myCurrTurn; // variable that shows if my turn is available.
var points;  // overall number of matches.
var myPoints = 0; // number of matches that I take in one particular turn.
var compPoints = 0; // number of matches that computer takes in one particular turn.
var compTake;

function clearBox(box){ // function for clearing the textBoxes (or matchBoxes) when another game starts
    document.getElementById(box).innerHTML = "";
}

function getPoints(points){
    this.points = 2*document.getElementById("customNumberOfMatches").value+1;
}

function genButtons(p){ // function, that generates buttons on the screen 
   document.getElementById("buttonContainer").innerHTML = "";
   for (i = 0; i < p; i++){
    c = i + 1;
    document.getElementById("buttonContainer").innerHTML += 
    "<input type = 'button' id = 'button"+c+"' value = '"+c+"' onclick = 'add("+c+","+myCurrTurn+");' >";
      }
}

function theEnd(){ // message, that is shown when the game is finished
    document.getElementById("warning").innerHTML = "The end of the game";
    document.getElementById("remMatches").innerHTML = "No More Matches Left"; 
}

function isEven(p){ // function that shows my result on the screen. 
    if (p % 2 == 0){
      document.getElementById("result").innerHTML = "Congratulations! You Won!"
    }
    else
      document.getElementById("result").innerHTML = "You Lost. Commiserations." 
}

function isEqualToZero(p){ // does the number of points equals 0?  
    if (p==0){
        theEnd();
        isEven(myPoints);
    } 
    else {
        document.getElementById("warning").innerHTML = "";
    }
}

function compAdd(myCurrTurn, myPoints) // function of the computer turn
{
  if (myCurrTurn == 1){
    compTake = Math.floor(Math.random()*document.getElementById('matchPossibleToTake').value)+1;
    if (compTake <= points){
      points = doTheOperation(compTake, points, compPoints, "text2", "compMatches");
      compPoints += compTake;
    }
    else {
      if (points != 0)
      {
        compTake = Math.floor(Math.random()*points)+1;
        points = doTheOperation(compTake, points, compPoints, "text2", "compMatches");
        compPoints += compTake;
      }
      else{ 
        points = 0;
        theEnd();
        isEqualToZero(myPoints);
      }
    }
  }
  else {
    compTake = 0;
    points -= 0;
  }
  return points;
}

function add(n, myCurrTurn){ // function that adds matches to players' matchboxes
  if (points >= n){
    points = doTheOperation(n, points, myPoints, "text1", "myMatches");
    myPoints += n;
    isEqualToZero(points);
    myCurrTurn = 1;
  }
  else {
    if (points != 0){
      document.getElementById("warning").innerHTML = "\nYou can't take "+n+" matches! Try other cuantity";
      myCurrTurn = 0;
    }
    else{
      theEnd();
      isEqualToZero(points);
      myCurrTurn = 0;
    }
  }
  compAdd(myCurrTurn, myPoints);
  return myCurrTurn;
}

function showMatches(p, elId, n){ // function that show generated matches on the screen (in matchboxes)
   	if (n == 1){
   		genMatches(p, elId);
   	}
   	else {
   		document.getElementById(elId).innerHTML = "";
   		genMatches(p, elId);
   	}
}
function genMatches(p, elId){ // function that allows to generate matches
  	for (i = 0; i<p; i++){
   		var img = new Image();
   		img.src = "match.png";
      img.style = "height: 120px; width: auto;"
  		var src = document.getElementById(elId);
      src.appendChild(img);
   	}
}

function doTheOperation (n,ovrPoints,plPoints,textBox,MatchBox){ // the operation of generating matches and showing them and their quantity at once
    ovrPoints -= n; // we make it smaller
    plPoints += n; 
  	document.getElementById(textBox).innerHTML += "\n"+ n + "("+plPoints+") ";
   	showMatches(n, MatchBox, 1);
   	showMatches(ovrPoints, "allMatches", 0);
   	document.getElementById("numberOfRemMatches").innerHTML = ovrPoints;
   	return ovrPoints;
}