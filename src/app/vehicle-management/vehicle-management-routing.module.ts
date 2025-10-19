import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicledataComponent } from './vehicledata/vehicledata.component';

const routes: Routes = [
  { path: 'vehicledata', component:VehicledataComponent },
    {path:'',component:VehicledataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleManagementRoutingModule { }
