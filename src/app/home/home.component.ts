import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {YardsComponent} from "../yards/yards.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    YardsComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RegisterComponent,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  mainIsHidden: boolean = false;
  registerIsHidden: boolean = true;
  loginIsHidden: boolean = true;

  constructor() {
  }

  homeOnClick() {
    this.mainIsHidden = false;
    this.loginIsHidden = true;
    this.registerIsHidden = true;
  }

  registerOnClick() {
    this.mainIsHidden = true;
    this.loginIsHidden = true;
    this.registerIsHidden = false;
  }

  loginOnClick() {
    this.mainIsHidden = true;
    this.loginIsHidden = false;
    this.registerIsHidden = true;
  }
}


