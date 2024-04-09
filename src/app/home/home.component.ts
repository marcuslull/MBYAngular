import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {YardsComponent} from "../yards/yards.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from "../login/login.component";
import {MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {StateManagerService} from "../state/state-manager.service";

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
    LoginComponent,
    MatDrawerContainer,
    MatSidenavModule,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    protected stateManagerService: StateManagerService,
    private jwtAuthenticationService: JwtAuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.stateManagerService.loggedIn = this.jwtAuthenticationService.isLoggedIn();
  }

  topOfPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  addYard() {
    this.router.navigate(['/home/yardUpdate']).then(r => {
      // let's reset just in case a previous yard edit was interrupted and never resolved
      this.stateManagerService.currentlySelectedYard = undefined;
      this.stateManagerService.isYardEdit = false;
    })
  }
}


