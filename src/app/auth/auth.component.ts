import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

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

  constructor(private authService: AuthService, private routes: Router, private componentFactoryResolver: ComponentFactoryResolver ) { }
  //find first ocurrence of the directive
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
  private closeSubs: Subscription

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
      this.showErrorAlert(this.error)
    })
    //this.authForm.reset({email: this.authForm.value.email})
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode    
  }

  clearError(){
    this.error = null
  }

  onCloseError(){
    this.error = null
  }

  showErrorAlert(message: string){
    //need to aded to entrycomponents in app.modules
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
      );
    
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear() //remove elements
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory) //add component and store in reference for data and event biding
    componentRef.instance.message = message
    this.closeSubs = componentRef.instance.close.subscribe(() => {
      this.closeSubs.unsubscribe()
      hostViewContainerRef.clear()
    })
  }
}
