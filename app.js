document.addEventListener('DOMContentLoaded', () => {
    const logos = ['honda', 'suzuki', 'kawasaki', 'bmw', 'yamaha'];
    const background = document.getElementById('background');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const logoSize = 100;
    const spacing = 120;
    const gridSize = logoSize + spacing;

    function createLogos() {
        const positions = generateGridPositions();
        const logoIndexes = generateLogoIndexes(positions.length);

        positions.forEach((pos, index) => {
            const logo = document.createElement('div');
            logo.classList.add('logo', logos[logoIndexes[index]]);
            logo.style.left = `${pos.x}px`;
            logo.style.top = `${pos.y}px`;
            background.appendChild(logo);
            animateLogo(logo, 1, 1);
        });
    }

    function generateGridPositions() {
        const cols = Math.floor(screenWidth / gridSize) + 2;
        const rows = Math.floor(screenHeight / gridSize) + 2;
        const positions = [];
        const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col * gridSize + gridSize / 2 - logoSize / 2;
                const y = row * gridSize + gridSize / 2 - logoSize / 2;
                positions.push({ x, y, col, row });
            }
        }

        shuffleArray(positions);

        const validPositions = [];
        const occupied = new Set();

        for (const pos of positions) {
            const { x, y, col, row } = pos;
            const neighbors = [
                `${col - 1},${row}`, // left
                `${col + 1},${row}`, // right
                `${col},${row - 1}`, // top
                `${col},${row + 1}`  // bottom
            ];

            let canPlace = true;
            for (const neighbor of neighbors) {
                if (occupied.has(neighbor)) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                validPositions.push(pos);
                occupied.add(`${col},${row}`);
            }
        }

        return validPositions;
    }

    function generateLogoIndexes(length) {
        const indexes = [];
        while (indexes.length < length) {
            indexes.push(...shuffleArray([...Array(logos.length).keys()]));
        }
        return indexes.slice(0, length);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function animateLogo(logo, dx, dy) {
        let x = parseFloat(logo.style.left);
        let y = parseFloat(logo.style.top);

        function move() {
            x += dx;
            y += dy;

         if (x > screenWidth) {
                x = -logoSize;
            }
            if (y > screenHeight) {
                y = -logoSize;
            }

            logo.style.left = `${x}px`;
            logo.style.top = `${y}px`;

            requestAnimationFrame(move);
        }

        move();
    }

    createLogos();
});



function slidesPlugin(activeSlide = 0) {

    const slides = document.querySelectorAll('.slide');

    slides[activeSlide].classList.add('active');

slides.forEach((slide) => {
    slide.addEventListener('click', () => {
    clearActiveClasses()
      slide.classList.add('active');
    });
  });
  
function clearActiveClasses() {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    })
}

}

slidesPlugin(2);