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
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {HomeService} from "../home/home.service";
import {DialogService} from "../dialog/dialog.service";

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

  constructor(
    private httpService: HttpService,
    private jwtAuthenticationService: JwtAuthenticationService,
    protected yardService: YardsService,
    private router: Router,
    protected dialog: MatDialog,
    private homeService: HomeService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    if (this.jwtAuthenticationService.isLoggedIn()) {
      this.homeService.breadcrumbText = window.location.pathname;
      this.showYards()
      this.homeService.fabIsDisabled = false; // in case the user navigated away from edit or post yard before resolving
    } else (this.router.navigate(['/login'])).then();
  }

  showYards(): void {
    this.httpService.getAll("yards").subscribe({
      next: (body) => {
        this.yardService.yardsList = body as Yard[];
      }
    })
  }

  showYard(yardId: number | null): void {
    this.httpService.get("yard/" + yardId).subscribe({
      next: (body) => {
        this.yardService.yardItem = body as Yard
        this.router.navigate(['/home/yardDetails']).then(r => {
          this.homeService.breadcrumbText = window.location.pathname;
        })
      }
    })
  }

  openDeleteDialog(yardId: number | null, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.yardService.deleteYardId = yardId;
    this.dialogService.title = "Delete Yard";
    this.dialogService.content = "Are you sure you want to delete yard: " + yardId + "?";
    this.dialogService.image = null;
    this.dialogService.closeButton = true;
    this.dialogService.deleteButton = true;
    let dialogReference = this.dialog.open(DialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogReference.afterClosed().subscribe(result => {
      if (result) {
        this.deleteYard(yardId);
      }
    })
  }

  deleteYard(yardId: number | null) {
    this.httpService.delete("yard/" + yardId).subscribe({
      next: () => {
        this.showYards();
      }
    });
  }

  editYard(yard: Yard) {
    this.yardService.yardItem = yard;
    this.yardService.isPut = true;
    this.router.navigate(['/home/yardUpdate']).then(r => {
        this.homeService.breadcrumbText = window.location.pathname;
      }
    );
  }
}
