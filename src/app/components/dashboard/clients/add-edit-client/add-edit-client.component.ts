// Modules
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

//Services
import { LocalizationLanguageService } from 'src/app/services/generic/localization-language.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetaDetails, MetadataService } from 'src/app/services/generic/metadata.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { MaxDigitsDirective } from '../../directives/max-digits.directive';
import { ClientsService } from './../../services/clients.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap, catchError } from 'rxjs/operators';
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

  // Check National Identity Variables
  isLoadingCheckNationalIdentity: Boolean = false;
  nationalIdentityNotAvailable: Boolean = false;

  // Check Email Variables
  isLoadingCheckEmail: Boolean = false;
  emailNotAvailable: Boolean = false;

  // Check Phone Variables
  isLoadingCheckPhone: Boolean = false;
  phoneNotAvailable: Boolean = false;

  // BirthDate
  readonly minAge = 18;
  maxDate: any = new Date(new Date()?.getFullYear() - this.minAge, new Date()?.getMonth(), new Date()?.getDate());

  addClientForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      nationalIdentity: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.nationalIdentity)], updateOn: "blur"
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
    return this.addClientForm?.controls;
  }

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    private clientsService: ClientsService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.updateMetaTagsForSEO();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'العملاء',
      description: 'العملاء',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }

  onKeyUpEvent(type: string): void {
    if (type == 'nationalIdentity') {
      this.isLoadingCheckNationalIdentity = false;
    }
    if (type == 'email') {
      this.isLoadingCheckEmail = false;
    }
    if (type == 'phoneNumber') {
      this.isLoadingCheckPhone = false;
    }
    this.publicService?.clearValidationErrors(this.formControls[type]);
    this.cdr.detectChanges();
  }
  // Start Check If National Identity Unique
  checkNationalIdentityAvailable(): void {
    if (!this.formControls?.nationalIdentity?.valid) {
      return; // Exit early if ID is not valid
    }
    const identity: number | string = this.addClientForm?.value?.nationalIdentity;
    const data: any = { identity };
    this.isLoadingCheckNationalIdentity = true;
    let checkIdSubscription: Subscription = this.publicService?.IsNationalIdentityAvailable(data).pipe(
      tap(res => this.handleNationalIdentityResponse(res)),
      catchError(err => this.handleNationalIdentityError(err))
    ).subscribe();
    this.subscriptions.push(checkIdSubscription);
  }
  private handleNationalIdentityResponse(res: any): void {
    if (res?.success && res?.result != null || true) {
      this.nationalIdentityNotAvailable = !res.result;
    } else {
      this.nationalIdentityNotAvailable = false;
      this.handleNationalIdentityError(res?.message);
    }
    this.isLoadingCheckNationalIdentity = false;
    this.cdr.detectChanges();
  }
  private handleNationalIdentityError(err: any): any {
    this.nationalIdentityNotAvailable = true;
    this.isLoadingCheckNationalIdentity = false;
    this.handleError(err);
  }
  // End Check If National Identity Unique

  //  Start Check If Email Unique
  checkEmailAvailable(): void {
    if (!this.formControls?.email?.valid) {
      return; // Exit early if email is not valid
    }
    const email: string = this.addClientForm?.value?.email;
    const data: any = { email };
    this.isLoadingCheckEmail = true;

    let checkEmailSubscription: Subscription = this.publicService?.IsEmailAvailable(data).pipe(
      tap(res => this.handleEmailResponse(res)),
      catchError(err => this.handleEmailError(err))
    ).subscribe();
    this.subscriptions.push(checkEmailSubscription);
  }
  private handleEmailResponse(res: any): void {
    if (res?.success && res?.result != null || true) {
      this.emailNotAvailable = !res.result;
    } else {
      this.emailNotAvailable = false;
      this.handleEmailError(res?.message);
    }
    this.isLoadingCheckEmail = false;
    this.cdr.detectChanges();
  }
  private handleEmailError(err: any): any {
    this.emailNotAvailable = true;
    this.isLoadingCheckEmail = false;
    this.handleError(err);
  }
  //  End Check If Email Unique

  //  Start Check If Phone Unique
  checkPhoneAvailable(): void {
    if (!this.formControls?.phoneNumber?.valid) {
      return; // Exit early if phoneNumber is not valid
    }
    const phone: number | string = this.addClientForm?.value?.phoneNumber;
    const data: any = {
      phoneNumber: {
        countryCode: "+971",
        number: phone
      }
    };
    this.isLoadingCheckPhone = true;

    let checkPhoneSubscription: Subscription = this.publicService?.IsPhoneAvailable(data).pipe(
      tap(res => this.handlePhoneResponse(res)),
      catchError(err => this.handlePhoneError(err))
    ).subscribe();
    this.subscriptions.push(checkPhoneSubscription);
  }
  private handlePhoneResponse(res: any): void {
    if (res?.success && res?.result != null || true) {
      this.phoneNotAvailable = !res.result;
    } else {
      this.phoneNotAvailable = false;
      this.handlePhoneError(res?.message);
    }
    this.isLoadingCheckPhone = false;
    this.cdr.detectChanges();
  }
  private handlePhoneError(err: any): any {
    this.phoneNotAvailable = true;
    this.isLoadingCheckPhone = false;
    this.handleError(err);
  }
  // End Check If Phone Unique


  // Start Add New Client
  submit(): void {
    if (this.addClientForm?.valid) {
      const formData: any = this.extractFormData();
      this.addClient(formData);
    } else {
      this.publicService?.validateAllFormFields(this.addClientForm);
    }
  }
  private extractFormData(): any {
    return {
      name: this.addClientForm?.value?.fullName,
      email: this.addClientForm?.value?.email,
      admin_id: 1,
      identity: this.addClientForm?.value?.nationalIdentity?.toString(),
      birthDate: this.addClientForm?.value?.birthDate,
      phoneNumber: {
        countryCode: "+966",
        number: this.addClientForm?.value?.phoneNumber?.toString()
      }
    };
  }
  private addClient(formData: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeAddClient: Subscription = this.clientsService?.addClient(formData).pipe(
      tap(res => this.handleAddClientSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeAddClient);
  }
  private handleAddClientSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response?.success || true) {
      this.ref.close({ listChanged: true, item: response?.data });
      this.handleSuccess(response?.message);
    } else {
      this.handleError(response?.message);
    }
  }
  // End Add New Client

  cancel(): void {
    this.ref?.close({ listChanged: false });
  }
  /* --- Handle api requests messages --- */
  private handleSuccess(msg: any): any {
    this.setMessage(msg || this.publicService.translateTextFromJson('general.successRequest'),'success');
  }
  private handleError(err: any): any {
    this.setMessage(err || this.publicService.translateTextFromJson('general.errorOccur'),'error');
  }
  private setMessage(message: string,type: string): void {
    this.alertsService.openToast(type, type, message);
    this.publicService.showGlobalLoader.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
