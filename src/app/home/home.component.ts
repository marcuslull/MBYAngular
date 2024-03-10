import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {YardsComponent} from "../yards/yards.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from "../login/login.component";
import {MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {HomeService} from "./home.service";

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
export class HomeComponent {
  constructor(
    private router: Router,
    protected homeService: HomeService
  ) {
  }

  topOfPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  addYard() {
    this.router.navigate(['/home/yardPost']).then(r => {
      this.homeService.breadcrumbText = window.location.pathname;
    })
  }
}


