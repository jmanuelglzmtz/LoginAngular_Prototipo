import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertStaticComponent } from './_directives/AlertStatic';
import { AlertToastrComponent } from './_directives/AlertToastr';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { AlertStaticService, AuthenticationService, UserService, RolService, PermissionService, ModuleService, FileService } from './_services';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { BasicFormComponent } from './Forms/BasicForm';
import { ElementsFormComponent } from './Forms/ElementsForm';
import { HorizontalFormComponent } from './Forms/HorizontalForm';
import { InLineFormComponent } from './Forms/InLineForm';
import { ModalFormComponent } from './Forms/ModalForm';
import { SideNavbarComponent } from './Forms/SideNavbar';
import { MainNavbarComponent } from './Forms/MainNavbar';
import { FooterBarComponent } from './Forms/FooterBar'

import { RoleRegisterComponent } from "./security/Role/roleRegister";
import { ModalUpdateRoleComponent } from "./security/Role/modalUpdateRole";
import { ModalCreateRoleComponent } from "./security/Role/modalCreateRole";
import { ModalDeleteRoleComponent } from "./security/Role/modalDeleteRole";

import { PermissionRegisterComponent } from "./security/Permission/permissionRegister";
import { ModalUpdatePermissionComponent } from "./security/Permission/modalUpdatePermission";
import { ModalCreatePermissionComponent } from "./security/Permission/modalCreatePermission";
import { ModalDeletePermissionComponent } from "./security/Permission/modalDeletePermission";

import { ModuleRegisterComponent } from "./security/Module/moduleRegister";
import { ModalUpdateModuleComponent } from "./security/Module/modalUpdateModule";
import { ModalCreateModuleComponent } from "./security/Module/modalCreateModule";
import { ModalDeleteModuleComponent } from "./security/Module/modalDeleteModule";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        routing,
        FormsModule,
        BrowserAnimationsModule, 
        ToastrModule.forRoot() 
    ],
    declarations: [
        AppComponent,
        AlertStaticComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        BasicFormComponent,
        ElementsFormComponent,
        HorizontalFormComponent,
        InLineFormComponent,
        ModalFormComponent,
        SideNavbarComponent,
        MainNavbarComponent,
        FooterBarComponent,
        RoleRegisterComponent,
        ModalUpdateRoleComponent,
        ModalCreateRoleComponent,
        ModalDeleteRoleComponent,
        
        PermissionRegisterComponent,
        ModalUpdatePermissionComponent,
        ModalCreatePermissionComponent,
        ModalDeletePermissionComponent,

        ModuleRegisterComponent,
        ModalUpdateModuleComponent,
        ModalCreateModuleComponent,
        ModalDeleteModuleComponent,

        AlertToastrComponent
    ],
    providers: [
        AuthGuard,
        AlertToastrComponent,
        AlertStaticService,
        AuthenticationService,
        UserService,
        RolService,
        PermissionService,
        ModuleService,
        FileService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }