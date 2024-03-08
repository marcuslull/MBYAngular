import {Injectable} from '@angular/core';
import {Yard} from "../model/yard";

@Injectable({
  providedIn: 'root'
})
export class YardsService {
  yardItem: Yard | null = null;

  constructor() {
  }
}
