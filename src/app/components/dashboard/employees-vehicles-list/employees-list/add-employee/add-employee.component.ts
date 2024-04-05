// Modules
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

// Components
import { FileUploadComponent } from '../../../../../shared/components/upload-files/file-upload/file-upload.component';

//Services
import { PublicService } from '../../../../../services/generic/public.service';
import { AlertsService } from '../../../../../services/generic/alerts.service';
import { EmployeesService } from '../../../services/employees.service';
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

  residencePhotoFile: any;

  constructor(
    private employeesService: EmployeesService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  modalForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      residencyNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      endDate: [null, {
        validators: [
          Validators.required]
      }],
      healthCertificate: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      residencePhoto: [null, {
        validators: [
          Validators.required]
      }],
    }
  );
  get formControls(): any {
    return this.modalForm?.controls;
  }

  uploadResidencePhoto(event: any): void {
    this.residencePhotoFile = event.file;
    this.formControls.residencePhoto.setValue(this.residencePhotoFile);
  }

  submit(): void {
    if (this.modalForm?.valid) {
      const formData = this.extractFormData();
      this.addEmployee(formData);
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  private extractFormData(): any {
    const formData = new FormData();

    formData.append('fullName', this.modalForm?.value?.fullName);
    formData.append('residencyNumber', this.modalForm?.value?.residencyNumber);
    formData.append('endDate', this.modalForm?.value?.endDate);
    formData.append('healthCertificate', this.modalForm?.value?.healthCertificate);
    formData.append('residencePhoto', this.residencePhotoFile);
    return formData;
  }
  private addEmployee(formData: any): void {
    this.publicService?.show_loader?.next(true);
    let subscribeAddEmployee = this.employeesService?.addEmployee(formData)?.subscribe(
      (res: any) => {
        this.handleAddEmployeeSuccess(res);
      },
      (err: any) => {
        this.handleAddEmployeeError(err);
      }
    );
    this.subscriptions.push(subscribeAddEmployee);
  }
  private handleAddEmployeeSuccess(response: any): void {
    this.publicService?.show_loader?.next(false);
    if (response?.isSuccess && response?.statusCode === 200) {
      this.ref.close({ listChanged: true, item: response?.data });
      response?.message ? this.alertsService?.openToast('success', 'success', response?.message) : '';
    } else {
      response?.message ? this.alertsService?.openToast('error', 'error', response?.message || this.publicService.translateTextFromJson('general.errorOccur')) : '';
    }
  }
  private handleAddEmployeeError(error: any): void {
    this.publicService?.show_loader?.next(false);
    error?.message ? this.alertsService?.openToast('error', 'error', error?.message || this.publicService.translateTextFromJson('general.errorOccur')) : '';
  }

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

