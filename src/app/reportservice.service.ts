import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportserviceService {

  constructor(private http:HttpClient) { }

  insertReport(data:any): Observable<any> {
    return this.http.post(`${environment.server_url}/hindi_report/addReport`, data);
  }

  login(data:any): Observable<any> {
    console.log('jdssdjhjf');
    
    return this.http.post(`http://localhost:3000/hindi_report/login`, data);
  }
  createUser(data:any): Observable<any> {
    return this.http.post(`${environment.server_url}/hindi_report/createUser`, data);
  }
  logout(){
    localStorage.removeItem('UserName');
    localStorage.removeItem('Mobile');
    return sessionStorage.removeItem('SessionID');
  }

  viewReport(mobile:any): Observable<any> {
    return this.http.get(`${environment.server_url}/hindi_report/ViewReport/`+mobile);
  }
  adminViewReport(): Observable<any> {
    return this.http.get(`${environment.server_url}/hindi_report/AdminViewReport/`);
  }

  getUserData(mobile:any): Observable<any> {
    return this.http.get(`${environment.server_url}/hindi_report/getUserData/`+mobile);
  }
  getquaterdata(mobile:any, body:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/getquaterdata/`+mobile, body);
  }

  adminGetQuaterData(year:any, body:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/adminGetQuaterData/`+year, body);
  }

  adminGetDataByYM(year:any, body:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/adminGetDataByYM/`+year, body);
  }

  adminGetDataByYear(year:any): Observable<any> {
    return this.http.get(`${environment.server_url}/hindi_report/adminGetDataByYear/`+year);
  }

  getDataByYM(mobile:any, body:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/getDataByYM/`+mobile, body);
  }

  getDataByYear(Mobile:any, body:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/getDataByYear/`+Mobile, body);
  }

  getDataByName(Mobile:any): Observable<any> {
    return this.http.get(`${environment.server_url}/hindi_report/getDataByName/`+Mobile);
  }

  editReport(ReportID:any, updateBody:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/editReport/`+ ReportID, updateBody);
  }

  changePassword(Mobile:number, updateBody:any): Observable<any> {
    return this.http.put(`${environment.server_url}/hindi_report/changePassword/`+ Mobile, updateBody);
  }

  deleteReport(ReportID:any): Observable<any> {
    return this.http.delete(`${environment.server_url}/hindi_report/deleteReport/`+ ReportID);
  }
}
