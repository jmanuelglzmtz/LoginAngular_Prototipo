import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RoleRegisterComponent } from '../roleRegister'
import { AlertStaticService, RolService } from '../../../_services';
//import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { AlertToastrComponent  } from "../../../_directives/AlertToastr";

@Component({
  selector: 'ngbd-modalDelete-role',
  templateUrl: 'modalDeleteRole.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})

export class ModalDeleteRoleComponent  {
  @Input() id: string;
  closeResult: string;  
  loading = false;
  

  constructor(
      config: NgbModalConfig, 
      private modalService: NgbModal,
      private rolService: RolService,
      private alertStaticService: AlertStaticService,
      private router: Router,
      private roleRegisterComponent:RoleRegisterComponent
      ,public alertToastrComponent: AlertToastrComponent
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.setDelete();
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

  private setDelete(){
    //aqui se actualiza    
    console.log(this.id);
    this.loading = true;    
        this.rolService.delete(this.id)
            .pipe(first())
            .subscribe(
                () => {
                    //this.alertStaticService.success('Edición Correcta', true); 
                    
                    //this.toastr.successToastr('This is success toast.', 'Success!');
                    
                    this.alertToastrComponent.showSuccess('Eliminación Correcta','Mensaje',true);
                                        
                    this.roleRegisterComponent.ngOnInit();
                    this.router.navigate(['/roleRegister']);                            
                },
                error => {
                    this.alertStaticService.error(error);
                    this.loading = false;
                });
                
  }
}
