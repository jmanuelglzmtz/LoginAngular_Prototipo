import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleRegisterComponent } from '../roleRegister'
import { AlertStaticService, RolService } from '../../../_services';
//import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { AlertToastrComponent  } from "../../../_directives/AlertToastr";

@Component({
  selector: 'ngbd-modal-role',
  templateUrl: 'modalUpdateRole.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})

export class ModalUpdateRoleComponent  implements OnInit {
  @Input() id: string;
  @Input() status: string;
  @Input() name: string;
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
    
    if(this.nameResult==null){
      this.nameResult = this.name;
    }
    if(this.statusResult==null){
      this.statusResult = this.status;
    }

    this.registerForm.patchValue({
      name: this.nameResult
    });
    this.registerForm.patchValue({
      id: this.id
    });
    this.registerForm.patchValue({
      status: this.statusResult
    });    
    console.log(this.registerForm.value);
    
    this.loading = true;    
        this.rolService.update(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.alertStaticService.success('Edición Correcta', true); 
                    
                    //this.toastr.successToastr('This is success toast.', 'Success!');
                    
                    this.alertToastrComponent.showSuccess('Actualizacion Correcta','Mensaje',true);
                                        
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

//  showToast(position: any = 'top-left') {
  /*
  showToast(position: any = 'top-full-width') {
    this.toastr.successToastr('This is a toast.', 'Toast', {
        position: position,
        showCloseButton: true
    });
}*/
}
