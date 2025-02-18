import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportserviceService } from 'src/app/reportservice.service';
import * as CryptoJS from 'crypto-js';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../utils/must-match.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  data: any;
  constructor(private formBuilder: FormBuilder,private reportService: ReportserviceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  private sha512Hash(data:any) {
    try {
      return CryptoJS.SHA512(data).toString();
    } catch (error) {
      console.log(error);
    }
  }
  onSubmit() {
      this.submitted = true;
      this.data = this.registerForm.value
      this.data.password = this.sha512Hash(this.data.password);
      console.log(this.data.password,'password');
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        console.log(this.registerForm);
        this.toastr.error('Please entered correct data');
          return;
      }else{
        console.log(this.data,'success');
        this.reportService.createUser(this.data).subscribe((response) =>{
          if (response.status) {
            this.toastr.success(response.message); 
          }else{

            this.toastr.error(response.message);
          }
            
           })
      }

      // display form values on success
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  
  // Submit(data1: any){
  //   // console.log(data1,98756);
    

  //   this.submitted = true;
  //   this.data = data1;
  //   this.data.password = this.sha512Hash(this.data.password);
    
  //   if (data1.name != null && data1.name != "" && data1.name != undefined) {
  //     console.log(this.data);
  //     this.toastr.success('Created Successfully');
  //   //  this.reportService.createUser(this.data).subscribe((response) =>{
  //   //   this.toastr.success(response.message); 
  //   //   this.CreateForm.reset();
  //   //  })
  //   }else{
  //     this.toastr.error('Please entered correct data');
  //   }
    
  // }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}
