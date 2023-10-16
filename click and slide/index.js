class SlidingPuzzleGame {
    constructor(size) {
        this.size = size;
        this.numberOfTiles = size ** 2;
        this.highlighted = this.numberOfTiles;
        this.shuffled = false;
        this.buttonContainer = document.getElementById('tiles');
        this.selectedTileId = 'btn' + this.highlighted;

        this.init();
    }

    init() {
        this.newGame();
    }

    newGame() {
        this.loadTiles();
        setTimeout(() => {
            this.shuffle();
        }, 500);
    }

    loadTiles() {
        for (let b = 1; b <= this.numberOfTiles; b++) {
            const newTile = document.createElement('button');
            newTile.id = `btn${b}`;
            newTile.setAttribute('index', b);
            newTile.innerHTML = b;
            newTile.classList.add('btn');
            newTile.style.height = `calc(900px / ${size})`
            newTile.style.width = `calc(900px / ${size})`
            newTile.addEventListener('click', () => this.swap(parseInt(newTile.getAttribute('index'))));
            this.buttonContainer.append(newTile);

        }

        this.selectedTile = document.getElementById(this.selectedTileId);
        this.selectedTile.classList.add("selected");
    }

    shuffle() {
        let minShuffles = 100;
        let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

        for (let i = minShuffles; i <= totalShuffles; i++) {
            setTimeout(() => {
                let x = Math.floor(Math.random() * 4);
                let direction = 0;
                if (x === 0) {
                    direction = this.highlighted + 1;
                } else if (x === 1) {
                    direction = this.highlighted - 1;
                } else if (x === 2) {
                    direction = this.highlighted + this.size;
                } else if (x === 3) {
                    direction = this.highlighted - this.size;
                }
                this.swap(direction);
                if (i >= totalShuffles - 1) {
                    this.shuffled = true;
                }
            }, i * 10);
        }
    }

    swap(clicked) {
        if (clicked < 1 || clicked > this.numberOfTiles) {
            return;
        }

        // Check if we are trying to swap right
        if (clicked === this.highlighted + 1) {
            if (clicked % this.size !== 1) {
                this.setSelected(clicked);
            }
            // Check if we are trying to swap left
        } else if (clicked === this.highlighted - 1) {
            if (clicked % this.size !== 0) {
                this.setSelected(clicked);
            }
            // Check if we are trying to swap up
        } else if (clicked === this.highlighted + this.size) {
            this.setSelected(clicked);
            // Check if we are trying to swap down 
        } else if (clicked === this.highlighted - this.size) {
            this.setSelected(clicked);
        }

        if (this.shuffled) {
            if (this.checkHasWon()) {
                alert("Winner!");
            }
        }
    }

    checkHasWon() {
        for (let b = 1; b <= this.numberOfTiles; b++) {
            const currentTile = document.getElementById(`btn${b}`);
            const currentTileIndex = currentTile.getAttribute('index');
            const currentTileValue = currentTile.innerHTML;
            if (parseInt(currentTileIndex) !== parseInt(currentTileValue)) {
                return false;
            }
        }
        return true;
    }

    setSelected(index) {
        const currentTile = document.getElementById(`btn${this.highlighted}`);
        const currentTileText = currentTile.innerHTML;
        currentTile.classList.remove('selected');
        const newTile = document.getElementById(`btn${index}`);
        currentTile.innerHTML = newTile.innerHTML;
        newTile.innerHTML = currentTileText;
        newTile.classList.add("selected");
        this.highlighted = index;
    }
}

// Create an instance of the game
const size = 4; // Change the size as needed
const game = new SlidingPuzzleGame(size);
