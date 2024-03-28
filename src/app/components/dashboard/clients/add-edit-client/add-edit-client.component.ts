import { FileUploadComponent } from './../../../../shared/components/file-upload/file-upload.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, CommonModule, CalendarModule, DropdownModule, MultiSelectModule, FileUploadComponent],
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent {
  private unsubscribe: Subscription[] = [];

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
    // private customersService: CustomersService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
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
    console.log(this.modalData);
    this.modalForm?.patchValue({
      fullName: this.modalData?.item?.name,
      phoneNumber: this.modalData?.item?.phoneNumber,
    })
  }

  submit(): void {
    const myObject: { [key: string]: any } = {};
    if (this.modalForm?.valid) {
      myObject['name'] = this.modalForm?.value?.fullName;
      myObject['mobileNumber'] = this.modalForm?.value?.fullName;

      if (this.isEdit) {
        myObject['id'] = this.customerId;
        // myObject['lastModifiedBy'] = 0;
      } else {
        // myObject['createBy'] = 0;
      }
      this.publicService?.show_loader?.next(true);
      // this.customersService?.addOrUpdateCustomer(myObject, this.customerId ? this.customerId : null)?.subscribe(
      //   (res: any) => {
      //     if (res?.isSuccess == true && res?.statusCode == 200) {
      //       this.ref.close({ listChanged: true, item: res?.data });
      //       this.publicService?.show_loader?.next(false);
      //       res?.message ? this.alertsService?.openSweetAlert('success', res?.message) : '';
      //     } else {
      //       res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
      //       this.publicService?.show_loader?.next(false);
      //     }
      //   },
      //   (err: any) => {
      //     err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      //     this.publicService?.show_loader?.next(false);
      //   });
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }

  cancel(): void {
    this.ref?.close({ listChanged: false });
  }
  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
