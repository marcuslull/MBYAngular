import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {YardsService} from "../yards/yards.service";

@Component({
  selector: 'app-yard-details',
  standalone: true,
  imports: [
    NgIf
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
