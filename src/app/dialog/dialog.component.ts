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
import {Yard} from "../model/yard";

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
  protected readonly of = of;

  constructor(
    protected dialogService: DialogService,
    protected stateManagerService: StateManagerService,
    private httpService: HttpService,
    private imageService: ImageService
  ) {
  }

  onImageSelectedFromUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      this.fileName = file.name;
      const endpoint = "yard/" + this.stateManagerService.currentlySelectedYard?.id + "/images";
      this.httpService.multipartPost(endpoint, file).subscribe({
        next: value => {
          this.fileName = "Upload successful";
          this.imageService.getAllImageDataFromBackend().subscribe();
          this.httpService.get("yard/" + this.stateManagerService.currentlySelectedYard?.id).subscribe({
            next: value1 => {
              let returnedYard = value1 as Yard;
              const possibleImageIndex = this.stateManagerService.globalYardList.findIndex(yard => yard.id === returnedYard.id);
              if (possibleImageIndex != undefined) {
                returnedYard.localThumbnailImageUrl = this.stateManagerService.globalYardList[possibleImageIndex].localThumbnailImageUrl;
                let tempYardList = this.stateManagerService.globalYardList;
                tempYardList[possibleImageIndex] = returnedYard;
                this.stateManagerService.globalYardList = tempYardList;
              }
            }
          })
        }
      });
    }
  }

  openUploadDialog() {
    // simulates a click on a file upload form element calling onFileSelected()
    if (this.fileInput != undefined) {
      this.fileInput.nativeElement.click();
    }
  }

  currentlySelectedImage(image: Image) {
    this.stateManagerService.thumbnailSelectedFromDialog = image;
  }
}
