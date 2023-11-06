const { evaluerLancer } = require('./diceGame');

describe('Tests pour evaluerLancer', () => {
  test('YAMS avec 5 dés identiques', () => {
    expect(evaluerLancer([1, 1, 1, 1, 1])).toBe(50);
  });

  test('Carré avec 4 dés identiques', () => {
    expect(evaluerLancer([2, 2, 2, 2, 5])).toBe(35);
  });

  test('Full avec 3 dés identiques et une paire', () => {
    expect(evaluerLancer([4, 4, 4, 1, 1])).toBe(30);
  });

  test('Brelan avec 3 dés identiques', () => {
    expect(evaluerLancer([3, 3, 3, 4, 5])).toBe(28);
  });

  test('Grande suite avec 5 dés se suivant', () => {
    expect(evaluerLancer([2, 3, 4, 5, 6])).toBe(40);
  });

  test('Chance avec des dés ne formant aucune figure', () => {
    expect(evaluerLancer([1, 2, 3, 4, 6])).toBe(16);
  });

  test('Chance avec des dés désordonnés ne formant aucune figure', () => {
    expect(evaluerLancer([2, 3, 4, 6, 1])).toBe(16);
  });
});
