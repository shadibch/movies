import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieComponent} from './movie/movie.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './guards/auth-guard.service';

const routes: Routes = [
{path:'movies',
    component: MovieComponent,  
    canActivate: [AuthGuard]},
{path:'signup',component:RegisterComponent},
{path:'signin',component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
