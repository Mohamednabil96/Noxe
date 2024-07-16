import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  pages: number[] = [];
  tvData: any = [];
  displayedTvData: any = [];
  term: string = "";
  totalResults: any = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searching: boolean = false;

  constructor(private _moviesService: MoviesService) {
    this.pages = new Array(10).fill("").map((ele, index) => index + 1);
  }

  getTV(pageCount: number) {
    this._moviesService.getPopularTvShows(pageCount).subscribe({
      next: (res) => {
        this.tvData = res.results.map((tvShow: any) => {
          return { ...tvShow, media_type: 'tv' };
        });
        this.displayedTvData = this.tvData;
        this.searching = false; // Deactivate searching mode
      }
    });
  }

  ngOnInit(): void {
    this.getTV(1);
  }

  search(term: string) {
    if (term.trim() === "") {
      this.getTV(1); // If search term is empty, get the default TV shows
      return;
    }

    const totalPages = 10; // Total pages to search through
    this._moviesService.searchAllTVShows(term, totalPages).subscribe({
      next: (res) => {
        this.totalResults = res.map((tvShow: any) => {
          return { ...tvShow, media_type: 'tv' };
        });
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.totalResults.length / 20);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updateDisplayedTvData();
        this.searching = true; // Activate searching mode
      }
    });
  }

  updateDisplayedTvData() { // Function to update displayed data based on the current page
    const startIndex = (this.currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    this.displayedTvData = this.totalResults.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.searching) {
      this.updateDisplayedTvData();
    } else {
      this.getTV(page);
    }
  }
}
