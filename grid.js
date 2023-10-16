// creo riferimenti per griglia, pulsante e select
const grid = document.querySelector('.grid');
const playButton = document.getElementById('btn-play');
const difficultySelect = document.getElementById('select');
const bombe_100 = getArrayOfRandomIntBetween(1, 100, 16);

// quando clicco play
playButton.addEventListener('click', function () {
console.log("Hai cliccato sul pulsante 'PLAY'");

// Rimuovo la griglia generata per on averla infinita.
while (grid.firstChild) {
grid.removeChild(grid.firstChild);
}
console.log("La griglia è vuota");

// difficoltà selezionata 
const selectedDifficulty = difficultySelect.value;
console.log("Difficoltà:", selectedDifficulty);

// creo griglia in base alla difficoltà
let cellCount;
if (selectedDifficulty === 'grid') {
cellCount = 100;
} else if (selectedDifficulty === 'bonus81') {
cellCount = 81;
} else if (selectedDifficulty === 'bonus49') {
cellCount = 49;
}
console.log(cellCount, "caselle");

// creo la griglia
for (let i = 0; i < cellCount; i++) {
const cell = document.createElement('div');
cell.textContent = i + 1;
cell.className = 'cell';
grid.appendChild(cell);

// difficoltà bonus81
if (selectedDifficulty === 'bonus81') {
cell.className += ' cell-81';
}
// difficoltà bonus49
else if (selectedDifficulty === 'bonus49') {
cell.className += ' cell-49';
}

// clicchi su una casella, cambia il suo colore 
cell.addEventListener('click', function () {
if (bombe_100.includes(i + 1)) {
cell.style.backgroundColor = 'red';
console.log("Hai cliccato su una bomba! La partita è finita.");
} else {
cell.style.backgroundColor = 'aqua';
console.log("Hai cliccato sulla casella numero", i + 1);
}
});
}
});

//per caso dificoltà normale
function getArrayOfRandomIntBetween(minRange, maxRange, number) {
const bombsArray = []
    
// popolare l'array con 16 numeri random non duplicati
while (bombsArray.length < number) {
// generare un numero random da rangeMin a rangeMAx
const n = getRandomIntInclusive(minRange, maxRange)

// SE n non è presente nell'array di bombe
console.log(bombsArray.includes(n))
if (bombsArray.includes(n) === false) {
// pushare il numero nell'array di bombe
bombsArray.push(n)
}
}
    return bombsArray
};

 // generare un numero random da rangeMin a rangeMAx   
function getRandomIntInclusive(min, max) {
min = Math.ceil(min)
max = Math.floor(max)
return Math.floor(Math.random() * (max - min + 1) + min) 
};

