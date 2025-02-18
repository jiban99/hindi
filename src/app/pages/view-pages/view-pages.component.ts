import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportserviceService } from '../../reportservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-view-pages',
  templateUrl: './view-pages.component.html',
  styleUrls: ['./view-pages.component.scss']
})
export class ViewPagesComponent implements OnInit {
reportData:any = [];
viewDetail:any;
data:any;
p: number = 1;
month:any;
year:any;
period:any;
totalData:any;

yearList = ['2021','2022','2023','2024','2025'];
monthList = ['January','Febuary','March','April', 'May','June','July', 'August','September','October','November', 'December'];
  totalData_bilingually: any;
  totalData_issued_English: any;
  totalData_issued_hindi: any;
  totalData_recieved_hindi: any;
  totalData_replied_Hindi: any;
  totalData_replied_English: any;
  totalData_not_required: any;
  totalData_A_hindi: any;
  totalData_A_english: any;
  totalData_A_Total: any;
  totalData_B_hindi: any;
  totalData_B_english: any;
  totalData_B_Total: any;
  totalData_C_hindi: any;
  totalData_C_english: any;
  totalData_C_Total: any;
  totalData_notingpages_hindi: any;
  totalData_notingpages_english: any;
  totalData_notingpages: any;
  

  constructor(private route: ActivatedRoute, private view: ReportserviceService ,private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    if(!sessionStorage.getItem('SessionID')){
      this.router.navigate(['']);
    }

    this.view.viewReport(localStorage.getItem('Mobile')).subscribe((result)=>{
      this.reportData = result;
      // console.log(this.reportData.length);  
      this.totalData = 0;
      this.totalData_bilingually= 0;
      this.totalData_issued_English= 0;
      this.totalData_issued_hindi= 0;
      this.totalData_recieved_hindi= 0;
      this.totalData_replied_Hindi= 0;
      this.totalData_replied_English= 0;
      this.totalData_not_required= 0;
      this.totalData_A_hindi= 0;
      this.totalData_A_english= 0;
      this.totalData_A_Total= 0;
      this.totalData_B_hindi= 0;
      this.totalData_B_english= 0;
      this.totalData_B_Total= 0;
      this.totalData_C_hindi= 0;
      this.totalData_C_english= 0;
      this.totalData_C_Total= 0;
      this.totalData_notingpages_hindi= 0;
      this.totalData_notingpages_english= 0;
      this.totalData_notingpages= 0;
      if(this.reportData.length > 0){
        for(let i = 0; i < this.reportData.length; i++){
          // console.log(this.reportData.length,  this.reportData.Total_document_issued);
          
          this.totalData += this.reportData[i].Total_document_issued;
          this.totalData_bilingually += this.reportData[i].papers_issued_bilingually;
          this.totalData_issued_English += this.reportData[i].papers_issued_English;
          this.totalData_issued_hindi += this.reportData[i].papers_issued_Hindi;
          this.totalData_recieved_hindi += this.reportData[i].letter_received_Hindi;
          this.totalData_replied_Hindi += this.reportData[i].letters_replied_Hindi;
          this.totalData_replied_English += this.reportData[i].letters_replied_English;
          this.totalData_not_required += this.reportData[i].answered_not_required;
          this.totalData_A_hindi += this.reportData[i].A_hindi;
          this.totalData_A_english += this.reportData[i].A_english;
          this.totalData_A_Total += this.reportData[i].A_Total;
          this.totalData_B_hindi += this.reportData[i].B_hindi;
          this.totalData_B_english += this.reportData[i].B_english;
          this.totalData_B_Total += this.reportData[i].B_Total;
          this.totalData_C_hindi += this.reportData[i].C_hindi;
          this.totalData_C_english += this.reportData[i].C_english;
          this.totalData_C_Total += this.reportData[i].C_Total;
          this.totalData_notingpages_hindi += this.reportData[i].No_notingpages_hindi;
          this.totalData_notingpages_english += this.reportData[i].No_notingpages_english;
          this.totalData_notingpages += this.reportData[i].no_notingpages;          
        }
        // console.log(this.totalData);
      }          
    });
  this.viewDetail={};
  this.data = {};
  
  
  }


  viewResult(x:any){
    this.viewDetail = x;
  }
  Search(){
    console.log(this.month);
    console.log(this.year);
    if(this.month != undefined && this.year != undefined){
      this.view.getDataByYM(localStorage.getItem('Mobile'),{ year: this.year, month:this.month}).subscribe((result) =>{
          this.reportData = result;
          this.totalData = 0;
      this.totalData_bilingually= 0;
      this.totalData_issued_English= 0;
      this.totalData_issued_hindi= 0;
      this.totalData_recieved_hindi= 0;
      this.totalData_replied_Hindi= 0;
      this.totalData_replied_English= 0;
      this.totalData_not_required= 0;
      this.totalData_A_hindi= 0;
      this.totalData_A_english= 0;
      this.totalData_A_Total= 0;
      this.totalData_B_hindi= 0;
      this.totalData_B_english= 0;
      this.totalData_B_Total= 0;
      this.totalData_C_hindi= 0;
      this.totalData_C_english= 0;
      this.totalData_C_Total= 0;
      this.totalData_notingpages_hindi= 0;
      this.totalData_notingpages_english= 0;
      this.totalData_notingpages= 0;
      if(this.reportData.length > 0){
        for(let i = 0; i < this.reportData.length; i++){
          console.log(this.reportData.length,  this.reportData.Total_document_issued);
          
          this.totalData += this.reportData[i].Total_document_issued;
          this.totalData_bilingually += this.reportData[i].papers_issued_bilingually;
          this.totalData_issued_English += this.reportData[i].papers_issued_English;
          this.totalData_issued_hindi += this.reportData[i].papers_issued_Hindi;
          this.totalData_recieved_hindi += this.reportData[i].letter_received_Hindi;
          this.totalData_replied_Hindi += this.reportData[i].letters_replied_Hindi;
          this.totalData_replied_English += this.reportData[i].letters_replied_English;
          this.totalData_not_required += this.reportData[i].answered_not_required;
          this.totalData_A_hindi += this.reportData[i].A_hindi;
          this.totalData_A_english += this.reportData[i].A_english;
          this.totalData_A_Total += this.reportData[i].A_Total;
          this.totalData_B_hindi += this.reportData[i].B_hindi;
          this.totalData_B_english += this.reportData[i].B_english;
          this.totalData_B_Total += this.reportData[i].B_Total;
          this.totalData_C_hindi += this.reportData[i].C_hindi;
          this.totalData_C_english += this.reportData[i].C_english;
          this.totalData_C_Total += this.reportData[i].C_Total;
          this.totalData_notingpages_hindi += this.reportData[i].No_notingpages_hindi;
          this.totalData_notingpages_english += this.reportData[i].No_notingpages_english;
          this.totalData_notingpages += this.reportData[i].no_notingpages; 
          
        }
        // console.log(this.totalData);
      } 
        });

    }else if(this.period != undefined && this.year != undefined) {
      this.view.getquaterdata(localStorage.getItem('Mobile'), {year:this.year, period : this.period}).subscribe((result) =>{
        this.reportData = result;
        this.totalData = 0;
      this.totalData_bilingually= 0;
      this.totalData_issued_English= 0;
      this.totalData_issued_hindi= 0;
      this.totalData_recieved_hindi= 0;
      this.totalData_replied_Hindi= 0;
      this.totalData_replied_English= 0;
      this.totalData_not_required= 0;
      this.totalData_A_hindi= 0;
      this.totalData_A_english= 0;
      this.totalData_A_Total= 0;
      this.totalData_B_hindi= 0;
      this.totalData_B_english= 0;
      this.totalData_B_Total= 0;
      this.totalData_C_hindi= 0;
      this.totalData_C_english= 0;
      this.totalData_C_Total= 0;
      this.totalData_notingpages_hindi= 0;
      this.totalData_notingpages_english= 0;
      this.totalData_notingpages= 0;
      if(this.reportData.length > 0){
        for(let i = 0; i < this.reportData.length; i++){
          console.log(this.reportData.length,  this.reportData.Total_document_issued);
          
          this.totalData += this.reportData[i].Total_document_issued;
          this.totalData_bilingually += this.reportData[i].papers_issued_bilingually;
          this.totalData_issued_English += this.reportData[i].papers_issued_English;
          this.totalData_issued_hindi += this.reportData[i].papers_issued_Hindi;
          this.totalData_recieved_hindi += this.reportData[i].letter_received_Hindi;
          this.totalData_replied_Hindi += this.reportData[i].letters_replied_Hindi;
          this.totalData_replied_English += this.reportData[i].letters_replied_English;
          this.totalData_not_required += this.reportData[i].answered_not_required;
          this.totalData_A_hindi += this.reportData[i].A_hindi;
          this.totalData_A_english += this.reportData[i].A_english;
          this.totalData_A_Total += this.reportData[i].A_Total;
          this.totalData_B_hindi += this.reportData[i].B_hindi;
          this.totalData_B_english += this.reportData[i].B_english;
          this.totalData_B_Total += this.reportData[i].B_Total;
          this.totalData_C_hindi += this.reportData[i].C_hindi;
          this.totalData_C_english += this.reportData[i].C_english;
          this.totalData_C_Total += this.reportData[i].C_Total;
          this.totalData_notingpages_hindi += this.reportData[i].No_notingpages_hindi;
          this.totalData_notingpages_english += this.reportData[i].No_notingpages_english;
          this.totalData_notingpages += this.reportData[i].no_notingpages; 
          
        }
        // console.log(this.totalData);
      } 
      });

    } else {
      this.view.getDataByYear(localStorage.getItem('Mobile'), {year:this.year}).subscribe((result) =>{
        this.reportData = result;
        this.totalData = 0;
      this.totalData_bilingually= 0;
      this.totalData_issued_English= 0;
      this.totalData_issued_hindi= 0;
      this.totalData_recieved_hindi= 0;
      this.totalData_replied_Hindi= 0;
      this.totalData_replied_English= 0;
      this.totalData_not_required= 0;
      this.totalData_A_hindi= 0;
      this.totalData_A_english= 0;
      this.totalData_A_Total= 0;
      this.totalData_B_hindi= 0;
      this.totalData_B_english= 0;
      this.totalData_B_Total= 0;
      this.totalData_C_hindi= 0;
      this.totalData_C_english= 0;
      this.totalData_C_Total= 0;
      this.totalData_notingpages_hindi= 0;
      this.totalData_notingpages_english= 0;
      this.totalData_notingpages= 0;
      if(this.reportData.length > 0){
        for(let i = 0; i < this.reportData.length; i++){
          console.log(this.reportData.length,  this.reportData.Total_document_issued);
          
          this.totalData += this.reportData[i].Total_document_issued;
          this.totalData_bilingually += this.reportData[i].papers_issued_bilingually;
          this.totalData_issued_English += this.reportData[i].papers_issued_English;
          this.totalData_issued_hindi += this.reportData[i].papers_issued_Hindi;
          this.totalData_recieved_hindi += this.reportData[i].letter_received_Hindi;
          this.totalData_replied_Hindi += this.reportData[i].letters_replied_Hindi;
          this.totalData_replied_English += this.reportData[i].letters_replied_English;
          this.totalData_not_required += this.reportData[i].answered_not_required;
          this.totalData_A_hindi += this.reportData[i].A_hindi;
          this.totalData_A_english += this.reportData[i].A_english;
          this.totalData_A_Total += this.reportData[i].A_Total;
          this.totalData_B_hindi += this.reportData[i].B_hindi;
          this.totalData_B_english += this.reportData[i].B_english;
          this.totalData_B_Total += this.reportData[i].B_Total;
          this.totalData_C_hindi += this.reportData[i].C_hindi;
          this.totalData_C_english += this.reportData[i].C_english;
          this.totalData_C_Total += this.reportData[i].C_Total;
          this.totalData_notingpages_hindi += this.reportData[i].No_notingpages_hindi;
          this.totalData_notingpages_english += this.reportData[i].No_notingpages_english;
          this.totalData_notingpages += this.reportData[i].no_notingpages; 
          
        }
        // console.log(this.totalData);
      } 
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
  reload(){
    window.location.reload();
    
  }
  
}
