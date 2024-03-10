import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {YardsService} from "../yards/yards.service";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-yard-details',
  standalone: true,
  imports: [
    NgIf,
    MatList,
    MatListItem,
    MatDivider
  ],
  templateUrl: './yard-details.component.html',
  styleUrl: './yard-details.component.css'
})
export class YardDetailsComponent {

  constructor(
    protected yardService: YardsService
  ) {
  }

}
