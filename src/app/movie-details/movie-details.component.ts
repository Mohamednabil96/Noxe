import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  details: any = null;

  constructor(private _activatedRoute: ActivatedRoute, private _moviesService: MoviesService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const id = params['id'];
      const type = params['type'];
      if (id && type) {
        this.getDetails(id, type);
      } else {
        console.error('Invalid parameters');
      }
    });
  }

  getDetails(id: string, type: string) {
    if (type === 'movie') {
      this._moviesService.getMovieDetails(id).subscribe({
        next: (res) => {
          this.details = res;
          console.log(this.details);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else if (type === 'tv') {
      this._moviesService.getTvShowDetails(id).subscribe({
        next: (res) => {
          this.details = res;
          console.log(this.details);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }else if (type === 'person') { 
      this._moviesService.getPersonDetails(id).subscribe({
        next: (res) => {
          this.details = res;
          console.log(this.details);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
