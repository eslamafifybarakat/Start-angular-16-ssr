// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PublicService } from '../../shared/services/public.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private messageService: MessageService,
    private publicService: PublicService,
    // private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  openToast(type: any, details: any, key?: any): void {
    this.messageService.add({ severity: type, detail: details, icon: type == 'success' ? 'pi-check fs-5 mt-1' : 'pi-info-circle fs-5 mt-1', key: key });
    // summary: this.publicService?.translateTextFromJson(type),
    // sticky: true,
  }
  openSweetAlert(sweetAlertIcon: any, sweetAlertMsg: any) {
    this.publicService?.toggleBodyScroll(false);
    let alertObj: any = {};
    // Check if the current URL is '/auth/login'
    if (this.router.url === '/auth/login') {
      alertObj = {
        // icon [error , info , success , warning , question]
        // position [top-end , bottom-end , bottom-start , top-start]
        title: '',
        // html: `${sweetAlertMsg}<br><br><p>If you have any questions, please communicate with the Medjol team through <a id="contactUsLink"> <u class="text-main-color">Contact Us </u></a><p>`,
        html: `${sweetAlertMsg}`,
        icon: sweetAlertIcon,
        // confirmButtonText: this.translateService.instant('ok'),
        // timer: 1500,
        // showCloseButton: true,

      }
    } else {
      alertObj = alertObj = {
        // icon [error , info , success , warning , question]
        // position [top-end , bottom-end , bottom-start , top-start]
        title: '',
        text: sweetAlertMsg,
        icon: sweetAlertIcon,
        // confirmButtonText: this.translateService.instant('ok'),
        // timer: 1500,
        // showCloseButton: true,

      }
    }

    Swal.fire(alertObj).then((result) => {
      if (result) {
        this.publicService?.toggleBodyScroll(true);
      }
    });
    // After showing the alert, attach a click event to the link
    document.getElementById('contactUsLink')?.addEventListener('click', () => {
      this.router.navigate(['/general/contact-us']);
      // Close the SweetAlert popup after navigation
      Swal.close();
    });
  }
  // openSnackBar(message: string, duration?: number, horizontal?: MatSnackBarHorizontalPosition, vertical?: MatSnackBarVerticalPosition) {
  //   //  vertical=['top','bottom']
  //   //  horizontal=['start','center','end','left','right']
  //   this._snackBar.open(message, 'X', {
  //     duration: duration ? duration : 2000,
  //     horizontalPosition: horizontal ? horizontal : 'center',
  //     verticalPosition: vertical ? vertical : 'bottom',
  //   });
  // }

}
