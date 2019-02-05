import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HttpClientXsrfModule} from '@angular/common/http'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule,MatInputModule} from '@angular/material';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthGuard} from './guards/auth-guard.service';
import { RegisterComponent } from './register/register.component';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
	entryComponents:[MovieDialogComponent],
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDialogComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	ReactiveFormsModule ,
	MatInputModule,
	MatDialogModule,
	HttpClientModule,
	    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
	HttpClientXsrfModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
