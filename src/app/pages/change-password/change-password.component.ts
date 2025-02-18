import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportserviceService } from '../../reportservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  message:any=' ';

  constructor(private router: Router, private check: ReportserviceService, private toastr: ToastrService, private fb: FormBuilder  ) { }

  ngOnInit(): void {
    
    if(!sessionStorage.getItem('SessionID')){
      this.router.navigate(['']);
    }
  }

  CPasswordForm = this.fb.group({
    Mobile :['', Validators.required],
    oldPassword:['', Validators.required],
    newPassword:['', Validators.required],
    cPassword:['', Validators.required],
  })

  private sha512Hash(data:any) {
    try {
      return CryptoJS.SHA512(data).toString();
    } catch (error) {
      console.log(error);
    }
  }

  Submit()
  {
    let data = this.CPasswordForm.value;
    console.log(data);
    
    if(data.newPassword != data.cPassword){
        this.message = "New Password and Confirm Password Doesn't Match";
    }
    else{
      this.message = " ";
    // let userID = CryptoJS.AES.decrypt(sessionID, '!@#$%^&*()').toString(CryptoJS.enc.Utf8);
    //  console.log('decrypt', userID);
     this.check.getUserData(data.Mobile).subscribe((response) =>{
        console.log(response);
        data.oldPassword = this.sha512Hash(data.oldPassword);
        if(response.password === data.oldPassword)
        {
          data.newPassword = this.sha512Hash(data.newPassword);
          let pswd ={ password : data.newPassword};
          console.log(pswd);
          this.check.changePassword(data.Mobile , pswd ).subscribe((result) =>{
            this.toastr.success(result.message);
          }, error => {
            this.toastr.error(error);
          });
        }
        else{
          this.toastr.error('incorrect old password or Mobile Number');
        }
     }, error => {
      this.toastr.error(error);
    });
    }

  }

}
