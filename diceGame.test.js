const { evaluerLancer,evaluerPlusieursLancers} = require('./diceGame');

describe('Tests pour evaluerLancer', () => {
    test('YAMS avec 5 dés identiques', () => {
      expect(evaluerLancer([1, 1, 1, 1, 1], {}).score).toBe(50);
    });
  
    test("Carré avec 4 dés identiques", () => {
      expect(evaluerLancer([2, 2, 2, 2, 5], {}).score).toBe(35);
    });
  
    test('Full avec 3 dés identiques et une paire', () => {
      expect(evaluerLancer([4, 4, 4, 1, 1], {}).score).toBe(30);
    });
  
    test('Brelan avec 3 dés identiques', () => {
      expect(evaluerLancer([3, 3, 3, 4, 5], {}).score).toBe(28);
    });
  
    test('Grande suite avec 5 dés se suivant', () => {
      expect(evaluerLancer([2, 3, 4, 5, 6], {}).score).toBe(40);
    });
  
    test('0 points quand toutes les figures sont déjà sélectionnées', () => {
      const figuresSelectionnees = {
        "YAMS": true,
        "CARRE": true,
        "FULL": true,
        "BRELAN": true,
        "PETITE_SUITE": true,
        "GRANDE_SUITE": true,
        "CHANCE": true,
      };
      const result = evaluerLancer([2, 2, 2, 5, 6], figuresSelectionnees);
      expect(result.score).toBe(0);
      expect(result.figure).toBeNull(); // or toBe(undefined) depending on the implementation
    });
  
    test('Chance avec des dés désordonnés ne formant aucune figure', () => {
      expect(evaluerLancer([2, 3, 4, 6, 1], {}).score).toBe(16);
    });
  });
  
describe('Tests pour evaluerPlusieursLancers', () => {
  test('évalue plusieurs lancés avec des figures différentes', () => {
    const lancers = [
      [1, 1, 1, 2, 2], // FULL - 30 points
      [2, 2, 2, 3, 3], // FULL déjà pris, devrait choisir BRELAN - 28 points
      [4, 4, 4, 4, 5], // CARRE - 35 points
      [1, 2, 3, 4, 5], // GRANDE_SUITE - 40 points
      [1, 1, 1, 1, 1], // YAMS - 50 points
      [2, 3, 4, 5, 6]  // CHANCE, car les autres figures sont prises - somme des dés = 20 points
    ];

    const expectedResults = [
      { score: 30, figure: 'FULL' },
      { score: 28, figure: 'BRELAN' },
      { score: 35, figure: 'CARRE' },
      { score: 40, figure: 'GRANDE_SUITE' },
      { score: 50, figure: 'YAMS' },
      { score: 20, figure: 'CHANCE' }
    ];
    const results = evaluerPlusieursLancers(lancers);
    expect(results).toEqual(expectedResults);
  });

  test('retourne 0 pour tous les lancés après que toutes les figures ont été prises', () => {
    const lancers = [
      [1, 1, 1, 1, 1], // YAMS - 50 points
      [2, 2, 2, 2, 3], // CARRE - 35 points
      [3, 3, 3, 4, 4], // FULL - 30 points
      [4, 4, 4, 5, 6], // BRELAN - 28 points, assuming you can score a BRELAN if FULL is taken
      [1, 2, 3, 4, 5], // GRANDE_SUITE - 40 points
      [2, 3, 4, 5, 6], // CHANCE - somme des dés = 20 points
      [1, 1, 1, 2, 3], // Tous pris, devrait être 0
      [4, 4, 4, 4, 4]  // Tous pris, devrait être 0
    ];

    const expectedResults = [
      { score: 50, figure: 'YAMS' },
      { score: 35, figure: 'CARRE' },
      { score: 30, figure: 'FULL' },
      { score: 28, figure: 'BRELAN' },
      { score: 40, figure: 'GRANDE_SUITE' },
      { score: 20, figure: 'CHANCE' },
      { score: 0, figure: null },
      { score: 0, figure: null }
    ];
    const results = evaluerPlusieursLancers(lancers);
    expect(results).toEqual(expectedResults);
  });
});
