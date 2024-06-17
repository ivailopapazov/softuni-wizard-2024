import { state } from "./game-state.js";
import { config } from "./game-config.js";

// Game frames
function newFrame() {
    modifyWizardPosition();

    // Game over check
    if (!state.isGameOver) {
        window.requestAnimationFrame(newFrame);
    }
}

function modifyWizardPosition() {
    const wizardElement = document.querySelector('.wizard');
    const gameArea = document.querySelector('.game-area');

    const { wizard } = state;

    // Wizard movement
    if (state.controls.KeyA && wizard.x > 0) {
        wizardElement.style.left = `${wizard.x -= config.speed}px`;
    }

    if (state.controls.KeyD && wizard.x + wizard.width < gameArea.offsetWidth) {
        wizardElement.style.left = `${wizard.x += config.speed}px`;
    }

    if (state.controls.KeyW && wizard.y > 0) {
        wizardElement.style.top = `${wizard.y -= config.speed}px`;
    }

    if (state.controls.KeyS && wizard.y + wizard.height < gameArea.offsetHeight) {
        wizardElement.style.top = `${wizard.y += config.speed}px`;
    }
}

export const engine = {
    start() {
        window.requestAnimationFrame(newFrame);
    }
}
