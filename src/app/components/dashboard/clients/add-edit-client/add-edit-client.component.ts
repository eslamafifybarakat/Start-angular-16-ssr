// Modules
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

//Services
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { MaxDigitsDirective } from '../../directives/max-digits.directive';
import { ClientsService } from './../../services/clients.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component } from '@angular/core';
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

    // Directive
    MaxDigitsDirective
  ],
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent {
  private subscriptions: Subscription[] = [];

  isLoadingCheckId: Boolean = false;
  idNotAvailable: Boolean = false;

  isLoadingCheckEmail: Boolean = false;
  emailNotAvailable: Boolean = false;

  constructor(
    private clientsService: ClientsService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { }

  modalForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      id: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.id)], updateOn: "blur"
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
    }
  );
  get formControls(): any {
    return this.modalForm?.controls;
  }

  // Check If National Identity is valid or not
  checkNationalIdentityAvailable(): void {
    if (!this.formControls.id.valid) {
      return; // Exit early if ID is not valid
    }

    const nationalIdentity = this.modalForm.value.id;
    const data = { nationalIdentity };

    this.isLoadingCheckId = true;

    let checkIdSubscription = this.clientsService?.IsNationalIdentityAvailable(data)?.subscribe(
      (res: any) => {
        this.handleIdResponse(res);
      },
      (err: any) => {
        this.handleIdError(err);
      }
    );
    this.subscriptions.push(checkIdSubscription);
  }
  private handleIdResponse(res: any): void {
    if (res?.success && res?.result != null) {
      this.idNotAvailable = !res.result;
    } else {
      this.idNotAvailable = false;
      if (res?.message) {
        this.alertsService?.openToast('error', 'error', res.message);
      }
    }
    this.isLoadingCheckId = false;
    this.cdr.detectChanges();
  }
  private handleIdError(err: any): void {
    // this.idNotAvailable = false;
    this.idNotAvailable = true;
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService?.openToast('error', 'error', errorMessage);
    this.isLoadingCheckId = false;

  }
  // Check If Email is valid or not
  checkEmailAvailable(): void {
    if (!this.formControls.email.valid) {
      return; // Exit early if email is not valid
    }

    const email = this.modalForm.value.email;
    const data = { email };

    this.isLoadingCheckEmail = true;

    let checkEmailSubscription = this.clientsService?.IsNationalIdentityAvailable(data)?.subscribe(
      (res: any) => {
        this.handleEmailResponse(res);
      },
      (err: any) => {
        this.handleEmailError(err);
      }
    );
    this.subscriptions.push(checkEmailSubscription);
  }
  private handleEmailResponse(res: any): void {
    if (res?.success && res?.result != null) {
      this.emailNotAvailable = !res.result;
    } else {
      this.emailNotAvailable = false;
      if (res?.message) {
        this.alertsService?.openToast('error', 'error', res.message);
      }
    }
    this.isLoadingCheckEmail = false;
    this.cdr.detectChanges();
  }
  private handleEmailError(err: any): void {
    this.emailNotAvailable = false;
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService?.openToast('error', 'error', errorMessage);
    this.isLoadingCheckEmail = false;
  }

  onKeyUpEvent(type: string): void {
    if (type == 'id') {
      this.isLoadingCheckId = false;
    }
    if (type == 'email') {
      this.isLoadingCheckEmail = false;
    }
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
