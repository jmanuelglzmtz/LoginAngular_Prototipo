import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { user } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: user;
    users: user[] = [];

    constructor(private userService: UserService) {        
        this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))).user;
    }

    ngOnInit() {
        this.nameUser();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    private nameUser(){
        console.log("=========");
        console.log(this.currentUser);        
        console.log("=========");
    }
}