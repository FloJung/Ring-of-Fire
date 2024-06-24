import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameComponent } from '../game/game.component';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { map, filter, catchError, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore);


  constructor(private router: Router) {

  }


  newGame() {
    let game = new Game();
    const newGameRef = addDoc(collection(this.firestore, 'games'), game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/'+ gameInfo.id);
    });
  }

}
