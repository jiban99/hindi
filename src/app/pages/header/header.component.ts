import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
username:any;
role:any;
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('UserName');
    this.role = localStorage.getItem('role');
  }

}
