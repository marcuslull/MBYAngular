import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
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
    NgIf,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My BackYard';

  constructor(
    private router: Router
  ) {
  }

  navigateToYards(): void {
    this.router.navigate(["/home/yards"]).then();
  }
}
