import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
@Input() info:any

  constructor() { }

  ngOnInit(): void {
    if (this.info) {
      console.log('Item info:', this.info);  
      this.info.overview = this.info.overview || '';
      this.info.title = this.info.title || this.info.name || '';
      this.info.poster_path = this.info.poster_path || this.info.profile_path || '';
    }
    
  }

}
