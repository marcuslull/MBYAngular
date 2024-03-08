import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Yard} from "../model/yard";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {YardsService} from "./yards.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-yards',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './yards.component.html',
  styleUrl: './yards.component.css'
})
export class YardsComponent implements OnInit {
  protected yardsList: Yard[] = [];

  constructor(
    private httpService: HttpService,
    private jwtAuthenticationService: JwtAuthenticationService,
    private yardService: YardsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.jwtAuthenticationService.isLoggedIn()) {
      this.showYards()
    }
  }

  showYards(): void {
    this.httpService.getAll("yards").subscribe({
      next: (body) => {
        this.yardsList = body as Yard[];
      }
    })
  }

  showYard(yardId: number | null): void {
    this.httpService.get("yard/" + yardId).subscribe({
      next: (body) => {
        this.yardService.yardItem = body as Yard
        this.router.navigate(['/home/yardDetails'])
      }
    })
  }

  deleteYard(yardId: number | null | undefined): void {
    this.httpService.delete("yard/" + yardId).subscribe({
      next: () => {
        this.showYards();
      }
    });
  }
}
