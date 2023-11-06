const YAMS_SCORE = 50;
const CARRE_SCORE = 35;
const FULL_SCORE = 30;
const BRELAN_SCORE = 28;
const GRANDE_SUITE_SCORE = 40;

function isYams(frequencies) {
  return frequencies[0] === 5;
}

function isCarre(frequencies) {
  return frequencies[0] === 4;
}

function isFull(frequencies) {
  return frequencies[0] === 3 && frequencies[1] === 2;
}

function isBrelan(frequencies) {
  return frequencies[0] === 3;
}

function isGrandeSuite(uniqueValues) {
  if (uniqueValues.size !== 5) return false;
  const sortedValues = [...uniqueValues].sort((a, b) => a - b);
  return sortedValues.every((val, i, arr) => i === 0 || val - arr[i - 1] === 1);
}

function evaluerLancer(dés) {
  if (dés.length !== 5) {
    throw new Error('Un lancer doit contenir exactement 5 dés.');
  }

  const frequenceDes = dés.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  const frequences = Object.values(frequenceDes).sort((a, b) => b - a);
  const valeursUniques = new Set(dés);

  if (isYams(frequences)) return YAMS_SCORE;
  if (isCarre(frequences)) return CARRE_SCORE;
  if (isFull(frequences)) return FULL_SCORE;
  if (isBrelan(frequences)) return BRELAN_SCORE;
  if (isGrandeSuite(valeursUniques)) return GRANDE_SUITE_SCORE;

  // Chance: aucune figure, retourner la somme des dés
  return dés.reduce((acc, val) => acc + val, 0);
}

module.exports = { evaluerLancer };
