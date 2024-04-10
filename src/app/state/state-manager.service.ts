import {Injectable} from '@angular/core';
import {Yard} from "../model/yard";
import {Note} from "../model/note";
import {Image} from "../model/image";

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  loggedIn: boolean = false;
  fabIsDisabled: boolean = false;
  deleteYardId: number | null = null;
  isYardEdit: boolean = false;
  thumbnailSelectedFromDialog: Image | null = null;
  notesListForCurrentYard: Note[] = [];
  imageListForCurrentYard: Image[] = [];
  hardinessZone = [
    {value: 'ZONE_1', label: 'Zone 1'},
    {value: 'ZONE_2', label: 'Zone 2'},
    {value: 'ZONE_3', label: 'Zone 3'},
    {value: 'ZONE_4', label: 'Zone 4'},
    {value: 'ZONE_5', label: 'Zone 5'},
    {value: 'ZONE_6', label: 'Zone 6'},
    {value: 'ZONE_7', label: 'Zone 7'},
    {value: 'ZONE_8', label: 'Zone 8'},
    {value: 'ZONE_9', label: 'Zone 9'},
    {value: 'ZONE_10', label: 'Zone 10'},
    {value: 'ZONE_11', label: 'Zone 11'},
    {value: 'ZONE_12', label: 'Zone 12'},
    {value: 'ZONE_13', label: 'Zone 13'}
  ];
  // private _imageListForCurrentYard: Image[] = [];
  yardSubType = [
    {value: 'BACK_YARD', label: 'Back Yard'},
    {value: 'FRONT_YARD', label: 'Front Yard'},
    {value: 'SIDE_YARD', label: 'Side Yard'},
    {value: 'GARDEN', label: 'Garden'},
    {value: 'SUB_SECTION', label: 'Sub Section'}
  ];
  // private _notesListForCurrentYard: Note[] = [];

  private _currentlySelectedYard: Yard | null = null;

  get currentlySelectedYard(): Yard | null {
    return this._currentlySelectedYard;
  }

  // get notesListForCurrentYard(): Note[] {
  //   return this._notesListForCurrentYard;
  // }
  //
  // get imageListForCurrentYard(): Image[] {
  //   return this._imageListForCurrentYard;
  // }

  set currentlySelectedYard(value: Yard | null) {
    this._currentlySelectedYard = value;
    this.saveState();
  }

  // Stateful fields
  private _globalYardList: Yard[] = [];

  // set notesListForCurrentYard(value: Note[]) {
  //   this._notesListForCurrentYard = value;
  //   this.saveState();
  // }
  //
  // set imageListForCurrentYard(value: Image[]) {
  //   this._imageListForCurrentYard = value;
  //   this.saveState();
  // }

  get globalYardList(): Yard[] {
    return this._globalYardList;
  }

  set globalYardList(value: Yard[]) {
    this._globalYardList = value;
    this.saveState();
  }

  retrieveState() {
    return new Promise<void>(resolve => {
      const yardState = sessionStorage.getItem("yardState");
      if (yardState) {
        let retrievedState = JSON.parse(yardState);
        for (const key in retrievedState) {
          Object.assign(this, retrievedState);
        }
        console.log("Retrieve state finished")
      }
      resolve()
    })
  }

  private saveState() {
    const yardState = JSON.stringify(this);
    sessionStorage.setItem("yardState", yardState);
    console.log("Save state finished")
  }
}
