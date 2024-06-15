import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    NgIf,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule, 
    DialogAddPlayerComponent,
    GameDescriptionComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] 
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
      };
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCard.push(this.currentCard);

      }, 1000);
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0 ){
        this.game.players.push(name);
      }
    });
  }
}
