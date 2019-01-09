import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleRegisterComponent } from '../roleRegister'
import { AlertStaticService, RolService } from '../../../_services';
//import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { AlertToastrComponent  } from "../../../_directives/AlertToastr";

@Component({
    selector: 'ngbd-modalRegister-role',
    templateUrl: 'modalCreateRole.component.html',  
    providers: [NgbModalConfig, NgbModal]
})

export class ModalCreateRoleComponent  implements OnInit {
  closeResult: string;
  nameResult: string;
  statusResult: string;
  loading = false;
  registerForm: FormGroup;  

  constructor(
      config: NgbModalConfig, 
      private modalService: NgbModal,
      private rolService: RolService,
      private alertStaticService: AlertStaticService,
      private formBuilder: FormBuilder,
      private router: Router,
      private roleRegisterComponent:RoleRegisterComponent
      ,public alertToastrComponent: AlertToastrComponent
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    estatus: ['', Validators.required],
    id: ['', Validators.required]      
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
    
    if(this.nameResult==null){
      this.nameResult = "";
    }
    if(this.statusResult==null){
      this.statusResult = "";
    }

    this.registerForm.patchValue({
      name: this.nameResult
    });
    this.registerForm.patchValue({
      id: "00000000-0000-0000-0000-000000000000"
    });
    this.registerForm.patchValue({
      estatus: this.statusResult
    });    
    console.log(this.registerForm.value);
    
    this.loading = true;    
        this.rolService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                () => {
                    //this.alertStaticService.success('Edición Correcta', true); 
                    
                    //this.toastr.successToastr('This is success toast.', 'Success!');
                    
                    this.alertToastrComponent.showSuccess('Creacion Correcta','Mensaje',true);
                                        
                    this.roleRegisterComponent.ngOnInit();
                    this.router.navigate(['/roleRegister']);                            
                },
                error => {
                    this.alertStaticService.error(error);
                    this.loading = false;
                });
                
  }

  onKey(event: any) {
    this.nameResult = event.target.value;    
  }

  FieldsChange(values:any){    
    this.statusResult=values.currentTarget.value;
  }
}
