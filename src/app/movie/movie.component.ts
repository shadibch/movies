import { Component, OnInit } from '@angular/core';
import {MovieService} from '../movie.service';
import { Observable } from 'rxjs';
import {MoviePage,Movie} from './movie-page';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MovieDialogComponent} from '../movie-dialog/movie-dialog.component';
import {ApiService} from '../api-service.service';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
currentPage:MoviePage;
category:string = "Action";
movie:Movie;
categories = [ "Action","Comedy","Horror","Thriller"];
  constructor(private movieService:MovieService,public dialog: MatDialog, private apiService:ApiService) { }

  ngOnInit() {
		this.movieService.getMovies(this.category,0).subscribe(u=>{
		  this.currentPage = u;
		  });

  }
  
   updatePage(index:number) {
    this.movieService.getMovies(this.category,index).subscribe(u=>{
		  this.currentPage = u;
		  console.log("Users: " + u);
		  });
  }
  
  
  addMovie() {
	
	this.movie = new Movie();
	this.movie.category = this.category;
	const data_ = {'save' : false,'movie': this.movie}; 		
	
	  const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '800px',
      data: data_
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + JSON.stringify(result));
     if(data_.save) {
	    this.updatePage(this.currentPage.page.number);
		/*this.movieService.save(result.movie).subscribe(r=>{
		
	   });*/
	 }
    });	
  }
	
	editMovie(movie:Movie) {
		this.movieService.findById(movie).subscribe(m=> {
			this.movie = m;
			this.movie.category = this.category;
			const data_ = {'save' : false,'movie': this.movie}; 	
			const dialogRef = this.dialog.open(MovieDialogComponent, {
               width: '800px',
               data: data_
            });
			dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed ' + JSON.stringify(result));
			if(data_.save) {
		this.updatePage(this.currentPage.page.number);		
		/*this.movieService.save(result.movie).subscribe(r=>{
		
			});*/
	 }
    });	  
		});
	}
	handleAfterExecutionSuccess(data:any) {
		this.updatePage(this.currentPage.page.number);
	}
	deleteMovie(movie:Movie) {
		if(confirm("Are you sure you want to delete the Movie: " + encodeURIComponent( movie.title) + " ?")) {
			this.movieService.deleteMovie(movie).subscribe(m=> {
			this.updatePage(this.currentPage.page.number);
		});
	}
	}
}
