import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertStaticComponent } from './_directives/AlertStatic';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertStaticService, AuthenticationService, UserService, RolService, } from './_services';
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
import { RoleRegisterComponent } from "./security/roleRegister";
import { ModalRoleComponent } from "./security/modalRole";
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        routing,
        FormsModule 
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
        ModalRoleComponent
    ],
    providers: [
        AuthGuard,
        AlertStaticService,
        AuthenticationService,
        UserService,
        RolService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }