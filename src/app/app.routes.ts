import { Routes } from '@angular/router';
export const routes: Routes = [
    {
         path: 'registration',
         loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
    },
    {
     path: 'user',
     loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
     },
    {
         path: 'vehicle',
         loadChildren: () => import('./vehicle-management/vehicle-management.module').then(m => m.VehicleManagementModule)
    },
     {
         path: 'checklist',
         loadChildren: () => import('./checklist/checklist.module').then(m => m.ChecklistModule)
    },
    {
         path: '',
         loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
    },
    {
          path:"**",
          loadChildren:()=>import('./exception-handling/exception-handling.module').then(m=>m.ExceptionHandlingModule)
    }
];