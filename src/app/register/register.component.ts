import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
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
