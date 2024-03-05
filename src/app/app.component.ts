import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {YardsComponent} from "./yards/yards.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    LoginComponent,
    RegisterComponent,
    YardsComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My BackYard';

  homeIsHidden: boolean = false;
  registerIsHidden: boolean = true;
  loginIsHidden: boolean = true;

  homeOnClick() {
    this.homeIsHidden = false;
    this.loginIsHidden = true;
    this.registerIsHidden = true;
  }

  registerOnClick() {
    this.homeIsHidden = true;
    this.loginIsHidden = true;
    this.registerIsHidden = false;
  }

  loginOnClick() {
    this.homeIsHidden = true;
    this.loginIsHidden = false;
    this.registerIsHidden = true;
  }
}
