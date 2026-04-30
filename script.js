const emergencies = [
  'a flood',
  'a fire',
  'an earthquake',
  'a volcano',
  'a dragon',
  'a dinosaur',
  'a bear',
  'a wolf',
  'a monster',
  'pirates',
  'a bad robot'
];

const locations = [
  'in the kitchen',
  'in the living room',
  'in the bathroom',
  'in the garden',
  'in your room'
];

const rescueTargets = [
  'the princess',
  'the baby',
  'the baby bear',
  'the treasure',
  'the baby dinosaur',
  'the baby aliens'
];

const CELEBRATION_DURATION_MS = 2000;
const CELEBRATION_COOLDOWN_MS = 1000;
const CELEBRATION_COLORS = ['#ff5ca8', '#4cc9f0', '#ffd23f', '#84e166', '#ff8c42', '#9b5de5'];

let lastCelebrationAt = 0;
let celebrationMultiplier = 1;
const MAX_CELEBRATION_MULTIPLIER = 4;

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateScenario() {
  const emergency = getRandomItem(emergencies);
  const location = getRandomItem(locations);
  const rescueTarget = getRandomItem(rescueTargets);

  document.getElementById('emergency').textContent = emergency;
  document.getElementById('location').textContent = location;
  document.getElementById('rescueTarget').textContent = rescueTarget;

  document.getElementById('scenario').classList.remove('hidden');
  document.getElementById('feedback').classList.add('hidden');
  document.getElementById('rescueButton').classList.remove('mission-complete');
}

function launchCelebration(buttonElement, multiplier) {
  const celebrationLayer = document.createElement('div');
  celebrationLayer.className = 'celebration-layer';

  const confettiCount = 35 * multiplier;
  const balloonCount = 12 * multiplier;

  for (let i = 0; i < confettiCount; i += 1) {
    const confetti = document.createElement('span');
    confetti.className = 'confetti-piece';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = getRandomItem(CELEBRATION_COLORS);
    confetti.style.animationDelay = `${Math.random() * 0.3}s`;
    confetti.style.animationDuration = `${1.4 + Math.random() * 0.6}s`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    celebrationLayer.appendChild(confetti);
  }

  const buttonRect = buttonElement.getBoundingClientRect();
  const originY = buttonRect.top + (buttonRect.height / 2);

  for (let i = 0; i < balloonCount; i += 1) {
    const balloon = document.createElement('span');
    balloon.className = 'balloon';
    const originX = buttonRect.left + (Math.random() * buttonRect.width);
    balloon.style.left = `${originX}px`;
    balloon.style.top = `${originY}px`;
    balloon.style.backgroundColor = getRandomItem(CELEBRATION_COLORS);
    balloon.style.animationDelay = `${Math.random() * 0.03}s`;
    balloon.style.animationDuration = `${1.7 + Math.random() * 0.5}s`;
    balloon.style.setProperty('--balloon-drift-x', `${-120 + Math.random() * 240}px`);
    balloon.style.setProperty('--balloon-pop-in-scale', `${0.8 + Math.random() * 0.35}`);
    celebrationLayer.appendChild(balloon);
  }

  document.body.appendChild(celebrationLayer);

  setTimeout(() => {
    celebrationLayer.remove();
  }, CELEBRATION_DURATION_MS);
}

function rescue() {
  const rescued = document.getElementById('rescueTarget').textContent;
  document.getElementById('rescued').textContent = rescued;

  const rescueButton = document.getElementById('rescueButton');

  const now = Date.now();
  if (now - lastCelebrationAt <= CELEBRATION_COOLDOWN_MS) {
    celebrationMultiplier = Math.min(celebrationMultiplier * 2, MAX_CELEBRATION_MULTIPLIER);
  } else {
    celebrationMultiplier = 1;
  }
  lastCelebrationAt = now;

  document.getElementById('feedback').classList.remove('hidden');
  rescueButton.classList.add('mission-complete');
  launchCelebration(rescueButton, celebrationMultiplier);
}

function showInstructions() {
  document.getElementById('instructionsOverlay').classList.remove('hidden');
}

function hideInstructions() {
  document.getElementById('instructionsOverlay').classList.add('hidden');
}

document.getElementById('startButton').addEventListener('click', generateScenario);
document.getElementById('rescueButton').addEventListener('click', rescue);
document.getElementById('helpButton').addEventListener('click', showInstructions);
document.getElementById('closeInstructionsButton').addEventListener('click', hideInstructions);
