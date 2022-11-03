import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formData!: FormGroup;
  constructor(
    private router:Router,
    private authService: AuthService,
    private fromBuilder: FormBuilder
    ) { 
      this.formData = this.fromBuilder.group({
        userName: ['',Validators.required],
        password: ['',Validators.required]
      })
    }

  ngOnInit(): void {
  }

  login(){
    const data = this.formData.value;
    if (data.userName && data.password) {
      this.authService.login(data.userName, data.password)
      .subscribe( 
        (response: any) => {
            console.log("User is logged in");
            this.router.navigateByUrl('/home');
        }
      );
    }
  }
}
