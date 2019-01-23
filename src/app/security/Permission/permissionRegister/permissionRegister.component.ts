import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { user } from '../../../_models';
import { permission } from '../../../_models';
import { UserService } from '../../../_services';
import { PermissionService } from '../../../_services';


@Component({templateUrl: 'permissionRegister.component.html'})
export class PermissionRegisterComponent implements OnInit {
    currentUser: user;
    users: user[] = [];
    permissions: permission[] = [];

    constructor(private userService: UserService, private permissionService: PermissionService) {        
        this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))).user;
        console.log("--");
    }

    ngOnInit() {
        this.loadAllPermission();
    }
    
    private loadAllPermission(){
        
        this.permissionService.getAll().pipe(first()).subscribe(permissions => { 
            this.permissions = permissions; 
            console.log(this.permissions);
        },
        error => {
            console.log(error);
        });
    }
}
