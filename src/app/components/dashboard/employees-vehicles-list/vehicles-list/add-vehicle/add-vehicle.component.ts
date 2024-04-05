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
import { VehiclesService } from '../../../services/vehicles.service';
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
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {
  private subscriptions: Subscription[] = [];
  formPhotoFile: any;

  constructor(
    private vehiclesService: VehiclesService,
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
      operatingCard: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      endDate: [null, {
        validators: [
          Validators.required]
      }],
      insuranceExpiryDate: [null, {
        validators: [
          Validators.required]
      }],
      formPhotoFile: [null, {
        validators: [
          Validators.required]
      }],
    }
  );
  get formControls(): any {
    return this.modalForm?.controls;
  }

  uploadFormPhoto(event: any): void {
    this.formPhotoFile = event.file;
    this.formControls.formPhotoFile.setValue(this.formPhotoFile);
  }

  submit(): void {
    if (this.modalForm?.valid) {
      const formData = this.extractFormData();
      this.addVehicle(formData);
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  private extractFormData(): any {
    const formData = new FormData();

    formData.append('operatingCard', this.modalForm?.value?.operatingCard);
    formData.append('endDate', this.modalForm?.value?.endDate);
    formData.append('insuranceExpiryDate', this.modalForm?.value?.insuranceExpiryDate);
    formData.append('formPhotoFile', this.formPhotoFile);
    return formData;
  }
  private addVehicle(formData: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeAddVehicle = this.vehiclesService?.addVehicle(formData)?.subscribe(
      (res: any) => {
        this.handleAddVehicleSuccess(res);
      },
      (err: any) => {
        this.handleAddVehicleError(err);
      }
    );
    this.subscriptions.push(subscribeAddVehicle);
  }
  private handleAddVehicleSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response?.isSuccess && response?.statusCode === 200) {
      this.ref.close({ listChanged: true, item: response?.data });
      response?.message ? this.alertsService?.openToast('success', 'success', response?.message) : '';
    } else {
      response?.message ? this.alertsService?.openToast('error', 'error', response?.message || this.publicService.translateTextFromJson('general.errorOccur')) : '';
    }
  }
  private handleAddVehicleError(error: any): void {
    this.publicService?.showGlobalLoader?.next(false);
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

