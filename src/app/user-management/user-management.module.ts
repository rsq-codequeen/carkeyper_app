import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { UserManagementRoutingModule } from './user-management-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SidebarComponent,
  ]
})
export class UserManagementModule { }
