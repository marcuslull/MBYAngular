import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Yard} from "../model/yard";
import {HttpService} from "../http/http.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {DialogComponent} from "../dialog/dialog.component";
import {DialogService} from "../dialog/dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {StateManagerService} from "../state/state-manager.service";

@Component({
  selector: 'app-yard-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatDivider,
    MatAnchor
  ],
  templateUrl: './yard-update.component.html',
  styleUrl: './yard-update.component.css'
})
export class YardUpdateComponent implements OnInit {
  protected yardFormGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    protected stateManagerService: StateManagerService,
    private router: Router,
    private dialogService: DialogService,
    protected dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.stateManagerService.isPut) {
      this.yardFormGroup = this.formBuilder.group({
        name: [this.stateManagerService.yardItem?.name, Validators.required],
        hardinessZone: [this.stateManagerService.yardItem?.hardinessZone],
        yardSubType: [this.stateManagerService.yardItem?.yardSubType]
      });
    } else {
      this.yardFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        hardinessZone: [''],
        yardSubType: ['']
      });
    }
  }

  postYard(): void {
    if (this.yardFormGroup.valid) {
      if (this.stateManagerService.isPut) {
        this.httpService.put("yard/" + this.stateManagerService.yardItem?.id, this.yardFormGroup.value).subscribe({
          next: (body) => {
            this.router.navigate(['/home/yards']).then(r => {
              this.stateManagerService.yardItem = body as Yard; // TODO: I think I can remove these because there is no reason to set if we are redirected to yards
              this.stateManagerService.breadcrumbText = window.location.pathname;
            })
          }
        })
      } else {
        this.httpService.post("yards", this.yardFormGroup.value).subscribe({
          next: (body) => {
            this.router.navigate(['/home/yards']).then(r => {
              this.stateManagerService.yardItem = body as Yard; // TODO: I think I can remove these because there is no reason to set if we are redirected to yards
              this.stateManagerService.breadcrumbText = window.location.pathname;
            })
          }
        })
      }
    }
  }

  openHardinessZoneDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogService.title = "Hardiness Zone Map";
    this.dialogService.content = null;
    this.dialogService.image = '/assets/image/HardinessZoneMap.png'
    this.dialogService.closeButton = true;
    this.dialogService.deleteButton = false;
    let dialogReference = this.dialog.open(DialogComponent, {
      width: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogReference.afterClosed().subscribe();
  }
}
