import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportserviceService } from '../../reportservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { LitElement, html} from 'lit-element';
import 'fa-icons';

@Component({
  selector: 'app-admin-view-page',
  templateUrl: './admin-view-page.component.html',
  styleUrls: ['./admin-view-page.component.scss']
})
export class AdminViewPageComponent implements OnInit {
  reportData:any;
  totalData:any;
  viewDetail:any;
  data:any;
  p: number = 1;
  month:any; 
  year:any;
  period:any;
  Employee_Number:any;
  
  yearList = ['2021','2022','2023','2024','2025'];
  monthList = ['January','Febuary','March','April', 'May','June','July', 'August','September','October','November', 'December'];
  employeeList = [
    {
        "Employee_Name": "AJIT KUMAR PANDA",
        "Mobile": "9437095379"
    },
    {
        "Employee_Name": "ANURAG PRASAD",
        "Mobile": "9438421088"
    },
    {
        "Employee_Name": "Dr. ASHIS KUMAR MAHAPATRA",
        "Mobile": "9437303780"
    },
    {
        "Employee_Name": "BIBHU PRASAD MISHRA",
        "Mobile": "9437082373"
    },
    {
        "Employee_Name": "DILLIP KUMAR NANDA",
        "Mobile": "9437291426"
    },
    {
        "Employee_Name": "DILIP KUMAR JENA",
        "Mobile": "9437303211"
    },
    {
        "Employee_Name": "HARA PRASAD DAS",
        "Mobile": "9437077466"
    },
    {
        "Employee_Name": "HARA PRASAD PRUSTI",
        "Mobile": "9437303377"
    },
    {
        "Employee_Name": "MALAYA KUMAR DAS",
        "Mobile": "9937522255"
    },
    {
        "Employee_Name": "NIRUPAMA MOHAPATRA",
        "Mobile": "9437439312"
    },
    {
        "Employee_Name": "P C SAHOO",
        "Mobile": "9437574277"
    },
    {
        "Employee_Name": "Dr. PABITRANANDA PATNAIK",
        "Mobile": "9437003107"
    },
    {
        "Employee_Name": "PRASANT KUMAR NAYAK",
        "Mobile": "9437140454"
    },
    {
        "Employee_Name": "SAMSAD AHEMAD KHAN",
        "Mobile": "9437126786"
    },
    {
        "Employee_Name": "SARITA SAHOO",
        "Mobile": "9437464228"
    },
    {
        "Employee_Name": "SUJATA DAS",
        "Mobile": "9437764134"
    },
    {
        "Employee_Name": "SNIGDHA ACHARYA",
        "Mobile": "9437476599"
    },
    {
      "Employee_Name": "SRIPATI KUMAR PRADHAN",
      "Mobile": "9999111122"
  }
];

  constructor(private route: ActivatedRoute, private view: ReportserviceService ,private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    if(!sessionStorage.getItem('SessionID')){
      this.router.navigate(['']);
    }

    this.view.adminViewReport().subscribe((result)=>{
      this.reportData = result.resultData;
      this.totalData = result.totalresults;
    });
  this.viewDetail={EMP_Data:[{}]};
  this.data = {};
 
  }

  viewResult(x:any){
    this.viewDetail = x;
  }
  Search(){
    // console.log(this.month);
    // console.log(this.year);

    if(this.month != null && this.year != null){
      this.view.adminGetDataByYM(this.year, {month:this.month}).subscribe((result) =>{
        this.reportData = result.resultData;
        this.totalData = result.totalresults;
        });

    } else if(this.period != null && this.year != null) {
      this.view.adminGetQuaterData(this.year, {period : this.period}).subscribe((result) =>{
        this.reportData = result.resultData;
        this.totalData = result.totalresults;
      });

    } else {
      this.view.adminGetDataByYear(this.year).subscribe((result) =>{
        this.reportData = result.resultData;
        this.totalData = result.totalresults;
      });
    }
    this.month = undefined;
    this.year = undefined;
    this.period = undefined;
  }

  delete(reportID:any){
    this.view.deleteReport(reportID).subscribe((result)=>{
      this.toastr.success(result.message);
      this.ngOnInit();
      // this.route.navigate(['/viewReport']);
    }, error => {
      console.log(error);
      this.toastr.error(error);
      
    })

  }

  viewByName(){
    this.view.getDataByName(this.Employee_Number).subscribe((result)=>{
      this.reportData = result.resultData;
      this.totalData = result.totalresults;
      this.Employee_Number = undefined;
    });
    
  }

  reload(){
    window.location.reload();
  }

  Submit(){
    this.view.editReport(this.viewDetail.ReportID, this.data).subscribe((result)=>{
      this.toastr.success(result.message)
      this.ngOnInit();
      // this.route.navigate(['/viewReport']);
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }
}
