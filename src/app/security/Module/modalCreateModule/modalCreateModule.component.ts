import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleRegisterComponent } from '../moduleRegister'
import { AlertStaticService, ModuleService } from '../../../_services';

import { first } from 'rxjs/operators';
import { AlertToastrComponent  } from "../../../_directives/AlertToastr";

@Component({
    selector: 'ngbd-modalRegister-module',
    templateUrl: 'modalCreateModule.component.html',  
    providers: [NgbModalConfig, NgbModal]
})

export class ModalCreateModuleComponent  implements OnInit {
  closeResult: string;
  typeResult: string;
  statusResult: string;
  loading = false;
  registerForm: FormGroup;  

  constructor(
      config: NgbModalConfig, 
      private modalService: NgbModal,
      private moduleService: ModuleService,
      private alertStaticService: AlertStaticService,
      private formBuilder: FormBuilder,
      private router: Router,
      private moduleRegisterComponent:ModuleRegisterComponent
      ,public alertToastrComponent: AlertToastrComponent
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    id: ['', Validators.required],      
    icon: ['', Validators.required],
    component: ['', Validators.required]            
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.setRegister();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //console.log(this.closeResult);
    });
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private setRegister(){
    //aqui se actualiza
    
    if(this.typeResult==null){
      this.typeResult = "";
    }
    if(this.statusResult==null){
      this.statusResult = "";
    }

    this.registerForm.patchValue({
      type: this.typeResult
    });
    this.registerForm.patchValue({
      id: "00000000-0000-0000-0000-000000000000"
    });
    this.registerForm.patchValue({
      status: this.statusResult
    });    
    console.log(this.registerForm.value);
    
    this.loading = true; 
 
        this.moduleService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                () => {
                    
                    this.alertToastrComponent.showSuccess('Creacion Correcta','Mensaje',true);
                                        
                    this.moduleRegisterComponent.ngOnInit();

                    this.router.navigate(['/moduleRegister']);                            
                },
                error => {
                    this.alertStaticService.error(error);
                    this.loading = false;
                });

  }

  onKey(event: any) {
    this.typeResult = event.target.value;    
  }

  FieldsChange(values:any){    
    this.statusResult=values.currentTarget.value;
  }
}
