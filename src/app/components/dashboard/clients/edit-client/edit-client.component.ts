// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

// Components
import { UploadMultiFilesComponent } from '../../../../shared/components/upload-files/upload-multi-files/upload-multi-files.component';
import { SkeletonComponent } from './../../../../shared/skeleton/skeleton/skeleton.component';
import { RecordsComponent } from '../../records/records.component';

//Services
import { LocalizationLanguageService } from './../../../../services/generic/localization-language.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetaDetails, MetadataService } from './../../../../services/generic/metadata.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { MaxDigitsDirective } from '../../directives/max-digits.directive';
import { patterns } from './../../../../shared/configs/patterns';
import { ClientsService } from '../../services/clients.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

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
    UploadMultiFilesComponent,
    SkeletonComponent,
    RecordsComponent,

    // Directive
    MaxDigitsDirective
  ],
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  private subscriptions: Subscription[] = [];

  clientId: number;
  isLoading: boolean = false;
  details: any;

  isFullNameReadOnly: boolean = true;
  isIdReadOnly: boolean = true;
  isPhoneNumberReadOnly: boolean = true;
  isEmailReadOnly: boolean = true;
  isBirthDateReadOnly: boolean = true;

  // filesNames: any = [
  //   { name: 'name1', image: 'assets/images/navbar/sidebar-bg.svg' }
  // ];
  // imgIndex: any = 0;

  // BirthDate
  readonly minAge = 18;
  maxDate: any = new Date(new Date()?.getFullYear() - this.minAge, new Date()?.getMonth(), new Date()?.getDate());

  modalForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      id: ['', {
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
    return this.modalForm?.controls;
  }

  // Check Nationality Id Variables
  isLoadingCheckId: Boolean = false;
  idNotAvailable: Boolean = false;

  // Check Email Variables
  isLoadingCheckEmail: Boolean = false;
  emailNotAvailable: Boolean = false;

  // Check Phone Variables
  isLoadingCheckPhone: Boolean = false;
  phoneNotAvailable: Boolean = false;

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    private clientsService: ClientsService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.getClientById();
    this.updateMetaTagsForSEO();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'تفاصيل العملاء',
      description: 'الوصف',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }
  // Upload Gallery imgs
  // uploadFiles(e: any): void {
  //   this.filesNames = e.files;
  //   console.log(e.files);

  // }
  patchValue(): void {
    this.modalForm?.patchValue({
      fullName: this.details?.fullName,
      id: this.details?.id,
      phoneNumber: this.details?.phoneNumber,
      birthDate: this.details?.birthDate,
      email: this.details?.email,
    })
  }
  editInput(name: string): void {
    if (name == 'fullName') {
      this.isFullNameReadOnly = false;
    }
    if (name == 'id') {
      this.isIdReadOnly = false;
    }
    if (name == 'birthDate') {
      this.isBirthDateReadOnly = false;
    }
    if (name == 'phoneNumber') {
      this.isPhoneNumberReadOnly = false;
    }
    if (name == 'email') {
      this.isEmailReadOnly = false;
    }
  }

  // Start Get Client By Id
  getClientById(): void {
    this.isLoading = true;
    let subscribeGetClient: Subscription = this.clientsService?.getClientById(this.clientId).pipe(
      tap(res => this.handleGetClientSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeGetClient);
  }
  private handleGetClientSuccess(response: any): void {
    if (response?.success || true) {
      this.details = response.result;
      this.patchValue();
      this.isLoading = false;
    } else {
      this.handleError(response?.message);
    }
  }
  private handleError(err: any): any {
    this.setMessage(err || this.publicService.translateTextFromJson('general.errorOccur'), 'error');
    setTimeout(() => {
      this.details = {
        fullName: 'Ahmed Ibrahim',
        id: '3448484844',
        phoneNumber: '432222222',
        email: 'ahmedIbrahim@amil.com',
        birthDate: new Date(),
      };
      this.patchValue();
      this.isLoading = false;
    }, 1000);
  }
  private setMessage(message: string, type: string): void {
    this.alertsService.openToast(type, type, message);
    this.isLoading = false;
  }
  // End Get Client By Id

  // Start Check If National Identity Unique
  checkNationalIdentityAvailable(): void {
    if (!this.formControls.id.valid) {
      return; // Exit early if ID is not valid
    }

    const nationalIdentity = this.modalForm.value.id;
    const data = { nationalIdentity };

    this.isLoadingCheckId = true;

    let checkIdSubscription = this.publicService?.IsNationalIdentityAvailable(data)?.subscribe(
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
  // End Check If National Identity Unique

  // Start Check If Email Unique
  checkEmailAvailable(): void {
    if (!this.formControls.email.valid) {
      return; // Exit early if email is not valid
    }

    const email = this.modalForm.value.email;
    const data = { email };

    this.isLoadingCheckEmail = true;

    let checkEmailSubscription = this.publicService?.IsEmailAvailable(data)?.subscribe(
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
  // Start Check If Email Unique

  // Start Check If Phone Unique
  checkPhoneAvailable(): void {
    if (!this.formControls.phoneNumber.valid) {
      return; // Exit early if email is not valid
    }

    const phone = this.modalForm.value.phoneNumber;
    const data = { phone };

    this.isLoadingCheckPhone = true;

    let checkPhoneSubscription = this.publicService?.IsPhoneAvailable(data)?.subscribe(
      (res: any) => {
        this.handlePhoneResponse(res);
      },
      (err: any) => {
        this.handlePhoneError(err);
      }
    );
    this.subscriptions.push(checkPhoneSubscription);
  }
  private handlePhoneResponse(res: any): void {
    if (res?.success && res?.result != null) {
      this.phoneNotAvailable = !res.result;
    } else {
      this.phoneNotAvailable = false;
      if (res?.message) {
        this.alertsService?.openToast('error', 'error', res.message);
      }
    }
    this.isLoadingCheckPhone = false;
    this.cdr.detectChanges();
  }
  private handlePhoneError(err: any): void {
    this.phoneNotAvailable = false;
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService?.openToast('error', 'error', errorMessage);
    this.isLoadingCheckPhone = false;
  }
  // Start Check If Phone Unique

  onKeyUpEvent(type: string): void {
    if (type == 'id') {
      this.isLoadingCheckId = false;
    }
    if (type == 'email') {
      this.isLoadingCheckEmail = false;
    }
    if (type == 'phoneNumber') {
      this.isLoadingCheckPhone = false;
    }
  }

  // Start Edit Client
  submit(): void {
    if (this.modalForm?.valid) {
      const formData = this.extractFormData();
      this.editClient(formData);
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  private extractFormData(): any {
    return {
      id: this.clientId,
      fullName: this.modalForm?.value?.fullName,
      phoneNumber: this.modalForm?.value?.phoneNumber,
      email: this.modalForm?.value?.email,
      nationalityId: this.modalForm?.value?.id,
      birthDate: this.modalForm?.value?.birthDate
    };
  }
  private editClient(formData: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeEditClient = this.clientsService?.editClient(formData)?.subscribe(
      (res: any) => {
        this.handleEditClientSuccess(res);
      },
      (err: any) => {
        this.handleEditClientError(err);
      }
    );
    this.subscriptions.push(subscribeEditClient);
  }
  private handleEditClientSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response?.isSuccess && response?.statusCode === 200) {
      this.router.navigate(['/Dashboard/Clients']);
      response?.message ? this.alertsService?.openToast('success', 'success', response?.message) : '';
    } else {
      response?.message ? this.alertsService?.openToast('error', 'error', response?.message || this.publicService.translateTextFromJson('general.errorOccur')) : '';
    }
  }
  private handleEditClientError(error: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    error?.message ? this.alertsService?.openToast('error', 'error', error?.message || this.publicService.translateTextFromJson('general.errorOccur')) : '';
  }
  // End Edit Client

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
