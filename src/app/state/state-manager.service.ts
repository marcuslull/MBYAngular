import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {YardsService} from "../yards/yards.service";

@Injectable({
  providedIn: 'root'
})
export class StateManagerService implements OnInit, OnDestroy {

  constructor(private yardService: YardsService) {
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
