import { Component } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'alertToastr',
    templateUrl: 'alertToastr.component.html'
})

export class AlertToastrComponent  {
        
    constructor(public toastr: ToastrManager) { }
    
    showSuccess(message : string, title : string, close: boolean) {
        this.toastr.successToastr(message, title,{showCloseButton: close});
    }
 
    showError() {
        this.toastr.errorToastr('This is error toast.', 'Oops!');
    }
 
    showWarning() {
        this.toastr.warningToastr('This is warning toast.', 'Alert!');
    }
 
    showInfo() {
        this.toastr.infoToastr('This is info toast.', 'Info');
    }
 
    showCustom() {
        this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
    }
 
    showToast(position: any = 'top-left') {
        this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
    }
}