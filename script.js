// REVIEW: 
// ik heb waar je dat aangaf class vervangen door id en let vervangen door const
// en waar ik eerder obj als parameter gebruikte verwijs ik nu gelijk naar het count object in de global scope
// en de enkele Nederlandse naamgevingen heb ik veranderd naar het Engels

//Get elements from HTML document
const throwButton = document.getElementById('throw-button'); //Button 'Gooien'
const dice = document.getElementsByClassName('dice'); //Cells in table that represent the dice
const pointsPartOne = document.getElementsByClassName('points-part1'); //Cells in part 1 of table that represent the points earned in the game 
const pointsPartTwo = document.getElementsByClassName('points-part2'); //Cells in part 2 of the table that represent the points earned in the game

//All values of the combinations in the second part of scorepad
const threeOfKind = document.getElementById('three-of-a-kind');
const carre = document.getElementById('carre');
const fullHouse = document.getElementById('fullhouse');
const smallStraight = document.getElementById('kleine-straat');
const bigStraight = document.getElementById('grote-straat');
const topscore = document.getElementById('topscore');
const chance = document.getElementById('chance');

//All 'totals' from html document
const totalPointsPartOne = document.getElementById('totalpoints-part1');
const bonus = document.getElementById('bonus');
const totalPartOne = document.getElementsByClassName('total-part1');
const totalPartTwo = document.getElementById('total-part2');
const allPoints = document.getElementById('allpoints');

let diceValues = []; //Empty array for values of the dice
const count = {}; //Empty object for values of the dice

//Call functions to roll dice and update the table if button is clicked
throwButton.addEventListener('click', function() {
    rollDice();
    diceValues.forEach(countValues);
    updateScorePartOne();
    updateScorePartTwo();
    updateTotalsPartOne();
    updateTotalsPartTwo();
});

//Simulate rolling of the dice
function rollDice() {
    //Sets values of count to 0
    count["1"] = 0;
    count["2"] = 0;
    count["3"] = 0;
    count["4"] = 0;
    count["5"] = 0;
    count["6"] = 0;

    //Add 5 random numbers between 1 and 5 to array
    for (let i = 0; i < 5; i++) {
        const pipsOnDice = Math.floor((Math.random() * 6) + 1); //Get a random number between 1 and 6
        diceValues[i] = pipsOnDice; //Add the number to the array
        dice[i].innerHTML = diceValues[i]; //Place the result in the html table
    }
     
    // REVIEW: vraag: "waar dient de functieparameter currentValue voor als deze hier onder niet wordt meegegeven?"
    // Ik was in de veronderstelling dat dit een van de bestaande waarden is die bij een foreach loop hoort.
    // Zoals ze de parameters hier ook gebruiken: https://www.w3schools.com/jsref/jsref_foreach.asp 
    // Anders snap ik niet hoe het kan dat mijn code werkt :)
    
}

// REVIEW: Ik heb nu de foreach en for in loop van elkaar gescheiden, omdat het onnodig is om voor 
// elke waarde in de array de html aan te passen. Is dit wat je bedoelde met 
// "het is overbodig om 2 loops te maken voor het schrijven van de dobbelstenen naar het scherm"?

//Loop through the array and update the count object
function countValues(currentValue) {
    count[currentValue]++; //Add one to the value of the currentvalue key in the object Count
}

//Update the table Scoreblok Deel 1 for each of the elements in the diceValues array
function updateScorePartOne() {

    for(let x in count) {
        pointsPartOne[x-1].innerHTML = count[x] * x; //Change html to: pips on dice * amount of dice with that value
    }
    
}
//Total points part 1
function updateTotalsPartOne() {

    totalPointsPartOne.innerHTML = addAllPips();
    
    //Check if bonus is achieved and calculate total   
    for (let i = 0; i < totalPartOne.length; i++) {
        if (totalPointsPartOne.innerHTML >= 63) {
            bonus.innerHTML = '35';
        }
        totalPartOne[i].innerHTML = Number(totalPointsPartOne.innerHTML) + Number(bonus.innerHTML);
    }
    
}

//Update the table Scoreblok Deel 2
function updateScorePartTwo() {
    //Set all points to zero 
    for (i = 0; i < pointsPartTwo.length; i++) {
        pointsPartTwo[i].innerHTML = '0';
    }

    //Three of a kind
    if (checkIdenticals() >= 3) {
        threeOfKind.innerHTML = addAllPips();
    } 

    //Carre
    if (checkIdenticals() >= 4) {
        carre.innerHTML = addAllPips();
    } 

    //Full house
    let fullHouseTwo = false;
    let fullHouseThree = false;
    for (value in count) {
        if (count[value] == 2) {
            fullHouseTwo = true;
        }
        if (count[value] == 3) {
            fullHouseThree = true;
        }
        if (count[value] == 5) {
            fullHouseTwo = true;
            fullHouseThree = true;
        }
    }
    if (fullHouseTwo === true && fullHouseThree === true) {
        fullHouse.innerHTML = '25';
    }

    //Small straight
    if (straights() >= 4) {
        smallStraight.innerHTML = '30';
    }
    
    //Big straight
    if (straights() == 5) {
        bigStraight.innerHTML = '40';
    }

    //Topscore
    if (checkIdenticals() == 5) {
        topscore.innerHTML = '50';
    }

    //Chance
    chance.innerHTML = addAllPips();
}

//Total points part 2
function updateTotalsPartTwo() {
    let scorePartTwo = 0;
    for (let i = 0; i < pointsPartTwo.length; i++) {
        scorePartTwo += Number(pointsPartTwo[i].innerHTML);
    }
    totalPartTwo.innerHTML = scorePartTwo;
    allPoints.innerHTML = Number(totalPartOne[1].innerHTML) + Number(totalPartTwo.innerHTML);

}


//Function to check identical dice values
function checkIdenticals() {
    for (value in count) {
        if (count[value] == 5) {
            return 5;
        } else if (count[value] >= 4) {
            return 4;
        } else if (count[value] >= 3) {
            return 3;
        }
    }
}

//Add up all values of dice
function addAllPips() {
    let totalPips = 0;
    for (i = 0; i < diceValues.length; i++) {
        totalPips += diceValues[i];
    }
    return totalPips;
}

//Function to check for small and big straight
function straights() {
    let counter = 0;
    let checkSequence = 0;
    for (value in count) {

        if (count[value] == 0) {
            counter = 0;
        } else if (count[value] > 0) {
            counter++;
        }

        //Check if counter has been set to 4 or 5 already
        if (counter == 4) {
            checkSequence = 4;
        }
        if (counter == 5) {
            checkSequence = 5;
        }

    }

    if (checkSequence == 5) {
        return 5
    } else if (checkSequence == 4) {
        return 4;
    }
}   