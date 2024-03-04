import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Yard} from "../model/yard";
import {NgForOf, NgIf} from "@angular/common";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-yards',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './yards.component.html',
  styleUrl: './yards.component.css'
})
export class YardsComponent implements OnInit{
  protected yardsList: Yard[] = [];
  protected yardsListIsHidden: boolean = false;
  protected yardItemIsHidden: boolean = true;
  protected yardPostIsHidden: boolean = true;
  protected yardItem: Yard | null = null;
  protected yardFormGroup: FormGroup = new FormGroup({});

  protected hardinessZone = [
    { value: 'ZONE_1', label: 'Zone 1' },
    { value: 'ZONE_2', label: 'Zone 2' },
    { value: 'ZONE_3', label: 'Zone 3' },
    { value: 'ZONE_4', label: 'Zone 4' },
    { value: 'ZONE_5', label: 'Zone 5' },
    { value: 'ZONE_6', label: 'Zone 6' },
    { value: 'ZONE_7', label: 'Zone 7' },
    { value: 'ZONE_8', label: 'Zone 8' },
    { value: 'ZONE_9', label: 'Zone 9' },
    { value: 'ZONE_10', label: 'Zone 10' },
    { value: 'ZONE_11', label: 'Zone 11' },
    { value: 'ZONE_12', label: 'Zone 12' },
    { value: 'ZONE_13', label: 'Zone 13' }
  ];

  protected yardSubType = [
    { value: 'BACK_YARD', label: 'Back Yard' },
    { value: 'FRONT_YARD', label: 'Front Yard' },
    { value: 'SIDE_YARD', label: 'Side Yard' },
    { value: 'GARDEN', label: 'Garden' },
    { value: 'SUB_SECTION', label: 'Sub Section' }
  ];

  constructor(
    private httpService: HttpService,
    private jwtAuthenticationService :JwtAuthenticationService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.yardFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      hardinessZone: [''],
      yardSubType: ['']
    });

    if (this.jwtAuthenticationService.isLoggedIn()) {
      this.showYards()
    }
  }

  showYards() :void {
    this.httpService.getAll("yards").subscribe({
      next: (body) => {
        this.yardsList = body as Yard[];
        this.yardsListIsHidden = false;
        this.yardItemIsHidden = true;
        this.yardPostIsHidden = true;
      }
    })
  }

  showYard(yardId: number | null) :void {
    this.httpService.get("yard/" + yardId).subscribe({
      next: (body) => {
        this.yardItem = body as Yard}
    })
    this.yardsListIsHidden = true;
    this.yardItemIsHidden = false;
    this.yardPostIsHidden = true;
  }

  postYard() :void {
    if (this.yardFormGroup.valid) {
      this.httpService.post("yards", this.yardFormGroup.value).subscribe({
        next: (body) => {
          this.yardItem = body as Yard;
          this.yardFormGroup.reset();
          this.yardsListIsHidden = true;
          this.yardItemIsHidden = false;
          this.yardPostIsHidden = true;
        }
      })
    }
  }

  deleteYard(yardId: number | null | undefined) :void {
    this.httpService.delete("yard/" + yardId).subscribe({
      next: () => {
        this.showYards();
      }
    });
  }

  addYard() :void {
    this.yardsListIsHidden = true;
    this.yardItemIsHidden = true;
    this.yardPostIsHidden = false;
  }
}
