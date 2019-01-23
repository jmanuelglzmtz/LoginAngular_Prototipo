import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModuleRegisterComponent } from '../moduleRegister'
import { AlertStaticService, ModuleService } from '../../../_services';

import { first } from 'rxjs/operators';
import { AlertToastrComponent  } from "../../../_directives/AlertToastr";

@Component({
  selector: 'ngbd-modalDelete-module',
  templateUrl: 'modalDeleteModule.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})

export class ModalDeleteModuleComponent  {
  @Input() id: string;
  closeResult: string;  
  loading = false;
  

  constructor(
      config: NgbModalConfig, 
      private modalService: NgbModal,
      private moduleService: ModuleService,
      private alertStaticService: AlertStaticService,
      private router: Router,
      private moduleRegisterComponent:ModuleRegisterComponent
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
    
    this.loading = true;    

        this.moduleService.delete(this.id)
            .pipe(first())
            .subscribe(
                () => {
                    
                    this.alertToastrComponent.showSuccess('Eliminación Correcta','Mensaje',true);
                                        
                    this.moduleRegisterComponent.ngOnInit();
                    
                    this.router.navigate(['/moduleRegister']);                            
                },
                error => {
                    this.alertStaticService.error(error);
                    
                    this.loading = false;
                });
                
  }
}
