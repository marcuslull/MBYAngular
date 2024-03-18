import {Injectable} from '@angular/core';
import {Yard} from "../model/yard";
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
export class YardsService {
  yardsList: Yard[] = [];
  notesList: Note[] = [];
  yardItem: Yard | null = null;
  deleteYardId: number | null = null;
  isPut: boolean = false;
}
