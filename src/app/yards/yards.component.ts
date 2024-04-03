import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Yard} from "../model/yard";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {DialogService} from "../dialog/dialog.service";
import {StateManagerService} from "../state/state-manager.service";

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
    protected stateManagerService: StateManagerService,
    private router: Router,
    protected dialog: MatDialog,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    if (this.jwtAuthenticationService.isLoggedIn()) {
      this.showYards()
      this.stateManagerService.fabIsDisabled = false; // in case the user navigated away from edit or post yard before resolving
    } else {
      this.router.navigate(['/login']).then(r => {
      });
    }
  }

  showYards(): void {
    this.httpService.getAll("yards").subscribe({
      next: (body) => {
        this.stateManagerService.yardsList = body as Yard[];
      }
    })
  }

  showYard(yardId: number | null): void {
    this.httpService.get("yard/" + yardId).subscribe({
      next: (body) => {
        this.router.navigate(['/home/yardDetails']).then(r => {
          this.stateManagerService.yardItem = body as Yard
          this.stateManagerService.breadcrumbText = window.location.pathname;
        })
      }
    })
  }

  openDeleteDialog(yardId: number | null, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.stateManagerService.deleteYardId = yardId;
    this.dialogService.title = "Delete Yard";
    this.dialogService.content = "Are you sure you want to delete yard: " + yardId + "?";
    this.dialogService.image = null;
    this.dialogService.closeButton = true;
    this.dialogService.deleteButton = true;
    this.dialogService.upload = false;
    this.dialogService.saveButton = false;
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
    this.router.navigate(['/home/yardUpdate']).then(r => {
        this.stateManagerService.breadcrumbText = window.location.pathname;
        this.stateManagerService.yardItem = yard;
        this.stateManagerService.isPut = true;
        this.stateManagerService.fabIsDisabled = true; // If we leave this enable it leads to all kinds of probs with edit vs post
      }
    );
  }

  getLabel(yardSubType: string | null) {
    return this.stateManagerService.yardSubType.find(option => option.value === yardSubType)?.label;
  }
}
