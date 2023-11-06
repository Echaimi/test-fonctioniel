const YAMS_SCORE = 50;
const CARRE_SCORE = 35; 
const FULL_SCORE = 30; 
const BRELAN_SCORE = 28; 
const GRANDE_SUITE_SCORE = 40;

function areAllFiguresSelected(figuresSelectionnees) {
  return Object.values(figuresSelectionnees).every(val => val);
}

function isYams(frequences) {
  return frequences.includes(5);
}

function isCarre(frequences) {
  return frequences.includes(4);
}

function isFull(frequences) {
  return frequences.includes(3) && frequences.includes(2);
}

function isBrelan(frequences) {
  return frequences.includes(3) && !frequences.includes(2);
}

function isGrandeSuite(valeursUniques) {
  const sortedValues = [...valeursUniques].sort((a, b) => a - b);
  return sortedValues.length === 5 && sortedValues[4] - sortedValues[0] === 4;
}

function evaluerLancer(dés, figuresSelectionnees) {
  if (dés.length !== 5) {
    throw new Error('Un lancer doit contenir exactement 5 dés.');
  }
  
  const frequenceDes = dés.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  const frequences = Object.values(frequenceDes).sort((a, b) => b - a);
  const valeursUniques = new Set(dés);

  let score = dés.reduce((acc, val) => acc + val, 0);
  let figure = 'CHANCE';

  if (isYams(frequences) && !figuresSelectionnees.YAMS) {
    score = YAMS_SCORE;
    figure = 'YAMS';
  } else if (isCarre(frequences) && !figuresSelectionnees.CARRE) {
    score = CARRE_SCORE;
    figure = 'CARRE';
  } else if (isFull(frequences) && !figuresSelectionnees.FULL) {
    score = FULL_SCORE;
    figure = 'FULL';
  } else if (isBrelan(frequences) && !figuresSelectionnees.BRELAN) {
    score = BRELAN_SCORE;
    figure = 'BRELAN';
  } else if (isGrandeSuite(valeursUniques) && !figuresSelectionnees.GRANDE_SUITE) {
    score = GRANDE_SUITE_SCORE;
    figure = 'GRANDE_SUITE';
  } else if (!figuresSelectionnees.CHANCE) {
    figure = 'CHANCE';
  }
  if (figure !== 'CHANCE' && figuresSelectionnees[figure]) {
    return { score: 0, figure: null };
  }
  
  if (figuresSelectionnees[figure]) {
    return { score: 0, figure: null };
  } else {
    figuresSelectionnees[figure] = true;
    return { score, figure };
  }
}

function evaluerPlusieursLancers(lancers) {
  const figuresSelectionnees = {
    YAMS: false,
    CARRE: false,
    FULL: false,
    BRELAN: false,
    GRANDE_SUITE: false,
    CHANCE: false
  };

  return lancers.map(lancer => {
    const resultat = evaluerLancer(lancer, figuresSelectionnees);
    if (resultat.figure !== null) {
      figuresSelectionnees[resultat.figure] = true;
    }
    return resultat;
  });
}

module.exports = { evaluerLancer, evaluerPlusieursLancers };
