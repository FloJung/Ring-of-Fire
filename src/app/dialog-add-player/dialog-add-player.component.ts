import { Component, Input, inject, model } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { MatDialogClose, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    FormsModule,
    GameComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  @Input() name: string = '';
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);



  constructor() {

  }

  


  onNoClick(): void {
  this.dialogRef.close();
  }
}
