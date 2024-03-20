import {Injectable} from '@angular/core';
import {Yard} from "../model/yard";
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
export class YardsService {
  breadcrumbText: string = "";
  loggedIn: boolean = false;
  fabIsDisabled: boolean = false;
  yardsList: Yard[] = [];
  notesList: Note[] = [];
  yardItem: Yard | null = null;
  deleteYardId: number | null = null;
  isPut: boolean = false;
}
