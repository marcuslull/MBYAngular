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
    MatIconButton
  ],
  templateUrl: './yard-details.component.html',
  styleUrl: './yard-details.component.css'
})
export class YardDetailsComponent implements OnInit {
  newNoteInput: string = '';


  constructor(
    protected stateManagerService: StateManagerService,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.httpService.get("yard/" + this.stateManagerService.yardItem?.id + "/notes").subscribe({
      next: body => {
        this.stateManagerService.notesList = body as Note[];
      }
    })
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
    // I cannot figure out how to do this in TS
    // @ts-ignore
    const targetArray: string[] = this.stateManagerService[arrayToCheck]
    // @ts-ignore
    return targetArray.find(option => option.value === value)?.label;
  }
}
