import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  pages: number[] = [];
  movieData: any = [];
  displayedMovieData: any = [];
  term: string = "";
  totalResults: any = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searching: boolean = false;

  constructor(private _moviesService: MoviesService) {
    this.pages = new Array(10).fill("").map((ele, index) => index + 1);
  }

  getMovie(pageCount: number) {
    this._moviesService.getPopularMovies(pageCount).subscribe({
      next: (res) => {
        this.movieData = res.results.map((movie: any) => {
          return { ...movie, media_type: 'movie' };
        });
        this.displayedMovieData = this.movieData;
        this.searching = false; // Deactivate searching mode
      }
    });
  }

  ngOnInit(): void {
    this.getMovie(1);
  }

  search(term: string) {
    if (term.trim() === "") {
      this.getMovie(1); // If search term is empty, get the default Movies
      return;
    }

    const totalPages = 10; // Total pages to search through
    this._moviesService.searchAllMovies(term, totalPages).subscribe({
      next: (res) => {
        this.totalResults = res.map((movie: any) => {
          return { ...movie, media_type: 'movie' };
        });
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.totalResults.length / 20);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updateDisplayedMovieData();
        this.searching = true; // Activate searching mode
      }
    });
  }

  updateDisplayedMovieData() { // Function to update displayed data based on the current page
    const startIndex = (this.currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    this.displayedMovieData = this.totalResults.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.searching) {
      this.updateDisplayedMovieData();
    } else {
      this.getMovie(page);
    }
  }
}
