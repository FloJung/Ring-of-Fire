import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc  } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, filter, catchError, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

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
    PlayerMobileComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] 
})
export class GameComponent implements OnInit {
  
  game?: Game;
  private subscription: Subscription = new Subscription();
  item$:any;
  itemCollection: any;
  firestore: Firestore = inject(Firestore);
  gameId : any;
  gameOver:boolean = false;

  constructor(private route: ActivatedRoute,public dialog: MatDialog) {
    this.newGame();
  }


    ngOnInit(): void {
      this.subscription.add(this.route.params.subscribe((params) => {
        this.gameId = params['id'];
        this.itemCollection = doc(this.firestore, `games/${this.gameId}`);
        this.item$ = docData(this.itemCollection, { idField: 'id' })
          .pipe(
            tap(data => console.log('Received data:', data)),
            filter(data => !!data),
            catchError(error => {
              console.error('Error fetching game data:', error);
              return []; 
            })
          )
          .subscribe((gameData: any) => {
            if (this.game) {
              this.game.currentPlayer = gameData.currentPlayer;
              this.game.playedCard = gameData.playedCard;
              this.game.players = gameData.players;
              this.game.playerImages = gameData.playerImages;
              this.game.stack = gameData.stack;
              this.game.pickCardAnimation = gameData.pickCardAnimation;
              this.game.currentCard = gameData.currentCard;

            }
          });
      }));
    }



  ngOnDestroy() {
    this.item$.unsubscribe();
  }

  newGame() {
    this.game = new Game();
    
  }

  takeCard() {
    if(this.game?.stack.length == 0) {
      this.gameOver = true;
    } else if(!this.game?.pickCardAnimation) {
      const card = this.game?.stack.pop();
      
      if (card !== undefined) {
        this.game!.currentCard = card;
      };
      this.game!.pickCardAnimation = true;
      
      this.game!.currentPlayer++;
      this.game!.currentPlayer = this.game!.currentPlayer % this.game!.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game!.pickCardAnimation = false;
        this.game?.playedCard.push(this.game!.currentCard);
        this.saveGame();
      }, 1000);
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0 ){
        this.game?.players.push(name);
        this.game?.playerImages.push('profile_1.png');

        this.saveGame();
      }
    });
  }


  saveGame() {
    if (this.game) {
      const gameRef = doc(this.firestore, `games/${this.gameId}`);
      updateDoc(gameRef, this.game.toJson()).then(() => {
        console.log('Game updated successfully!');
      }).catch(error => {
        console.error('Error updating game:', error);
      });
    }
  }
  

  editPlayer(playerIndex: number) {
    console.log('edit player', playerIndex);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe(change => {
      if(change) {
        if(change == 'DELETE') {
          this.game!.playerImages.splice(playerIndex);
          this.game!.players.splice(playerIndex);
          this.saveGame();
        } else {
          console.log('Resive change', change)
          this.game!.playerImages[playerIndex] = change;
          this.saveGame();
        }
        
      }
      
    });
  }
}
