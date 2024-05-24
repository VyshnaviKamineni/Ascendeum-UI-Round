let attempt = 0;
let startTime;
let highlightedBox;
let isPaused = true;
let highlightInterval;
let timerInterval;
let elapsedTime = 0;

function createGrid() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < 9; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('click', () => boxClicked(i));
        grid.appendChild(gridItem);
    }
}

function boxClicked(index) {
    if (!isPaused && index === highlightedBox) {
        const endTime = new Date().getTime();
        const timetaken = (endTime - startTime) / 1000;
        attempt++;
        
        const tableBody = document.querySelector('#resultTable tbody');
        const newRow = document.createElement('tr');

        const attemptCell = document.createElement('td');
        attemptCell.textContent = attempt;
        newRow.appendChild(attemptCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = timetaken.toFixed(2) + 's';
        newRow.appendChild(timeCell);

        tableBody.appendChild(newRow);

        highlightRandomBox();
    }
}

function highlightRandomBox() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.classList.remove('highlighted'));

    if (!isPaused) {
        highlightedBox = Math.floor(Math.random() * 9);
        gridItems[highlightedBox].classList.add('highlighted');

        startTime = new Date().getTime();
    }
}

function startGame() {
    if (isPaused) {
        isPaused = false;
        elapsedTime = 0;
        document.getElementById('pauseBtn').textContent = 'Pause';
        highlightRandomBox();
        highlightInterval = setInterval(highlightRandomBox, 3000);
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function pauseGame() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? 'Resume' : 'Pause';
    if (isPaused) {
        clearInterval(highlightInterval);
        clearInterval(timerInterval);
    } else {
        highlightRandomBox();
        highlightInterval = setInterval(highlightRandomBox, 3000);
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function resetGame() {
    clearInterval(highlightInterval);
    clearInterval(timerInterval);
    isPaused = true;
    elapsedTime = 0;
    attempt = 0;
    document.getElementById('timer').textContent = 'Time: 0s';
    document.querySelector('#resultTable tbody').innerHTML = '';
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.classList.remove('highlighted'));
    document.getElementById('pauseBtn').textContent = 'Pause';
}

function updateTimer() {
    if (!isPaused) {
        elapsedTime++;
        document.getElementById('timer').textContent = `Time: ${elapsedTime}s`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', pauseGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
});
