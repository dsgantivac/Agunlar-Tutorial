import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6) ])
    })
  }

  onSubmit(){
    const email = this.authForm.value.email;
    const password = this.authForm.value.password
    this.isLoading = true
    if(!this.isLoginMode){
      this.authService.signup(email,password).subscribe(data => {
        console.log(data);
        this.isLoading = false
      }, err => {
        console.log(err)
        this.isLoading = false        
        this.error = err.error.error.message
      })
      //this.authForm.reset({email: this.authForm.value.email})
    }else{
      this.authService.login(email, password).subscribe(data => {
        console.log(data);
        this.isLoading = false
      }, err => {
        console.log(err);
        this.isLoading = false
        this.error = err.message
      })
    }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode    
  }

}
