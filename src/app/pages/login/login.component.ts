import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportserviceService } from '../../reportservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private check: ReportserviceService, private toastr: ToastrService, private fb: FormBuilder  ) { }
  data:any;
  ngOnInit(): void {


  }

  LoginForm = this.fb.group({
    mobile:['', Validators.required],
    password:['', Validators.required],
  })

  private sha512Hash(data:any) {
    try {
      return CryptoJS.SHA512(data).toString();
    } catch (error) {
      console.log(error);
    }
  }

  Submit(){
    this.data = this.LoginForm.value;
    this.data.password = this.sha512Hash(this.data.password);
    console.log('12456');
    
    if (this.data.mobile != '' && this.data.password != ''){
      console.log('hrhh');
      
        this.check.login(this.data).subscribe((response) =>{
          console.log('hhhhh');
          
              if(response.results === null)
              {
                this.toastr.error('Please Enter Correct Mobile Number');
              }else if(this.data.password === response.results.password){
                
               let encrypt =  CryptoJS.AES.encrypt(JSON.stringify(response.results.Mobile), "!@#$%^&*()").toString(); 
               console.log('encrypt', encrypt);
               console.log(response);
               localStorage.setItem('UserName', response.results.Employee_Name);
               localStorage.setItem('Mobile',response.results.Mobile);
               localStorage.setItem('role',response.results.role);
               sessionStorage.setItem('SessionID', encrypt);
                this.toastr.success(response.message)
                this.router.navigate(['/report']);
              }
              else{
                this.toastr.error('Please Enter Correct Password');
              }

        }, error => {
          this.toastr.error(error);
        });
    } else{
      this.toastr.error('Please Enter Correct Mobile Number and Password');
    }
  }

}
