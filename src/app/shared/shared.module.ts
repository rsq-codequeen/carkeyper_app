import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonComponent } from './button/button.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminButtonComponent } from './admin-button/admin-button.component';
import { DriverButtonComponent } from './driver-button/driver-button.component';
import { MechanicButtonComponent } from './mechanic-button/mechanic-button.component';
import { MultidropdownComponent } from './multidropdown/multidropdown.component';
import { UserformDropdownComponent } from './userdata-dropdown/userform-dropdown.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'; 
import { VehicleformComponent } from './vehicleform/vehicleform.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarComponent,
    ButtonComponent,
    SearchbarComponent,
    NavbarComponent,
    AdminButtonComponent,
    DriverButtonComponent,
    MechanicButtonComponent,
    MultidropdownComponent,
    UserformDropdownComponent,
    FormsModule,
    QuillModule,
    CancelButtonComponent,
    VehicleformComponent
  ],
  exports:[
    SidebarComponent,
    ButtonComponent,
    SearchbarComponent,
    NavbarComponent,
    AdminButtonComponent,
    DriverButtonComponent,
    MechanicButtonComponent,
    MultidropdownComponent,
    UserformDropdownComponent,
    FormsModule,
    QuillModule,
    CancelButtonComponent,
    VehicleformComponent
  ]
})
export class SharedModule { }
