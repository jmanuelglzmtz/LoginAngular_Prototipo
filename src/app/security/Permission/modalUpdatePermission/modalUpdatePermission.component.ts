import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionRegisterComponent } from '../permissionRegister'
import { AlertStaticService, PermissionService } from '../../../_services';

import { first } from 'rxjs/operators';
import { AlertToastrComponent  } from "../../../_directives/AlertToastr";

@Component({
  selector: 'ngbd-modal-permission',
  templateUrl: 'modalUpdatePermission.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})

export class ModalUpdatePermissionComponent  implements OnInit {
  @Input() id: string;
  @Input() status: string;
  @Input() name: string;
  closeResult: string;
  typeResult: string;
  statusResult: string;
  loading = false;
  registerForm: FormGroup;  

  constructor(
      config: NgbModalConfig, 
      private modalService: NgbModal,
      private permissionService: PermissionService,
      private alertStaticService: AlertStaticService,
      private formBuilder: FormBuilder,
      private router: Router,
      private permissionRegisterComponent:PermissionRegisterComponent
      ,public alertToastrComponent: AlertToastrComponent
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    type: ['', Validators.required],
    status: ['', Validators.required],
    id: ['', Validators.required]      
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.setUpdate();
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

  private setUpdate(){
    //aqui se actualiza
    
    if(this.typeResult==null){
      this.typeResult = this.name;
    }
    if(this.statusResult==null){
      this.statusResult = this.status;
    }

    this.registerForm.patchValue({
      type: this.typeResult
    });
    this.registerForm.patchValue({
      id: this.id
    });
    this.registerForm.patchValue({
      status: this.statusResult
    });    
    console.log(this.registerForm.value);
    
    this.loading = true;    

        this.permissionService.update(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {                    
                    this.alertToastrComponent.showSuccess('Actualizacion Correcta','Mensaje',true);
                                        
                    this.permissionRegisterComponent.ngOnInit();

                    this.router.navigate(['/permissionRegister']);                            
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
