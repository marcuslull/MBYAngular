import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {YardDetailsComponent} from "./yard-details/yard-details.component";
import {YardsComponent} from "./yards/yards.component";
import {YardPostComponent} from "./yard-post/yard-post.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home/yards', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'yards', component: YardsComponent},
      {path: 'yardDetails', component: YardDetailsComponent},
      {path: 'yardPost', component: YardPostComponent}
    ]
  },
];
