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
  isPut: boolean = false;
  yardThumbnailImage: Image | null = null;
  yardsList: Yard[] = [];
  yardItem: Yard | null = null;
  notesList: Note[] = [];
  breadcrumbText: string = "";
  imageList: Image[] = [];

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
  yardSubType = [
    {value: 'BACK_YARD', label: 'Back Yard'},
    {value: 'FRONT_YARD', label: 'Front Yard'},
    {value: 'SIDE_YARD', label: 'Side Yard'},
    {value: 'GARDEN', label: 'Garden'},
    {value: 'SUB_SECTION', label: 'Sub Section'}
  ];

  retrieveState() {
    // There has been a browser nav event, lets reload the state, so we have something to display
    const yardState = sessionStorage.getItem("yardState");
    if (yardState) {
      let retrievedState = JSON.parse(yardState);
      for (const key in retrievedState) {
        if (this.hasOwnProperty(key)) {
          Object.assign(this, retrievedState);
        }
      }
    }
  }

  private saveState() {
    // a key var has changed, lets save the state so there is something to come back to during a browser nav event
    const yardState = JSON.stringify(this);
    sessionStorage.setItem("yardState", yardState);
  }
}
