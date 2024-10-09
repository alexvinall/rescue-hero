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
]

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
}

function rescue() {
  const rescued = document.getElementById('rescueTarget').textContent;
  document.getElementById('rescued').textContent = rescued;

  document.getElementById('feedback').classList.remove('hidden');
}

document.getElementById('startButton').addEventListener('click', generateScenario);
document.getElementById('rescueButton').addEventListener('click', rescue);