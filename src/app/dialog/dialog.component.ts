import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {DialogService} from "./dialog.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatCardImage} from "@angular/material/card";
import {Image} from "../model/image";
import {StateManagerService} from "../state/state-manager.service";
import {of} from "rxjs";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatCardImage,
    NgOptimizedImage
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  protected readonly Image = Image;
  protected readonly of = of;

  constructor(
    protected dialogService: DialogService,
    protected stateManagerService: StateManagerService
  ) {
  }
}
