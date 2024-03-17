import {Injectable} from '@angular/core';
import {Yard} from "../model/yard";

@Injectable({
  providedIn: 'root'
})
export class YardsService {
  yardsList: Yard[] = [];
  yardItem: Yard | null = null;
  deleteYardId: number | null = null;
  isPut: boolean = false;
}
