const frequencies = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
const names = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']; 

const homeX = [0.10, 0.59, 0.29, 0.78, 0.48, 0.17, 0.67, 0.36];
const homeY = [0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15]; 

const sky = document.getElementById('sky');
const startButton = document.getElementById('start');

const clouds = [];
for (let i = 0; i < frequencies.length; i++) {
    const cloud = document.createElement('div');
    cloud.textContent = name[i];
    sky.appendChild(cloud);
    clouds.push(cloud);
}


