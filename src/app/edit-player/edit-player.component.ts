import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    NgFor,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
    GameComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent {
  readonly dialogRef = inject(MatDialogRef<EditPlayerComponent>);
  allProfilePicture = [
    'profile_2.png', 
    'profile_1.png',
    'profile_3.png',
    'profile_4.png',
    'profile_5.png',
    'profile_6.png',
    'profile_7.jpg',
    'profile_8.png',
  ];

  selectPicture() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
