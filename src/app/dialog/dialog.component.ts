import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {DialogService} from "./dialog.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatCardImage} from "@angular/material/card";
import {StateManagerService} from "../state/state-manager.service";
import {of} from "rxjs";
import {HttpService} from "../http/http.service";
import {MatIcon} from "@angular/material/icon";

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
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined; // gives a view of the file selected on an upload
  protected fileName: string = "";

  protected readonly Image = Image;
  protected readonly of = of;

  constructor(
    protected dialogService: DialogService,
    protected stateManagerService: StateManagerService,
    private httpService: HttpService
  ) {
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.httpService.multipartPost("yard/1/images", file).subscribe({
        next: value => console.log(value),
      });
    }
  }

  openUploadDialog() {
    // @ts-ignore
    this.fileInput.nativeElement.click();
  }
}
