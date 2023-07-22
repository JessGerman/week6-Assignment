const expect = chai.expect;

describe('Game', () => {
  describe('#playGame', () => {
    it('should correctly play the game', () => {
      const game = new Game();
      game.playGame();

      expect(game.player1.score).to.be.a('number');
      expect(game.player2.score).to.be.a('number');
    });
  });
});