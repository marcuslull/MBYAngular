import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatTab, MatTabContent, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {HttpService} from "../http/http.service";
import {Note} from "../model/note";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {StateManagerService} from "../state/state-manager.service";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DialogService} from "../dialog/dialog.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ImageService} from "../image/image.service";
import {of} from "rxjs";
import {Yard} from "../model/yard";
import {Image} from "../model/image";

@Component({
  selector: 'app-yard-details',
  standalone: true,
  imports: [
    NgIf,
    MatList,
    MatListItem,
    MatDivider,
    MatTabGroup,
    MatTab,
    MatIcon,
    MatTabLabel,
    MatFormField,
    MatInput,
    MatLabel,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule,
    MatButton,
    FormsModule,
    MatIconButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    DatePipe,
    MatTabContent,
    MatMiniFabButton
  ],
  templateUrl: './yard-details.component.html',
  styleUrl: './yard-details.component.css',
})
export class YardDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined; // gives a view of the file selected on an upload
  newNoteInput: string = '';
  thumbnailImageForTemplateDisplay: string | null | undefined = "";
  protected fileName: string = "";
  protected readonly of = of;

  constructor(
    protected stateManagerService: StateManagerService,
    private httpService: HttpService,
    protected imageService: ImageService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.stateManagerService.retrieveState().then(() => {
      this.httpService.get("yard/" + this.stateManagerService.currentlySelectedYard?.id + "/notes").subscribe({
        next: body => {
          this.stateManagerService.notesListForCurrentYard = body as Note[];
        }
      })
      this.thumbnailImageForTemplateDisplay = this.stateManagerService.currentlySelectedYard?.localThumbnailImageUrl;
    })
  }

  deleteImage() {
    const imageToDelete = this.stateManagerService.thumbnailSelectedFromDialog
    const endpoint = "image/" + imageToDelete?.id;
    this.httpService.delete(endpoint).subscribe({
      next: value => {
        this.imageService.getAllImageDataFromBackend().subscribe()
      }
    })
  }

  currentlySelectedImage(image: Image) {
    this.stateManagerService.thumbnailSelectedFromDialog = image;
  }

  openUploadDialog() {
    // simulates a click on a file upload form element calling onFileSelected()
    if (this.fileInput != undefined) {
      this.fileInput.nativeElement.click();
    }
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

  saveNote() {
    const note: Note = {comment: this.newNoteInput, yardId: this.stateManagerService.currentlySelectedYard?.id};
    this.httpService.post("notes", note).subscribe({
      next: body => {
        let tempNoteList = this.stateManagerService.notesListForCurrentYard;
        tempNoteList[tempNoteList.length] = {...body as Note};
        this.stateManagerService.notesListForCurrentYard = tempNoteList;
        this.newNoteInput = '';
      }
    })
  }

  deleteNote(id: number | null | undefined) {
    this.httpService.delete("note/" + id).subscribe({
      next: value => {
        for (let num = 0; num < this.stateManagerService.notesListForCurrentYard.length; num++) {
          if (this.stateManagerService.notesListForCurrentYard[num].id === id) {
            this.stateManagerService.notesListForCurrentYard = this.stateManagerService.notesListForCurrentYard.splice(num, 1);
          }
        }
      }
    })
  }

  getLabel(value: string | null | undefined, arrayToCheck: string) {
    // @ts-ignore
    const targetArray: string[] = this.stateManagerService[arrayToCheck]
    // @ts-ignore
    return targetArray.find(option => option.value === value)?.label;
  }

  openThumbnailUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.imageService.getAllImageDataFromBackend().subscribe(() => {
      this.displayImageDialog(enterAnimationDuration, exitAnimationDuration);
    })
  }

  private displayImageDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialogService.title = "Update Thumbnail Image"
    this.dialogService.content = "Select an image, then click save, or upload a new image."
    this.dialogService.closeButton = true;
    this.dialogService.deleteButton = false;
    this.dialogService.upload = true;
    this.dialogService.saveButton = true;
    let dialogReference = this.dialog.open(DialogComponent, {
      width: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogReference.beforeClosed().subscribe(result => {
      // update the yards thumbnail image ID when clicking save
      if (result) {
        if (this.stateManagerService.currentlySelectedYard != null && this.stateManagerService.thumbnailSelectedFromDialog != undefined) {
          // find our yard
          const yardToUpdate = this.stateManagerService.globalYardList.find(yard => yard.id === this.stateManagerService.currentlySelectedYard?.id);
          if (yardToUpdate != undefined) {
            // update its thumbnail
            yardToUpdate.localThumbnailImageUrl = this.stateManagerService.thumbnailSelectedFromDialog.localFile;
            this.stateManagerService.currentlySelectedYard = {
              ...this.stateManagerService.currentlySelectedYard,
              localThumbnailImageUrl: yardToUpdate.localThumbnailImageUrl,
            };
            // update local template var
            this.thumbnailImageForTemplateDisplay = yardToUpdate.localThumbnailImageUrl;
          }
        }
      }
    })
  }
}
