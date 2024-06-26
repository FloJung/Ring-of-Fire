export class Game {
    public players: string[] = [];
    public playerImages: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {

        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_'+ i);
            this.stack.push('hearts_'+ i);
            this.stack.push('diamonds_'+ i);
            this.stack.push('ace_'+ i);
        }
        shuffle(this.stack);
    }


    public toJson() {
        return {
            players: this.players,
            playerImages: this.playerImages,
            stack: this.stack,
            playedCard: this.playedCard,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        }
    }
}





const shuffle = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 