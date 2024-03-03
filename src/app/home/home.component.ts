import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {YardsComponent} from "./yards/yards.component";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    YardsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected readonly RegisterComponent = RegisterComponent;
  protected readonly JwtAuthenticationService = JwtAuthenticationService;

  constructor(private jwtAuthenticationService :JwtAuthenticationService) {
  }

  protected logout() :void {
    this.jwtAuthenticationService.logout()
  }
}
