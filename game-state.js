// State initialization
export const state = {
    player: 'Navcho the Distroyer',
    wizard: {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        lastMagicUse: 0,
        cooldown: 500,
    },
    isGameOver: false,
    score: 0,
    controls: {
        KeyA: false,
        KeyS: false,
        KeyD: false,
        KeyW: false,
        Space: false,
    },
    lastBugSpawn: 0,
    maxBugSpawnTime: 2000, 
};
