import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './user';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
private userExistsUrl = "/api/users/search/userExists?username=";

  constructor(private http:HttpClient) { }
  userExists(username:string): Observable<boolean> {
	return this.http.get<boolean>(this.userExistsUrl + encodeURIComponent(username));
  }
  
  save(user:User) {
	 var httpOptions = {
		headers: new HttpHeaders(
		{ 
		'Content-Type': 'application/json' 
		})
	};   
	return this.http.post<User>("/api/users/", user, httpOptions);
 }
  
}
