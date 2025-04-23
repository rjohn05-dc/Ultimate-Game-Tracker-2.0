const games = [
    "GOW:RAGNAROK",
    "Black Myth Wukong",
    "Spider-Man 2",
    "Resident Evil 4",
    "Assassins Creed: Shadows",
    "Sifu",
    "Hogwarts Legacy",
    "Star Wars Jedi: Survivor",
    "Poppy Playtime",
    "Street Fighter 6",
    "Poppy Playtime 4"
];

// This function will select a game from the games array
function randomGame() {
    let randomIndex = Math.floor(Math.random() * games.length);
    let game = games[randomIndex];
    return game;
}

// Initialize the nameMap with players and their games
let nameMap = new Map([
    ["Matt", [randomGame(), randomGame(), randomGame()]], // Matt has 3 games
    ["Foggy", [randomGame(), randomGame()]], // Foggy has 2 games
    ["Heather", [randomGame(), randomGame(), randomGame()]] // Heather has 3 games
]);

// Player scores data structure - more organized approach
let playerScores = new Map([
    ["Matt", [300, 600, 900]],
    ["Foggy", [200, 400, 600]],
    ["Heather", [100, 200, 300]]
]);

// Player list for easier reference
const playerList = ["Matt", "Foggy", "Heather"];

// This function will store the game in the player's game list if they don't have it already
function storeGame(playerName, game) {
    if (!nameMap.has(playerName)) {
        console.log("Player not found");
        return false;
    }
    
    if (nameMap.get(playerName).includes(game)) {
        console.log("Player already has this game");
        return false;
    } else {
        nameMap.get(playerName).push(game);
        console.log("Game stored successfully");
        return true;
    }
}

// Add a new player to the system
function addPlayer() {
    const playerName = document.getElementById("playerName").value;
    if (!playerName) {
        alert("Please enter a player name");
        return;
    }
    
    // Check if player already exists
    if (nameMap.has(playerName)) {
        alert("Player already exists");
        return;
    }
    
    // Add player to playerList
    playerList.push(playerName);
    
    // Initialize the player in nameMap with an empty array of games
    nameMap.set(playerName, []);
    
    // Initialize player scores
    playerScores.set(playerName, []);
    
    alert("Player added successfully");
    console.log(`Added new player: ${playerName}`);
    console.log("Updated player list:", playerList);
}

// Add a game to a player's collection
function addGame() {
    const gameInput = document.getElementById("gameList").value;
    const playerName = document.getElementById("playerName").value;
    
    if (!playerName || !gameInput) {
        alert("Please enter a player name and game name");
        return;
    }
    
    if (!nameMap.has(playerName)) {
        alert("Player not found");
        return;
    }
    
    const playerGames = nameMap.get(playerName);
    if (playerGames.includes(gameInput)) {
        alert("Player already has this game");
    } else {
        playerGames.push(gameInput);
        alert("Game added successfully");
        console.log(`Added game "${gameInput}" to player ${playerName}`);
    }
}

// Add a score for a player
function addScore() {
    const scoreInput = document.getElementById("scores").value;
    const playerName = document.getElementById("playerName").value;
    const score = parseInt(scoreInput);
    
    if (!playerName || !scoreInput) {
        alert("Please enter a player name and score");
        return;
    }
    
    if (isNaN(score)) {
        alert("Please enter a valid number for score");
        return;
    }
    
    if (!playerScores.has(playerName)) {
        alert("Player not found");
        return;
    }
    
    // Add score to player's score array
    playerScores.get(playerName).push(score);
    alert("Score added successfully");
    console.log(`Added score ${score} for player ${playerName}`);
}

// Display a summary of all players, their games, and scores
function displaySummary() {
    console.log("=== PLAYER SUMMARY ===");
    
    nameMap.forEach((games, player) => {
        console.log(`\nPlayer: ${player}`);
        console.log(`Games: ${games.join(", ")}`);
        
        const playerScoreArray = playerScores.get(player) || [];
        if (playerScoreArray.length > 0) {
            const totalScore = playerScoreArray.reduce((sum, score) => sum + score, 0);
            const averageScore = totalScore / playerScoreArray.length;
            console.log(`Scores: ${playerScoreArray.join(", ")}`);
            console.log(`Total Score: ${totalScore}`);
            console.log(`Average Score: ${averageScore.toFixed(2)}`);
        } else {
            console.log("No scores recorded");
        }
    });
}

// Initialize and display current data
console.log("Initial player data:");
displaySummary();

// Example of adding a random game to each player
playerList.forEach(player => {
    const newGame = randomGame();
    storeGame(player, newGame);
});

// Update results object for any additional processing
let results = {};
nameMap.forEach((games, player) => {
    results[player] = {
        games: games,
        scores: playerScores.get(player) || []
    };
});

console.log("Updated results object:", results);