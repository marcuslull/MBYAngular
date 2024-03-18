import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {YardsService} from "../yards/yards.service";
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
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

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
    FormsModule
  ],
  templateUrl: './yard-details.component.html',
  styleUrl: './yard-details.component.css'
})
export class YardDetailsComponent implements OnInit {
  newNoteInput: string = '';


  constructor(
    protected yardService: YardsService,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.httpService.get("yard/" + this.yardService.yardItem?.id + "/notes").subscribe({
      next: body => {
        this.yardService.notesList = body as Note[];
        console.log(this.yardService.notesList)
      }
    })
  }

  saveNote() {
    const note: Note = {comment: this.newNoteInput, yardId: this.yardService.yardItem?.id};
    this.httpService.post("notes", note).subscribe({
      next: body => {
        this.yardService.notesList[this.yardService.notesList.length] = body as Note;
        this.newNoteInput = '';
      }
    })
  }
}
