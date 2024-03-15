import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {HttpService} from "../http/http.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatFormField, MatHint, MatIcon, MatInput, MatLabel, MatButton],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  public errorMessage: string | null = null;
  protected registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', [Validators.required, Validators.pattern('^(USER|ADMIN)$')]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.httpService.postRegistration("register", this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(["/login"])
        },
        error: () => {
          this.errorMessage = "Conflict: User already exists"
        }
      });
    }
  }
}
