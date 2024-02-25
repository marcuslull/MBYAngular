import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";
import {Registration} from "./registration";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  protected registerForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', [Validators.required, Validators.pattern('^(USER|ADMIN)$')]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let registration: Registration = this.registerForm.value;
      this.registerService.postRegistration(registration)
        this.registerForm.reset();
    }
  }
}
