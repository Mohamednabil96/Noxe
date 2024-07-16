import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss']
})
export class NetworkDetailsComponent implements OnInit {
  networkDetails: any = null;

  constructor(private _activatedRoute: ActivatedRoute, private _moviesService: MoviesService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getNetworkDetails(id);
      } else {
        console.error('Invalid parameters');
      }
    });
  }

  getNetworkDetails(networkId: string) {
    this._moviesService.getNetworkDetails(networkId).subscribe({
      next: (res) => {
        this.networkDetails = res;
      },
      error: (err) => {
        console.error('Error fetching network details:', err);
      }
    });
  }
}
