import { Injectable } from '@angular/core';

import {MoviePage,Movie,Page} from './movie/movie-page';

import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
   private moviesUrl :string = "/api/movies";
   page:Page;
   
   
  constructor( private http: HttpClient) { }
  
  getMovies(category:string,page:number): Observable<MoviePage> {
	var url = this.moviesUrl + "/search/category?category=" + encodeURIComponent(category)+"&page=" + page;
    var httpOptions = {
		headers: new HttpHeaders(
		{ 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
  
		})
	};   
	return this.http.get<MoviePage>(url,httpOptions);
  }
  
  save(movie:Movie) : Observable<Movie> {
	  var httpOptions = {
		headers: new HttpHeaders(
		{ 
			'Authorization': 'Bearer ' + localStorage.getItem("token"),
			 'Content-Type': 'application/json' 
  
		})
	};   
	  
	  
	  if(movie._links) {
			return this.http.put<Movie>(movie._links.self.href,movie,httpOptions);
	  }else {
	      return this.http.post<Movie>(this.moviesUrl, movie, httpOptions);
	  }
    
  }
  
  findById(movie:Movie) : Observable<Movie> {
	  var httpOptions = {
		headers: new HttpHeaders(
		{ 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
  
		})
	};   
	var links = movie._links;
	var url = links.self.href;
	return this.http.get<Movie>(url,httpOptions);
  }
  
  deleteMovie(movie:Movie) : Observable<Movie> {
	 var httpOptions = {
		headers: new HttpHeaders(
		{ 
			'Authorization': 'Bearer ' + localStorage.getItem("token")
  
		})
	};   
	var links = movie._links;
	var url = links.self.href;
	return this.http.delete<Movie>(url,httpOptions);
  }
}
