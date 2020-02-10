import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode:boolean = false
  authForm:FormGroup
  isLoading = false
  error = null
  authObs = new Observable<AuthResponseData>()

  constructor(private authService: AuthService, private routes: Router ) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6) ])
    })
  }

  onSubmit(){
    this.error = null
    const email = this.authForm.value.email;
    const password = this.authForm.value.password
    this.isLoading = true
    if(!this.isLoginMode){
      this.authObs = this.authService.signup(email,password)
    }else{
      this.authObs = this.authService.login(email, password)
    }
    this.authObs.subscribe(data => {
      console.log(data);
      this.isLoading = false
      this.routes.navigate(['/recipes'])
    }, err => {
      console.log(err)
      this.isLoading = false        
      this.error = err.error.error.message
    })
    //this.authForm.reset({email: this.authForm.value.email})
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode    
  }

  clearError(){
    this.error = null
  }

}
