
  // networks: any[] = [
  //   { id: 213, name: 'Netflix' },
  //   { id: 49, name: 'HBO' },
  //   { id: 1024, name: 'Amazon Prime Video' },
  //   { id: 12, name: 'ABC' },
  //   { id: 56, name: 'CBS' },
  //   { id: 78, name: 'NBC' },
  //   { id: 123, name: 'Fox' },
  //   { id: 456, name: 'Showtime' },
  //   { id: 789, name: 'Starz' },
  //   { id: 321, name: 'Disney+' },
  //   { id: 2685, name: 'CBS All Access' },
  //   { id: 531, name: 'Paramount+' },
  //   { id: 453, name: 'Hulu' },
  //   { id: 2739, name: 'Peacock' },
  //   { id: 2553, name: 'Apple TV+' },
  //   { id: 3725, name: 'Discovery+' },
  //   { id: 192, name: 'ESPN+' },
  //   { id: 1174, name: 'Crunchyroll' },
  //   { id: 1658, name: 'Funimation' },
  //   { id: 27, name: 'Sling TV' }
  //   // Add more networks as needed
  // ];

  import { Component, OnInit } from '@angular/core';
  import { MoviesService } from '../movies.service';
  
  @Component({
    selector: 'app-network',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss']
  })
  export class NetworkComponent implements OnInit {
    networks: any[] = [
    { id: 213, name: 'Netflix' },
    { id: 49, name: 'HBO' },
    { id: 1024, name: 'Amazon Prime Video' },
    { id: 2552, name: 'Apple TV+' },
    { id: 2739, name: 'Disney+' },
    { id: 3626, name: 'Shahid' },
    { id: 56, name: 'CN' },
    { id: 4330, name: 'Paramount' },
    { id: 453, name: 'Hulu' },
    { id: 19, name: 'Fox' },
    { id: 67, name: 'Showtime' },
    { id: 13, name: 'Nickelodeon' },
    { id: 43, name: 'National Geographic' },
    { id: 29, name: 'ESPN' },
    { id: 33, name: 'MTV' },
    { id: 59, name: 'CNN' },
    { id: 318, name: 'Starz' },
    { id: 3353, name: 'Peacock' },
    { id: 1675, name: 'OSN' },
    { id: 5187, name: 'Tubi' }
    ];
    displayedNetwork: any[] = [];
  
    constructor(private _moviesService: MoviesService) {}
  
    ngOnInit(): void {
      this.loadNetworks();
    }
  
    loadNetworks() {
      this.networks.forEach(network => {
        this._moviesService.getNetworkDetails(network.id).subscribe({
          next: (res) => {
            this.displayedNetwork.push(res);
          },
          error: (err) => {
            console.error('Error fetching network details:', err);
          }
        });
      });
    }
  }
  
