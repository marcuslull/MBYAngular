import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {YardsComponent} from "../yards/yards.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from "../login/login.component";
import {MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";

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
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  protected breadcrumbText: string = "/ ";
  ngOnInit(): void {
      this.breadcrumbText = window.location.pathname;
  }

  topOfPage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}


