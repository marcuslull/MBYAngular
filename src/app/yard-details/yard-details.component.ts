import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
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
import {MatButton, MatIconButton} from "@angular/material/button";
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
    MatCardTitle
  ],
  templateUrl: './yard-details.component.html',
  styleUrl: './yard-details.component.css',
})
export class YardDetailsComponent implements OnInit {
  newNoteInput: string = '';
  thumbnailImage: string | null | undefined = "";


  constructor(
    protected stateManagerService: StateManagerService,
    private httpService: HttpService,
    protected imageService: ImageService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.httpService.get("yard/" + this.stateManagerService.yardItem?.id + "/notes").subscribe({
      next: body => {
        this.stateManagerService.notesList = body as Note[];
      }
    })
    this.thumbnailImage = this.stateManagerService.yardsList.find(yard => this.stateManagerService.yardItem?.id === yard.id)?.localThumbnailImageUrl;
  }

  saveNote() {
    const note: Note = {comment: this.newNoteInput, yardId: this.stateManagerService.yardItem?.id};
    this.httpService.post("notes", note).subscribe({
      next: body => {
        this.stateManagerService.notesList[this.stateManagerService.notesList.length] = body as Note;
        this.newNoteInput = '';
      }
    })
  }

  deleteNote(id: number | null | undefined) {
    this.httpService.delete("note/" + id).subscribe({
      next: value => {
        for (let num = 0; num < this.stateManagerService.notesList.length; num++) {
          if (this.stateManagerService.notesList[num].id === id) {
            this.stateManagerService.notesList.splice(num, 1);
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
    this.imageService.getImages().subscribe(() => {
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
        console.log("old thumbnail ID: " + this.stateManagerService.yardItem?.localThumbnailImageId);
        console.log("yard thumbnail image: " + this.stateManagerService.yardThumbnailImage?.id);
        console.log("current yard item: " + this.stateManagerService.yardItem?.id);
        if (this.stateManagerService.yardItem != null && this.stateManagerService.yardThumbnailImage != undefined) {
          console.log("In the if...")

          this.stateManagerService.yardItem.localThumbnailImageId = this.stateManagerService.yardThumbnailImage?.id;
          console.log("Yard items thumbnailId after update: " + this.stateManagerService.yardItem.localThumbnailImageId);
          console.log("yard list length: " + this.stateManagerService.yardsList.length);
          const possibleYard = this.stateManagerService.yardsList.find(yard => yard.id === this.stateManagerService.yardItem?.id);
          console.log("possible yard ID: " + possibleYard?.id)
          this.stateManagerService.yardsList.forEach(yard => console.log("Yard List contains: " + yard.id))
          if (possibleYard != undefined) {
            possibleYard.localThumbnailImageId = (this.stateManagerService.yardThumbnailImage).id;
            possibleYard.localThumbnailImageUrl = this.imageService.getThumbnail(possibleYard.id);
            this.thumbnailImage = possibleYard.localThumbnailImageUrl;
            console.log("new thumbnail ID: " + possibleYard.localThumbnailImageId)
            const yardCheck = this.stateManagerService.yardsList.find(yard => yard.localThumbnailImageId === (this.stateManagerService.yardThumbnailImage as Image).id);
            console.log("This is the yardCheck: " + yardCheck?.localThumbnailImageId);
          }
        }
      }
    })
  }
}
