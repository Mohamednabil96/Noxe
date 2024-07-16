import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { PeopleComponent } from './people/people.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NetworkComponent } from './network/network.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NetworkDetailsComponent } from './network-details/network-details.component';


const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", canActivate:[AuthGuard], component:HomeComponent},
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:page', component: MoviesComponent },
  {path:"tvShow", canActivate:[AuthGuard], component: TvShowsComponent},
  {path:"people", canActivate:[AuthGuard], component: PeopleComponent},
  {path:"about", canActivate:[AuthGuard], component: AboutComponent},
  {path:"details/:type/:id", canActivate:[AuthGuard], component: MovieDetailsComponent},
  {path:"network", canActivate:[AuthGuard], component: NetworkComponent},
  { path: 'network-details/:id', component: NetworkDetailsComponent },
  {path:"login", canActivate: [LoginGuard],  component: LoginComponent},
  {path:"register", canActivate: [LoginGuard], component: RegisterComponent},
  {path:"setting", loadChildren:()=> import('./setting/setting.module').then((res)=>res.SettingModule)},



  {path:"**", component: NotFoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
