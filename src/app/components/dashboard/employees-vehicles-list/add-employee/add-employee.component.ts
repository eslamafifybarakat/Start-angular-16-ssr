// Modules
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

// Components
import { FileUploadComponent } from './../../../../shared/components/upload-files/file-upload/file-upload.component';

//Services
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    TranslateModule,
    CalendarModule,
    CommonModule,
    FormsModule,

    // Components
    FileUploadComponent
  ],
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  private subscriptions: Subscription[] = [];

  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  cancel(): void {
    this.ref?.close({ listChanged: false });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
