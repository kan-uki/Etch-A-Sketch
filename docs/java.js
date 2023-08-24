const slider = document.getElementById("slider");
const colorPicker = document.getElementById("colorPicker");
const gridContainer = document.querySelector('.grid-container');
const buttons = document.querySelectorAll('.click-button');

let lastClickedButton = 'Fill';

function createGrid(size) {
  gridContainer.innerHTML = '';

  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  const containerWidth = parseInt(getComputedStyle(gridContainer).width); 
  const divSize = (containerWidth / size) - 1;

  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    gridItem.style.width = divSize + 'px';
    gridItem.style.height = divSize + 'px';
    gridItem.style.border = "0.5px solid black"

    gridContainer.appendChild(gridItem);
  }
}

function attachHoverListeners() {
  gridContainer.addEventListener('mouseover', event => {
    if (event.target.classList.contains('grid-item')) {
      hoverOnGrid(event.target);
    }
  });
}
  
function updateGrid() {
  const size = slider.value;
  createGrid(size);
  attachHoverListeners();
}

updateGrid();

function hoverOnGrid(div) {
  if (lastClickedButton === 'Fill') {
    div.style.backgroundColor = colorPicker.value;
  }
  if (lastClickedButton === 'Erase') {
    div.style.backgroundColor = 'white';
  }
}

function clearGrid() {
  const divs = document.querySelectorAll('.grid-item');

  divs.forEach(div => {
    div.style.backgroundColor = 'white';
  });

  lastClickedButton = 'Fill';
}

slider.addEventListener('input', updateGrid);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    lastClickedButton = button.textContent;

    if (lastClickedButton === 'Clear') {
      clearGrid();
    }
  });
});



