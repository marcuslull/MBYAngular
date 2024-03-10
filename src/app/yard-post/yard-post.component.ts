import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Yard} from "../model/yard";
import {HttpService} from "../http/http.service";
import {YardsService} from "../yards/yards.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatAnchor, MatButton} from "@angular/material/button";
import {HomeService} from "../home/home.service";
import {MatDivider} from "@angular/material/divider";
import {DialogComponent} from "../dialog/dialog.component";
import {DialogService} from "../dialog/dialog.service";
import {MatDialog} from "@angular/material/dialog";

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
  templateUrl: './yard-post.component.html',
  styleUrl: './yard-post.component.css'
})
export class YardPostComponent implements OnInit {
  protected yardFormGroup: FormGroup = new FormGroup({});

  protected hardinessZone = [
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

  protected yardSubType = [
    {value: 'BACK_YARD', label: 'Back Yard'},
    {value: 'FRONT_YARD', label: 'Front Yard'},
    {value: 'SIDE_YARD', label: 'Side Yard'},
    {value: 'GARDEN', label: 'Garden'},
    {value: 'SUB_SECTION', label: 'Sub Section'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private yardService: YardsService,
    private router: Router,
    private homeService: HomeService,
    private dialogService: DialogService,
    protected dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.yardFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      hardinessZone: [''],
      yardSubType: ['']
    });
  }

  postYard(): void {
    if (this.yardFormGroup.valid) {
      this.httpService.post("yards", this.yardFormGroup.value).subscribe({
        next: (body) => {
          this.yardService.yardItem = body as Yard;
          this.router.navigate(['/home/yardDetails']).then(r => {
            this.homeService.breadcrumbText = window.location.pathname;
          })
        }
      })
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