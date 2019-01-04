import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { user } from '../../_models';
import { rol } from '../../_models';
import { UserService } from '../../_services';
import { RolService } from '../../_services';


@Component({templateUrl: 'roleRegister.component.html'})
export class RoleRegisterComponent implements OnInit {
    currentUser: user;
    users: user[] = [];
    rols: rol[] = [];

    constructor(private userService: UserService, private rolService: RolService) {        
        this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))).user;
    }

    ngOnInit() {
        this.loadAllRol();
    }
    
    private loadAllRol(){
        this.rolService.getAll().pipe(first()).subscribe(rols => { 
            this.rols = rols; 
            //console.log(this.rols)
        });
    }
}
