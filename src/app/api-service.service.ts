import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Token} from './token';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
private moviesUrl :string = "/api/auth"
 authenticated:boolean = false;
 httpOptions = {
  headers: new HttpHeaders(
  { 'Content-Type': 'application/json' 
  
  })
};   

private roles ;
  constructor(private http: HttpClient,private jwtHelper:JwtHelperService) { }
  
   login(payload) : Observable<Token> {
	   
	   return this.http.post<Token>(this.moviesUrl,payload,this.httpOptions);
   }
	validateToken() {
		var token = window.localStorage.getItem('token');
			var object = this.jwtHelper.decodeToken(token);
			this.roles = object.roles;
		
		
	}
	
	hasRole(rolename:string): boolean {
		return this.roles && this.roles.includes(rolename);
	}
	isAuthenticated():boolean {				
		return window.localStorage.getItem('token') != null;
	}		
}
