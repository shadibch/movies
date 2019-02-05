import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Movie} from '../movie/movie-page';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data:any,
	  private movieService:MovieService,
	  
	  private formBuilder: FormBuilder) {}
loginForm: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }
 onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
	this.movieService.save(this.data.movie).subscribe(r=>{
		this.data.save = true;
	this.dialogRef.close();
	});
	
 }
  ngOnInit() {
	   this.loginForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.required]
    });
  }

}
