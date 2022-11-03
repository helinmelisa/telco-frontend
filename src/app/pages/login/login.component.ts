import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  formData!: FormGroup;
  data!: User;
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.formData = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const userLogin: User = {
      ...this.formData.value,
    };
    this.authService.checkLogin(userLogin).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
      complete: () => {
        this.localStorageService.set('token', this.data.access_token);
        this.localStorageService.isUserLoggedIn.subscribe();
        this.localStorageService.login();
        this.router.navigateByUrl('home');
      },
    });
  }
}