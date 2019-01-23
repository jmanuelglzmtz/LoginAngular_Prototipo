
import { FileService } from '../../../_services';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { user } from '../../../_models';
import { module } from '../../../_models';

import { UserService } from '../../../_services';
import { ModuleService } from '../../../_services';

import { first } from 'rxjs/operators';

@Component({  
  templateUrl: 'moduleRegister.component.html'
})
export class ModuleRegisterComponent implements OnInit {
  //@ViewChild('fileInput') fileInput:any;
  currentUser: user;
    users: user[] = [];
    modules: module[] = [];

  constructor(private userService: UserService, private moduleService: ModuleService) { 
    this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))).user;
  }

  ngOnInit() {
    this.loadAllModule();
  }
  private loadAllModule(){
    this.moduleService.getAll().pipe(first()).subscribe(modules => { 
        this.modules = modules; 
    },
    error => {
        console.log(error);
    });
}
  /*
  uploadIcon(){        
    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    
    this.fileService.uploadIcon(nativeElement.files)
      .pipe(first())
      .subscribe(
          data => {
            console.log(data);
      },
      error => {    
          console.log(error);
      });      
  }
  */
  
}