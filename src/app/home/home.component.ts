import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected readonly RegisterComponent = RegisterComponent;
}
