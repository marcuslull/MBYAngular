import {Component} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {Yard} from "../../model/yard";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-yards',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './yards.component.html',
  styleUrl: './yards.component.css'
})
export class YardsComponent {
  protected yardsList: Yard[] = [];
  constructor(private httpService: HttpService) {
  }
    refresh() :void {
      this.httpService.getAll("yards").subscribe({
        next: (body) => {
          this.yardsList = body as Yard[];
        }
      })
    }
}
