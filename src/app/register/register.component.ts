import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

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
    private registerService: RegisterService,
    private router: Router
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
      this.registerService.postRegistration(this.registerForm.value).subscribe({
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
