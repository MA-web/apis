import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileDashboardComponent } from './profile-dashboard.component';

const route: Route[] = [
  { path: '', component: ProfileDashboardComponent },
]

@NgModule({
 declarations: [
  ProfileDashboardComponent
 ],
 imports: [
   CommonModule,
   RouterModule.forChild(route),
 ]
})
export class ProfileDashboardModule { }
