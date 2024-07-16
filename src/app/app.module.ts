import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { PeopleComponent } from './people/people.component';
import { NetworkComponent } from './network/network.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './item/item.component';
import { LoadingComponent } from './loading/loading.component';
import { SeemorePipe } from './seemore.pipe';
import { SearchPipe } from './search.pipe';
import { NetworkDetailsComponent } from './network-details/network-details.component';
import { ProfileComponent } from './setting/profile/profile.component';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { MoviesInterceptor } from './movies.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    MoviesComponent,
    TvShowsComponent,
    PeopleComponent,
    NetworkComponent,
    LoginComponent,
    RegisterComponent,
    MovieDetailsComponent,
    NotFoundComponent,
    ItemComponent,
    LoadingComponent,
    SeemorePipe,
    SearchPipe,
    NetworkDetailsComponent,
    HomeHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MoviesInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
