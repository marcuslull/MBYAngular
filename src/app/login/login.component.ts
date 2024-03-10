import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatIcon,
    MatError,
    MatLabel,
    MatHint,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  protected loginForm: FormGroup = new FormGroup({});
  protected errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private jwtAuthenticationService: JwtAuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword).subscribe({
        next: (body) => {
          this.jwtAuthenticationService.setJwtToken(body);
          this.router.navigate(["/home/yards"])
        },
        error: () => {
          this.errorMessage = "Invalid username or password"
        }
      })
    }
  }
}
