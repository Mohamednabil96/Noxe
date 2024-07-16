import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorFromLogin:string = '';
  isLoading: boolean = false ;

  loginForm : FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
  })
  
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  loginUser(form:FormGroup){
    if(form.valid){
      this.isLoading = true
      this._authService.signIn(form.value).subscribe({
        next:(data:any) => {
          if (data.message == 'success'){
            //TODO: go to Home
            localStorage.setItem("token",data.token)
            this._authService.savedUser()
            this.isLoading = false
            this._router.navigate(['/'])
          }else{
            this.errorFromLogin= data.message
          }
        }        
      })
    }
  }
}
