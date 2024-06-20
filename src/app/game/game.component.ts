import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';

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
  private subscription: Subscription = new Subscription();
  item$: any;
  itemCollection: any;
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute,public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
    console.log(params);
    
      this.itemCollection = doc(this.firestore, `games/${params['id']}`);
      this.item$ = collectionData(this.itemCollection).subscribe((game: any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCard = game.playedCard;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
      });
    }

  ngOnDestroy() {
    this.itemCollection.unsubscribe();
  }

  newGame() {
    this.game = new Game();
    const newGameRef = addDoc(collection(this.firestore, 'games'), this.game.toJson());
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
