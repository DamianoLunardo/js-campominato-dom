// creo riferimenti per griglia, pulsante e select
const grid = document.querySelector('.grid');
const playButton = document.getElementById('btn-play');
const difficultySelect = document.getElementById('select');

// definisco il punteggio iniziale
let score = 0;
let gameOver = false;

// funzione per generare posizioni casuali per le bombe
function generateRandomBombPositions(cellCount) {
    const bombPositions = [];
    while (bombPositions.length < 16) {
        //restituisce un numero random da 1 a cellCount
        const randomPosition = getRandomIntInclusive(1, cellCount);
        if (!bombPositions.includes(randomPosition)) {
            // se non è presente, aggiungi la posizione all'array bombPositions con il metodo push. 
            bombPositions.push(randomPosition);
        }
    }
    return bombPositions;
}

// generare un numero random da rangeMin a rangeMAx   
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
};
// quando clicco play
playButton.addEventListener('click', function () {
    //console.log("Hai cliccato sul pulsante 'PLAY'");

    // resetto il punteggio
    score = 0;
    gameOver = false;

    // Rimuovo la griglia generata per on averla infinita.
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    //console.log("La griglia è vuota");

    // difficoltà selezionata 
    const selectedDifficulty = difficultySelect.value;
    //console.log("Difficoltà:", selectedDifficulty);

    // creo griglia in base alla difficoltà
    let cellCount;
    if (selectedDifficulty === 'grid') {
        cellCount = 100;
    } else if (selectedDifficulty === 'bonus81') {
        cellCount = 81;
    } else if (selectedDifficulty === 'bonus49') {
        cellCount = 49;
    }
    //console.log(cellCount, "caselle");

    // Genera posizioni casuali per le bombe
    const bombPositions = generateRandomBombPositions(cellCount);

    // creo la griglia
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const img = document.createElement('img');
        img.src = 'fiore.png';
        grid.appendChild(cell);
        cell.appendChild(img);

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
            // Se il gioco è finito, non fare nulla
            if (gameOver) return;

            if (bombPositions.includes(i + 1)) {

                //rimuovo immagine del fiore 
                const img = cell.querySelector('img');
                if (img) {
                    cell.removeChild(img);
                };

                // immagine della bomba
                const bombImg = document.createElement('img');
                bombImg.src = 'bomba.jpg';
                cell.appendChild(bombImg);

                //console.log("Hai cliccato su una bomba! La partita è finita.");
                gameOver = true;
                setTimeout(function () {
                    alert("Hai cliccato su una bomba! La partita è finita. Il tuo punteggio è: " + score);
                }, 500); // Ritardo di 0,5 secondi 
            } else {
                cell.style.backgroundColor = 'aqua';
                // Incrementa il punteggio
                score++;
                //console.log("Hai cliccato sulla casella numero", i + 1);

                // il gioco è vinto, per 16 bombe
                if (score === cellCount - 16) {
                    //console.log("Hai vinto! Hai trovato tutte le caselle senza bomba.");
                    gameOver = true;
                    setTimeout(function () {
                        alert("Hai vinto! Hai trovato tutte le caselle senza bomba. Il tuo punteggio è: " + score);
                    }, 500);
                }
            }
        });
    }
});



