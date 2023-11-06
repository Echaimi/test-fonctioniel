// diceGame.js

function evaluerLancer(dés) {
  if (dés.length !== 5) {
    throw new Error('Un lancer doit contenir exactement 5 dés.');
  }

  const frequenceDes = dés.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  const valeursUniques = new Set(dés);
  const frequences = Object.values(frequenceDes).sort((a, b) => b - a);

  if (frequences[0] === 5) return 50; // YAMS
  if (frequences[0] === 4) return 35; // Carré
  if (frequences[0] === 3 && frequences[1] === 2) return 30; // Full
  if (frequences[0] === 3) return 28; // Brelan

  // Grande suite: vérifier si tous les dés se suivent
  const estGrandeSuite = [...valeursUniques].sort((a, b) => a - b)
    .every((val, i, arr) => i === 0 || val - arr[i - 1] === 1);
  
  if (estGrandeSuite && valeursUniques.size === 5) return 40; // Grande suite

  // Chance: aucune figure, retourner la somme des dés
  return dés.reduce((acc, val) => acc + val, 0);
}

module.exports = { evaluerLancer };
