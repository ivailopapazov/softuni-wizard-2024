import { state } from "./game-state.js";
import { factory } from "./game-objects.js";
import { engine } from "./game-engine.js";
import "./game-controls.js";

const startElement = document.querySelector('.game-start');
startElement.addEventListener('click', (e) => {
    // Hide start element
    e.currentTarget.classList.add('hidden');

    // Initializa game
    factory.createWizard(state.wizard);

    // Start game
    engine.start();
});
