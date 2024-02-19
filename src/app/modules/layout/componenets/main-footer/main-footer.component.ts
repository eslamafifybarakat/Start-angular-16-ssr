import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TermsAndConditionsViewerComponent } from 'src/app/modules/general/components/terms-and-conditions-viewer/terms-and-conditions-viewer.component';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent {

  constructor(private dialogService: DialogService) { }

  openPdfViewer(): void {
    const termsRef = this.dialogService?.open(TermsAndConditionsViewerComponent, {
      data: { enableButtons: false },
      width: '90%',
      height: '100%',
      dismissableMask: false,
      styleClass: 'pdf-viewer'
    });
  }
}
