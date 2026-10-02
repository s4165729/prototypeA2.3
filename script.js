const frequencies = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
const names = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']; 

const homeX = [0.10, 0.59, 0.29, 0.78, 0.48, 0.17, 0.67, 0.36];
const homeY = [0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15]; 

const sky = document.getElementById('sky');
const startButton = document.getElementById('start');

const clouds = [];
for (let i = 0; i < frequencies.length; i++) {
    const cloud = document.createElement('div');
    cloud.textContent = names[i];
    sky.appendChild(cloud);
    clouds.push(cloud);
}
let audioContext = null;
let volumes = [];

startButton.onclick = () => {
    if (audioContext) return;
    audioContext = new AudioContext();

    volumes = frequencies.map(frequency => {
        const tone = audioContext.createOscillator();
        const volume = audioContext.createGain();
        tone.frequency.value = frequency; 
        volume.gain.value = 0;
        tone.connect(volume);
        volume.connect(audioContext.destination);
        tone.start();
        return volume;
    });
};

let pointer = null; 

sky.onpointermove = (event) => {
    const box = sky.getBoundingClientRect();
    pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
};
sky.onpointerleave = () => {
    pointer = null;
}; 

function animate() {
    const width = sky.clientWidth; 
    const height = sky.clientHeight;
    const reach = 0.4 * Math.max(width, height);

    for (let i = 0; i <clouds.length; i++) {
        const x = homeX[i] * width;
        const y = homeY[i] * height;
        clouds[i].style.left = x + 'px';
        clouds[i].style.top = y + 'px';

        let closeness = 0
        if (pointer) {
            const distance = Math.hypot(pointer.x - x, pointer.y - y);
            closeness = Math.max(0, 1 - distance / reach);
        }

        clouds[i].style.transform = 'scale(' + (1 + closeness * 0.6) + ')';
        clouds[i].style.background = 'hsl(205, 55%, ' + (100 - closeness * 30) + '%)';
        if (audioContext) {
            volumes[i].gain.setTargetAtTime(closeness * closeness * 0.15, audioContext.currentTime, 0.05);
        }
    }

    requestAnimationFrame(animate);
}


