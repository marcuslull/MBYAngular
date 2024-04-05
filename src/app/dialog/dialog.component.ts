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
import {ImageService} from "../image/image.service";
import {Image} from "../model/image";

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
    private httpService: HttpService,
    private imageService: ImageService
  ) {
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.httpService.multipartPost("yard/1/images", file).subscribe({
        next: value => {
          this.fileName = "Upload successful";
          this.imageService.getImages().subscribe()
        }
      });
    }
  }

  openUploadDialog() {
    // simulates a click on a file upload form element calling onFileSelected()
    // @ts-ignore
    this.fileInput.nativeElement.click();
  }

  selectImage(image: Image) {
    this.stateManagerService.selectedImage = image;
  }
}
