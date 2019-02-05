import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators,AbstractControl} from "@angular/forms";
import {RegisterService} from "../register.service";
import {User} from "../user";
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 registerForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private registerservice:RegisterService) { }
	saved = false;
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
	var user= new User();
	user.username = this.registerForm.controls.username.value;
	user.password = this.registerForm.controls.password.value;
	
    
     // this.router.navigate(['signin']);
	 this.registerservice.save(user).subscribe(u=>{
		 this.saved = true;
		 alert("User: " + user.username + " is registered now. You can login safely");
		 this.router.navigate(['signin']);
	 });
  }

  ngOnInit() {
    this.saved = false;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]
,
	  this.validateUsernameNotTaken.bind(this)
 
	  ],
      password: ['', Validators.required]
    });
  }
	validateUsernameNotTaken(control: AbstractControl) {
      return this.registerservice.userExists(control.value).pipe(map(res => 
         res ? { username: true }:  null
    )
	);
 
}
}
