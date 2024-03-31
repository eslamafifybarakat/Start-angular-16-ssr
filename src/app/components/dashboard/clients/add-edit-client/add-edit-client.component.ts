import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientsService } from './../../services/clients.service';
import { patterns } from './../../../../shared/configs/patterns';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, CommonModule, CalendarModule, DropdownModule, MultiSelectModule],
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent {
  private subscriptions: Subscription[] = [];

  modalData: any;
  isEdit: boolean = false;
  customerId: any;
  countries: any = [
    { name: 'country1' },
    { name: 'country2' },
    { name: 'country3' },
    { name: 'country4' },
    { name: 'country1' },
  ];
  isLoadingCountries: boolean = false;
  districtsList: any = [
    { name: "district1" },
    { name: "district2" },
    { name: "district3" },
    { name: "district4" },
    { name: "district5" },
  ];
  isLoadingDistricts: boolean = false;
  constructor(
    private clientsService: ClientsService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    protected router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    if (this.modalData?.item?.id) {
      this.customerId = this.modalData?.item?.id;
    }
    this.isEdit = this.modalData?.type == 'edit' ? true : false;
    if (this.isEdit) {
      this.patchValue();
    }
  }

  modalForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      id: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      phoneNumber: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.phone)], updateOn: "blur"
      }],
      email: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.email)], updateOn: "blur"
      }],
      birthDate: [null, {
        validators: [
          Validators.required]
      }],
      country: [null, {
        validators: [
          Validators.required]
      }],
    }
  );

  get formControls(): any {
    return this.modalForm?.controls;
  }
  patchValue(): void {
    this.modalForm?.patchValue({
      fullName: this.modalData?.item?.name,
      phoneNumber: this.modalData?.item?.phoneNumber,
    })
  }

  submit(): void {
    if (this.modalForm?.valid) {
      const formData = this.extractFormData();
      this.addClient(formData);
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  private extractFormData(): any {
    return {
      fullName: this.modalForm?.value?.fullName,
      phoneNumber: this.modalForm?.value?.phoneNumber,
      email: this.modalForm?.value?.email,
      id: this.modalForm?.value?.id,
      birthDate: this.modalForm?.value?.birthDate
    };
  }
  private addClient(formData: any): void {
    this.publicService?.show_loader?.next(true);
    let subscribeAddClient = this.clientsService?.addClient(formData)?.subscribe(
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
      response?.message ? this.alertsService?.openToast('error', 'error', response?.message) : '';
    }
  }
  private handleAddClientError(error: any): void {
    this.publicService?.show_loader?.next(false);
    error?.message ? this.alertsService?.openToast('error', 'error', error?.message) : '';
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
