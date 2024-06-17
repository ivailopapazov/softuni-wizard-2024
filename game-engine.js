import { state } from "./game-state.js";
import { factory } from "./game-objects.js";
import { config } from "./game-config.js";

const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');

// Game frames
function newFrame() {
    // Move wizard
    const wizardElement = modifyWizardPosition();

    // Modify fireballs
    const fireballs = document.querySelectorAll('.fireball');
    for (const fireball of fireballs) {
        if (fireball.offsetLeft > gameArea.offsetWidth) {
            fireball.remove();
        } else {
            fireball.style.left = fireball.offsetLeft + config.magicSpeed + 'px';
        }
    }

    // create bugs
    if (state.lastBugSpawn + state.maxBugSpawnTime * Math.random() < Date.now()) {
        factory.createBug();
        state.lastBugSpawn = Date.now();
    }

    // move bugs
    const bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        // remove outside bugs
        if (bug.offsetLeft < 0) {
            return bug.remove();
        }

        // check wizard collision 
        const hasCollision = checkCollision(wizardElement, bug);
        if (hasCollision) {
            state.isGameOver = true;
        }

        // check fireball collision
        const fireballs = document.querySelectorAll('.fireball');
        fireballs.forEach(fireball => {
            if (checkCollision(fireball, bug)) {
                fireball.remove();
                bug.remove();
                state.score += config.bugPoints;
            }
        }); 

        // Move buggs
        bug.style.left = bug.offsetLeft - config.bugSpeed + 'px';
    });

    // Apply score
    state.score += config.timePoints;
    gameScore.textContent = state.score + 'pts.'

    // Game over check
    if (!state.isGameOver) {
        window.requestAnimationFrame(newFrame);
    } else {
        const gameOverArea = document.querySelector('.game-over');
        gameOverArea.classList.remove('hidden');
    }
}

function checkCollision(firstElement, secondElement) {
    const first = firstElement.getBoundingClientRect();
    const second = secondElement.getBoundingClientRect();

    const hasCollision = !(first.top > second.bottom
        || first.botton < second.top
        || first.right < second.left
        || first.left > second.right
    )

    return hasCollision
}

// TODO: Fix acceleration on diagonals
function modifyWizardPosition() {
    const wizardElement = document.querySelector('.wizard');

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

    if (state.controls.Space) {
        wizardElement.style.backgroundImage = 'url("images/wizard-fire.png")';

        // create fireball
        factory.createFireball(wizard);
    } else {
        wizardElement.style.backgroundImage = 'url("images/wizard.png")';
    }

    return wizardElement;
}

export const engine = {
    start() {
        window.requestAnimationFrame(newFrame);
    }
}
