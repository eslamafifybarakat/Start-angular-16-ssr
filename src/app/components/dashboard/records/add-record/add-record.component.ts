// Modules
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

//Services
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { RecordsService } from './../../services/records.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    MultiSelectModule,
    TranslateModule,
    CalendarModule,
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent {
  private subscriptions: Subscription[] = [];

  // check record number variable
  isLoadingCheckRecordNum: Boolean = false;
  recordNumNotAvailable: Boolean = false;

  companies: any = [
    { id: 1, name: "company 1" },
    { id: 2, name: "company 2" },
    { id: 3, name: "company 3" },
    { id: 4, name: "company 4" },
    { id: 5, name: "company 5" },
    { id: 6, name: "company 6" }
  ];
  isLoadingCompanies: boolean = false;

  permissions: any = [
    { id: 1, name: "permission 1" },
    { id: 1, name: "permission 1" },
    { id: 1, name: "permission 1" },
    { id: 1, name: "permission 1" },
    { id: 1, name: "permission 1" },
    { id: 1, name: "permission 1" }
  ];
  isLoadingPermissions: boolean = false;

  constructor(
    private recordsService: RecordsService,
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
      recordName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      recordNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      endDate: [null, {
        validators: [
          Validators.required]
      }],
      companies: [null, {
        validators: []
      }],
      permissions: [null, {
        validators: []
      }],
    }
  );
  get formControls(): any {
    return this.modalForm?.controls;
  }

  //=======Start Check If Record Number is valid or not========
  checkRecordNumAvailable(): void {
    if (!this.formControls.recordNumber.valid) {
      return; // Exit early if ID is not valid
    }

    const recordNumber = this.modalForm.value.recordNumber;
    const data = { recordNumber };

    this.isLoadingCheckRecordNum = true;

    let checkRecordNumberSubscription = this.recordsService?.IsRecordNumberAvailable(data)?.subscribe(
      (res: any) => {
        this.handleRecordNumberResponse(res);
      },
      (err: any) => {
        this.handleRecordNumberError(err);
      }
    );
    this.subscriptions.push(checkRecordNumberSubscription);
  }
  private handleRecordNumberResponse(res: any): void {
    if (res?.success && res?.result != null) {
      this.recordNumNotAvailable = !res.result;
    } else {
      this.recordNumNotAvailable = false;
      if (res?.message) {
        this.alertsService?.openToast('error', 'error', res.message);
      }
    }
    this.isLoadingCheckRecordNum = false;
    this.cdr.detectChanges();
  }
  private handleRecordNumberError(err: any): void {
    this.recordNumNotAvailable = false;
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService?.openToast('error', 'error', errorMessage);
    this.isLoadingCheckRecordNum = false;

  }
  onKeyUpEvent(): void {
    this.isLoadingCheckRecordNum = false;
  }
  //=======End Check If Record Number is valid or not========

  submit(): void {
    if (this.modalForm?.valid) {
      const formData = this.extractFormData();
      this.addRecord(formData);
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  private extractFormData(): any {
    return {
      recordName: this.modalForm?.value?.recordName,
      recordNumber: this.modalForm?.value?.recordNumber,
      endDate: this.modalForm?.value?.endDate
    };
  }
  private addRecord(formData: any): void {
    this.publicService?.show_loader?.next(true);
    let subscribeAddClient = this.recordsService?.addRecord(formData)?.subscribe(
      (res: any) => {
        this.handleAddClientSuccess(res);
      },
      (err: any) => {
        this.handleAddClientError(err);
      }
    );
    this.subscriptions.push(subscribeAddClient);
  }
  private handleAddClientSuccess(response: any): void {
    this.publicService?.show_loader?.next(false);
    if (response?.isSuccess && response?.statusCode === 200) {
      this.ref.close({ listChanged: true, item: response?.data });
      response?.message ? this.alertsService?.openToast('success', 'success', response?.message) : '';
    } else {
      response?.message ? this.alertsService?.openToast('error', 'error', response?.message || this.publicService.translateTextFromJson('general.errorOccur')) : '';
    }
  }
  private handleAddClientError(error: any): void {
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

