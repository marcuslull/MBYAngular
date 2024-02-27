import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  protected loginForm: FormGroup = new FormGroup({});
  public errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login().subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.loginForm.reset();
          console.log(response);
          this.router.navigate(['/home']);
        },
        error: () => {this.errorMessage = "Invalid username or password"}
      })
    }
  }
}
