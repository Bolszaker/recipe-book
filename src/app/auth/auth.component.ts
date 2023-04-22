import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 
import { AuthResponseData, AuthService } from './auth.service';
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  constructor(
    private authService: AuthService, 
    private router: Router){}
 
  isLoginMode = true;
  isLoading = false;
  error: string = null;
 
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
 
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
 
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
 
    let authObs: Observable<AuthResponseData>;
 
    if(this.isLoginMode){
      authObs = this.authService.login(email,password);
    } else {
      authObs = this.authService.signUp(email,password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData), 
        this.isLoading = false,
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.log(error), 
        this.isLoading = false, 
        this.error = error
      },
      complete: () => this.isLoading = false
    });
    
    form.reset();
  }

  onCloseError(){
    this.error = null;
  }
}
 