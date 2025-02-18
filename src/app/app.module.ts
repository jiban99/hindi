import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportSubmitComponent } from './pages/report-submit/report-submit.component';
import { ViewPagesComponent } from './pages/view-pages/view-pages.component';
import { ReportserviceService } from './reportservice.service';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AdminViewPageComponent } from './pages/admin-view-page/admin-view-page.component';
import  'fa-icons';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportSubmitComponent,
    ViewPagesComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    AdminViewPageComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [ReportserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
