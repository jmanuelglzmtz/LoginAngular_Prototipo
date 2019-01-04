﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { RoleRegisterComponent } from './security/roleRegister'
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'roleRegister', component: RoleRegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }    
];

export const routing = RouterModule.forRoot(appRoutes);