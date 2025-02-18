import { Component, OnInit,DoCheck,HostListener } from '@angular/core';
import { ReportserviceService } from '../../reportservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-report-submit',
  templateUrl: './report-submit.component.html',
  styleUrls: ['./report-submit.component.scss']
})


export class ReportSubmitComponent implements OnInit,DoCheck {
  yearList = ['2021','2022','2023','2024','2025'];
  monthList = ['January','Febuary','March','April', 'May','June','July', 'Augest','September','October','November', 'December'];
  totalx: any;
  viewDetail:any;
  totalB: any;
  totalC: any;
  totalNoting: any;
  defaultZero:any={
    first:'',
    second:'',
    third: '',
    fourth:''
  }
  default:any;
  percent= 0;
  isDisabled: boolean = true;
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    console.log('clicked');
      //  if(!this.defaultZero.first){
      //   this.defaultZero.first=0;
      // }
  }

  constructor( private input: ReportserviceService , private route:Router, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    $(document).ready(function () {
      setTimeout(() => {
          $(function () {
              $('[data-bs-toggle="popover"]').popover()
          })
      }, 1000);

  })
    
    if(!sessionStorage.getItem('SessionID')){
      this.route.navigate(['']);
    }

    this.viewDetail = {};
  }

  ngDoCheck(){
    // var bodyData = document.getElementsByTagName("BODY")[0];
    // console.log(bodyData);
    // bodyData.addEventListener('click',function ()
    // {
    //   if(!this.defaultZero.first){
    //     this.defaultZero.first=0;
    //   }
    // });  
    // this.ReportForm.controls['A_Total'].disable();
    // this.ReportForm.controls['B_Total'].disable();
    // this.ReportForm.controls['C_Total'].disable();
  }

  ReportForm = this.fb.group({
    Total_document_issued:['', Validators.required],
    papers_issued_bilingually:['', Validators.required],
    papers_issued_English:['', Validators.required],
    papers_issued_Hindi: ['', Validators.required],
    letter_received_Hindi:['', Validators.required],
    letters_replied_Hindi: ['', Validators.required],
    letters_replied_English: ['', Validators.required],
    answered_not_required:['', Validators.required],
    month:['', Validators.required],
    year:['', Validators.required],
    A_hindi:['', Validators.required],
    B_hindi:['', Validators.required],
    C_hindi:['', Validators.required],
    A_english:['', Validators.required],
    B_english:['', Validators.required],
    C_english:['', Validators.required],
    A_Total:['', Validators.required],
    B_Total:['', Validators.required],
    C_Total:['', Validators.required],
    No_notingpages_hindi:['', Validators.required],
    No_notingpages_english:['', Validators.required],
    no_notingpages:['', Validators.required],
    Mobile : [Number(localStorage.getItem('Mobile'))],
    Employee_Name : [localStorage.getItem('UserName')]
  });


  viewReportModal(){
    let data:{} = this.ReportForm.value;
      this.viewDetail = data;
      console.log(this.viewDetail);
      
  }

  Submit(){

    let data:{} = this.ReportForm.value;
      
      // this.viewDetail = data;
      console.log(this.viewDetail, 'formdata');
      console.log(data,'data');
      
       this.input.insertReport(data).subscribe((result) =>{
              this.toastr.success(result.message)
              // this.route.navigate(['/viewReport']);
              
            }, error => {
              console.log(error);
              this.toastr.error(error);
              
            })
      // this.route.navigate(['/viewReport', data]);
            this.ReportForm.reset();
            

  }
  public countA(){
    let totalcnt = this.ReportForm.value.A_hindi + this.ReportForm.value.A_english;
    this.totalx = parseInt(totalcnt);
    // console.log('count', this.ReportForm.value.A_Total);
    // console.log(this.ReportForm);
  }

  public countB(){
    let totalcnt = this.ReportForm.value.B_hindi + this.ReportForm.value.B_english;
    this.totalB = parseInt(totalcnt);
    // console.log('count', this.ReportForm.value.A_Total);
    // console.log(this.ReportForm);
  }
  public countC(){
    let totalcnt = this.ReportForm.value.C_hindi + this.ReportForm.value.C_english;
    this.totalC = parseInt(totalcnt);
    // console.log('count', this.ReportForm.value.A_Total);
    // console.log(this.ReportForm);
  }
  public countNoting(){
    let totalcnt = this.ReportForm.value.No_notingpages_hindi + this.ReportForm.value.No_notingpages_english;
    this.totalNoting = parseInt(totalcnt);
    console.log('count', this.ReportForm.value.totalNoting);
    console.log(this.ReportForm);
  }

  public checkValue(e:any){
    console.log(e);
    if((e.code=="Tab" || e.code=="Enter") && this.defaultZero.first == ''){
      this.defaultZero.first=0;
    }
  }
  public checkValue1(e:any){
    console.log( 'check1');
    if(e.code=="Tab" || e.code=="Enter" && !this.defaultZero.second){
      this.defaultZero.second=0;
    }
  }
  public checkValue2(e:any){
    console.log(e);
    if(e.code=="Tab" || e.code=="Enter" && !this.defaultZero.third){
      this.defaultZero.third=0;
    }
  }
  public checkValue3(e:any){
    console.log(e);
    if(e.code=="Tab" && !this.defaultZero.fourth){
      this.defaultZero.fourth=0;
    }
  }
  public keyPress(e: KeyboardEvent) {
    console.log(e, 'keypress');
    if(e.code=="Enter"&& !this.default){
      this.default=0;
    }
  }
  onPercentChange(percent: number) {
    console.log('here');  
    if(!this.percent){
      this.percent=0
        }
    }
    
}
