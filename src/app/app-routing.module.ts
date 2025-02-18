import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReportSubmitComponent } from './pages/report-submit/report-submit.component';
import { ViewPagesComponent } from './pages/view-pages/view-pages.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AdminViewPageComponent } from './pages/admin-view-page/admin-view-page.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/hindipatrachar', pathMatch: 'full' },
  { path: 'hindipatrachar', component: LoginComponent },
  { path: 'report', component: ReportSubmitComponent },
  { path: 'viewReport', component: ViewPagesComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'adminViewReport', component: AdminViewPageComponent },
  { path: 'register', component:RegistrationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


