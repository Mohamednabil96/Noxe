import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})

export class PeopleComponent implements OnInit {
  pages: number[] = [];
  peopleData: any = [];
  displayedPeopleData: any = [];
  term: string = "";
  totalResults: any = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searching: boolean = false;

  constructor(private _moviesService: MoviesService) {
    this.pages = new Array(10).fill("").map((ele, index) => index + 1);
  }

  getPerson(pageCount: number) {
    this._moviesService.getPopularPeople(pageCount).subscribe({
      next: (res) => {
        this.peopleData = res.results.map((person: any) => {
          return { ...person, media_type: 'person' };
        });
        this.displayedPeopleData = this.peopleData;
        this.searching = false; // Deactivate searching mode
      }
    });
  }

  ngOnInit(): void {
    this.getPerson(1);
  }

  search(term: string) {
    if (term.trim() === "") {
      this.getPerson(1); // If search term is empty, get the default People
      return;
    }

    const totalPages = 10; // Total pages to search through
    this._moviesService.searchAllPeople(term, totalPages).subscribe({
      next: (res) => {
        this.totalResults = res.map((person: any) => {
          return { ...person, media_type: 'person' };
        });
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.totalResults.length / 20);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updateDisplayedPeopleData();
        this.searching = true; // Activate searching mode
      }
    });
  }

  updateDisplayedPeopleData() { // Function to update displayed data based on the current page
    const startIndex = (this.currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    this.displayedPeopleData = this.totalResults.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.searching) {
      this.updateDisplayedPeopleData();
    } else {
      this.getPerson(page);
    }
  }
}
