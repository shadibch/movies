import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }
	
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    var payload = {"username":this.loginForm.controls.username.value,"password":this.loginForm.controls.password.value};
    this.apiService.login(payload).subscribe(data => {
      
        window.localStorage.setItem('token', data.token);
		this.apiService.validateToken();
        this.router.navigate(['movies']);
          },err=>{
			  
			  this.invalidLogin = true;
		  });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
