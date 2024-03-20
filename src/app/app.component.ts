import {Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {YardsComponent} from "./yards/yards.component";
import {NgIf} from "@angular/common";
import {StateManagerService} from "./state/state-manager.service";

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
    private stateManagementService: StateManagerService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.stateManagementService.retrieveState();
      }
    })
  }
}
