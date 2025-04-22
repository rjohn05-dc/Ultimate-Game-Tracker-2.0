
const games = [
    "GOW:RAGNAROK",
    "Black Myth Wukong",
    "Spider-Man 2",
    "Resident Evil 4",
    "Assasins Creed: Shadows",
    "Sifu",
    "Hogwarts Legacy",
    "Star Wars Jedi: Survivor",
    "Poppy Playtime",
    "Street Fighter 6",
    "Poppy Playtime 4"
];
// This function will select a game from the games array and assign to one of the players
function randomGame(){
    let randomIndex = Math.floor(Math.random() * games.length);
    let game = games[randomIndex];
    return game;
}

let nameMap= new Map([
    ["Matt", [randomGame(), randomGame(), randomGame()]], // Matt has 3 games
    ["Foggy", [randomGame(), randomGame()]], // Foggy has 2 games
    ["Heather", [randomGame(), randomGame(), randomGame()]] // Heather has 4 games
]);

console.log(nameMap.get("Matt",storeGame("Matt",randomGame()))); // This will output the game list for Matt
console.log(nameMap.get("Foggy",storeGame("Foggy",randomGame()))); // This will output the game list for Foggy
console.log(nameMap.get("Heather",storeGame("Heather",randomGame()))); // This will output the game list for Heather

// This function will store the game in the players game list if they don't have it already
function storeGame(playerName, game){
    if (nameMap.get(playerName).includes(game)){
        console.log("Player already has this game");
    }
    else {
        nameMap.get(playerName).push(game);
        console.log("Game stored successfully");
    }
}

let scores=[
    [300 , 600 , 900], //Matt
    [200 , 400 , 600], //Foggy
    [100 , 200 , 300] , //Heather
]
// this function will select a random score from the scores array
function score(){
    let randomIndex = Math.floor(Math.random() * scores.length);
    let score = scores[randomIndex];
    return score;
}

// This will output the games in store for each player and their score
let results={
    Matt: {
        game: nameMap.get("Matt"),
    },
    Foggy: {
        game: nameMap.get("Foggy"),
    },
    Heather: {
        game: nameMap.get("Heather"),
    }
}

console.log(results);

// This will summarize each players score and average score
for(i=0; i<scores.length; i++){
    let totalScore = 0;
    for(j=0; j<scores[i].length; j++){
        totalScore += scores[i][j];
    }
    let averageScore = totalScore / scores[i].length;
    console.log("Player " + i + " has a total score of " + totalScore + " and an average score of " + averageScore);
}

const playerList = ["Matt", "Foggy", "Heather"];
function addPlayer(){
    const playerName = document.getElementById("playerName").value;
    if(playerName){
        playerList.push(playerName);
        alert("Player added successfully");
        
        if(nameMap.has(playerName)){
            alert("Player already exists");
        }
    }
    else{
        alert("Please enter a player name");
    }
}

function addGame(){
    const gameList = document.getElementById("gameList").value;
    const playerName=document.getElementById("playerName").value;
    if(!playerName || !gameList){
        alert("Please enter a player name and game name");
        return;
    }
   
    const g= nameMap.get(playerName);
    if(g.includes(gameList)){
        alert("Player already has this game");
    }
    else{
        g.push(gameList);
        alert("Game added successfully");
    }
}

function addScore(){
    const scoreInput = document.getElementById("scores").value;
    const playerName = document.getElementById("playerName").value;
    const gameList = document.getElementById("gameList").value;
    const score = parseInt(scoreInput);
    if(!playerName || !gameList || !scoreInput){
        alert("Please enter a player name, game name and score");
        return;
    }
    else{
        if(!isNaN(score)){
            const g= nameMap.get(playerName);
            if(g){
                g.push(score);
                alert("Score added successfully");
            }
            else{
                alert("Player not found");
            }
        }
    }
}


function displaySummary() {
    nameMap.forEach((games, player) => {
        let totalScore = 0;
        let gameCount = 0;
        games.forEach(game => {
            if (typeof game === "number") {
                totalScore += game;
                gameCount++;
            }
        });
        const averageScore = totalScore / gameCount;
        console.log(`Player: ${player}, Total Score: ${totalScore}, Average Score: ${averageScore}`);
    });
}

  

  


  


