import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { user } from '../../_models';
import { UserService } from '../../_services';

@Component({
    selector: 'SideNavbar',
    templateUrl: 'SideNavbar.component.html'
})
export class SideNavbarComponent implements OnInit {
    currentUser: user;
    users: user[] = [];

    constructor(private userService: UserService) {
        this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))).user;
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

}