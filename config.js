const config = {
    type: Phaser.AUTO,
    width: 1612,
    height: 907,
    dom: { createContainer: true },

    scene: [
        Main
    ],

    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'fullScreenParent',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1612,
        height: 907
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    audio: { disableWebAudio: true },

    fps: {//   '120' FPS
        target: 120,
        forceSetTimeOut: false
    },

    fullScreenTarget: document.getElementById('core'),
    parent: "core"
};

game = new Phaser.Game(config);

// rezise game window when window resize event is "true"
window.addEventListener('resize', () => {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
});