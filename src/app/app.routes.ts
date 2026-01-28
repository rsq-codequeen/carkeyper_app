import { Routes } from '@angular/router';
export const routes: Routes = [
    {
         path: 'registration',
         loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
    },
    {
     path:'home',
     loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)
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
         path: 'intake',
         loadChildren: () => import('./intake/intake.module').then(m => m.IntakeModule)
    },
    {
         path: 'terminal',
         loadChildren: () => import('./terminal/terminal.module').then(m => m.TerminalModule)
    },
    {
         path: 'radar',
         loadChildren: () => import('./radar/radar.module').then(m => m.RadarModule)
    },
    {
         path: 'analytics',
         loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
    },
    {
         path: '',
         loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
    },
    {
         path: '',
         loadChildren: () => import('./vehicle-inspection/vehicle-inspection.module').then(m => m.VehicleInspectionModule)
    },
    {
          path:"**",
          loadChildren:()=>import('./exception-handling/exception-handling.module').then(m=>m.ExceptionHandlingModule)
    }
];