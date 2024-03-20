import {Injectable} from '@angular/core';
import {Yard} from "../model/yard";
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {
  loggedIn: boolean = false;
  fabIsDisabled: boolean = false;
  deleteYardId: number | null = null;
  isPut: boolean = false;

  // we are going private here, so we can detect any change through the setter. This is key for the state manager.
  private _breadcrumbText: string = "";

  get breadcrumbText(): string {
    return this._breadcrumbText;
  }

  set breadcrumbText(value: string) {
    this._breadcrumbText = value;
    this.saveState();
  }

  private _yardsList: Yard[] = [];

  get yardsList(): Yard[] {
    return this._yardsList;
  }

  set yardsList(value: Yard[]) {
    this._yardsList = value;
    this.saveState();
  }

  private _notesList: Note[] = [];

  get notesList(): Note[] {
    return this._notesList;
  }

  set notesList(value: Note[]) {
    this._notesList = value;
    this.saveState();
  }

  private _yardItem: Yard | null = null;

  get yardItem(): Yard | null {
    return this._yardItem;
  }

  set yardItem(value: Yard | null) {
    this._yardItem = value;
    this.saveState();
  }

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
