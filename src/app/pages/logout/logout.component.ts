import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportserviceService } from '../../reportservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private end: ReportserviceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.end.logout();
    this.toastr.success("Logout successfull");
    this.router.navigate(['']);  
  }

}
