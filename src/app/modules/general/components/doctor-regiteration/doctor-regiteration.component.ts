import { TermsAndConditionsViewerComponent } from '../terms-and-conditions-viewer/terms-and-conditions-viewer.component';
import { ConfirmPasswordValidator } from './../../../shared/configs/confirmPasswordValidator';
import { AddSocialModalComponent } from './../add-social-modal/add-social-modal.component';
import { BrowseAllComponent } from './components/browse-all/browse-all.component';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MetadataService } from './../../../shared/services/metadata.service';
import { DoctorsService } from './../../../layout/services/doctors.service';
import { PublicService } from './../../../shared/services/public.service';
import { AlertsService } from './../../../core/services/alerts.service';
import { patterns } from './../../../shared/configs/patternValidation';
import { keys } from './../../../shared/configs/localstorage-key';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-regiteration',
  templateUrl: './doctor-regiteration.component.html',
  styleUrls: ['./doctor-regiteration.component.scss'],
  providers: [DialogService]
})
export class DoctorRegiterationComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  todayDate: Date = new Date();
  readonly minAge = 18;
  maxDate: any = new Date(new Date()?.getFullYear() - this.minAge, new Date()?.getMonth(), new Date()?.getDate());
  isLoading: boolean = false;

  genderOptions: any = [];
  languages: any = [];
  isLoadingLanguages: boolean = false;

  countriesList: any = [];
  isLoadingCountries: boolean = false;

  prefixesList: any = [];
  isLoadingPrefixes: boolean = false;

  parentCategoriesList: any = [];
  isLoadingSpecialists: boolean = false;

  enable_15_minutes: boolean = true;

  linksSocial: any = [];
  linkId: any = 0;

  imageNameString: string = '';
  imageName: string = '';
  isEditImage: boolean = false;
  showImage: boolean = false;
  cvFile: any;
  certificatesFiles: any;
  othersFiles: any;
  doctorImg: any;

  isPasswordChange: boolean = false;
  firstFormGroup = this.formBuilder?.group(
    {
      name_en: ['', {
        validators: [Validators.required, Validators.pattern(patterns.nameEnPattern), Validators.minLength(2), Validators.maxLength(40)],
        updateOn: 'blur'
      }],
      name_ar: ['', {
        validators: [Validators.required, Validators.pattern(patterns.nameArPattern), Validators.minLength(2), Validators.maxLength(40)],
        updateOn: 'blur'
      }],
      email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: "blur" }],
      phone: ["", { validators: [Validators.required, Validators.pattern(/^\d{9}$/)], updateOn: "blur" }],
      phoneCode: [null, { validators: [Validators.required] }],
      // phone: ["", { validators: [Validators.required, Validators.pattern(/^\+966\d{9}$/)], updateOn: "blur" }],
      // phoneNumbers: this.formBuilder.array([this.createPhoneNumber()]),
      gender: [null, [Validators.required]],
      birthdate: [this.maxDate, [Validators.required]],
      terms_conditions: [false, Validators.required],
      password: ['', {
        validators: [Validators.required, Validators.pattern(patterns?.password)],
        updateOn: 'blur'
      }],
      confirmPassword: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
  );
  createPhoneNumber(phone_code?: any): FormGroup {
    return this.formBuilder.group({
      countryCode: [phone_code, Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }
  get firstFormControls(): any {
    return this.firstFormGroup?.controls;
  }
  get phoneNumbers(): FormArray {
    return this.firstFormGroup.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.createPhoneNumber());
  }

  secondFormGroup: any = this.formBuilder?.group({
    country_id: [null, {
      validators: [Validators.required]
    }],
    license: ["", {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    organization: ["", {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    years_of_experience: ["", {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    language_id: [null, {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    prefix: [null, {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
  });
  get secondFormControls(): any {
    return this.secondFormGroup?.controls;
  }

  thirdFormGroup: any = this.formBuilder?.group({
    egyPrice_15: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_15: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    egyPrice_30: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_30: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    egyPrice_45: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_45: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    egyPrice_60: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_60: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    parentCategory: [null, [Validators.required]],
    // category_id: [[], [Validators.required]],
    cv: ["", [Validators.required]],
    certificate: ["", [Validators.required]],
    others: [""],
  });
  get thirdFormControls(): any {
    return this.thirdFormGroup?.controls;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private doctorsService: DoctorsService,
    private dialogService: DialogService,
    public publicService: PublicService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = localStorage.getItem(keys?.language);
      this.updateMetaTags();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTags();
    }
    this.genderOptions = this.publicService.getGenderOptions();
    this.languages = this.publicService?.getLanguages();
    this.prefixesList = this.publicService?.getAllPrefixes();
    this.getCountries();
    this.getSpecialists();
  }
  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | تسجيل كدكتور');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | تسجيل كدكتور' },
      { name: 'description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'http://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | تسجيل كدكتور' },
      { name: 'twitter:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | تسجيل كدكتور' },
      { property: 'og:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }

  onFocusConfirmPassword(): void {
    this.isPasswordChange = false;
  }

  addSocialLink(data?: any): void {
    let termsRef: any;
    if (data) {
      termsRef = this.dialogService?.open(AddSocialModalComponent, {
        data: {
          el: data,
          isEdit: true
        },
        width: '40%',
        dismissableMask: false,
        styleClass: 'pdf-viewer',
        header: this.publicService.translateTextFromJson('doctorRegisteration.editSocialLink')
      });
    } else {
      termsRef = this.dialogService?.open(AddSocialModalComponent, {
        width: '40%',
        dismissableMask: false,
        styleClass: 'pdf-viewer',
        header: this.publicService.translateTextFromJson('doctorRegisteration.addSocialLink')
      });
    }
    termsRef.onClose.subscribe((result: any) => {
      if (result?.item) {
        if (this.linksSocial?.length === 0) {
          let addedItem = result?.item;
          addedItem["id"] = 1;
          this.linksSocial?.push(addedItem);
        } else {
          let founded;
          let foundedItem;
          this.linksSocial?.filter((value: any, index: any) => {
            if (value?.name === result?.item?.name) {
              founded = true;
              foundedItem = index;
            }
          });
          if (founded !== true) {
            let addedItem = result?.item;
            addedItem["id"] = Math.round(Math.random() * 1000);
            this.linksSocial?.push(addedItem);
          } else {
            this.linksSocial[`${foundedItem}`]["link"] = result?.item?.link;
          }
        }
      }
    });
  }
  removeItemSocial(item: any): void {
    this.linksSocial = this.linksSocial?.filter((value: any) => {
      return value?.id !== item?.id;
    });
  }

  getCountries(): void {
    this.isLoadingCountries = true;
    this.doctorsService?.getCountries()?.subscribe(
      (res: any) => this.handleCountriesResponse(res),
      (err: any) => this.handleCountriesError(err)
    );
  }
  private handleCountriesResponse(res: any): void {
    if (res?.status) {
      this.countriesList = res?.data;
      this.countriesList?.forEach((el: any) => {

        if (el.phone_code == '+20') {
          console.log(el);

          this.firstFormGroup?.patchValue({
            phoneCode: el
          })
        }
      });
    } else {
      res?.message ? this.alertService?.openToast('error', res?.message) : '';
    }
    this.isLoadingCountries = false;
  }
  private handleCountriesError(err: any): void {
    err ? this.alertService?.openToast('error', err) : '';
    this.isLoadingCountries = false;
  }
  onChangeCountryControl(event: any): void {
    // console.log(event);
  }

  getSpecialists(): void {
    this.isLoadingSpecialists = true;
    this.doctorsService?.getSpecialists()?.subscribe(
      (res: any) => this.handleSpecialistsResponse(res),
      (err: any) => this.handleSpecialistsError(err)
    );
  }
  private handleSpecialistsResponse(res: any): void {
    if (res?.status) {
      this.parentCategoriesList = res?.data;
    } else {
      res?.message ? this.alertService?.openToast('error', res?.message) : '';
    }
    this.isLoadingSpecialists = false;
  }
  private handleSpecialistsError(err: any): void {
    err ? this.alertService?.openToast('error', err) : '';
    this.isLoadingCountries = false;
  }

  backStep(stepper: MatStepper): void {
    stepper.previous();
  }
  onStepChange(event: any): void {
    if (event?.selectedIndex == 0) {
      if (this.firstFormGroup?.valid) {
        // console.log(this.firstFormGroup?.value);
      } else {
        this.publicService?.validateAllFormFields(this.firstFormGroup);
      }
    }
    // else if (event?.selectedIndex == 1) {
    //   if (this.secondFormGroup?.valid) {
    //     console.log(this.secondFormGroup?.value);
    //   } else {
    //     this.publicService?.validateAllFormFields(this.secondFormGroup);
    //   }
    // }
  }
  openPdfViewer(pdf?: any): void {
    const termsRef = this.dialogService?.open(TermsAndConditionsViewerComponent, {
      data: pdf,
      width: '90%',
      height: '100%',
      dismissableMask: false,
      styleClass: 'pdf-viewer'

    });
    termsRef.onClose.subscribe((res: any) => {
      if (res?.isAgree == true) {
        this.firstFormGroup.patchValue({
          terms_conditions: true
        });
      }
      if (res?.isAgree == false) {
        this.firstFormGroup.patchValue({
          terms_conditions: false
        });
      }
    });
  }
  uploadImage(e: any): void {
    this.doctorImg = e;
  }
  uploadCv(e: any): void {
    let data: any = {
      file: e.image,
      image: e.file?.img[0]?.img
    }
    this.cvFile = data;
    this.thirdFormGroup?.patchValue({
      cv: data
    })
  }
  uploadCert(e: any): void {
    this.certificatesFiles = e;
    this.thirdFormGroup?.patchValue({
      certificate: e
    })
  }
  uploadOther(e: any): void {
    this.othersFiles = e;
    this.thirdFormGroup?.patchValue({
      others: e
    })
  }
  onEgyPriceChange(event: any): void {
    let egyPrice30: any = event * 2;
    let egyPrice45: any = event * 3;
    let egyPrice60: any = event * 4;
    this.thirdFormGroup?.patchValue({
      egyPrice_30: egyPrice30,
      egyPrice_45: egyPrice45,
      egyPrice_60: egyPrice60
    })
  }
  onDollarPriceChange(event: any): void {
    let dollarPrice30: any = event * 2;
    let dollarPrice45: any = event * 3;
    let dollarPrice60: any = event * 4;
    this.thirdFormGroup?.patchValue({
      dollarPrice_30: dollarPrice30,
      dollarPrice_45: dollarPrice45,
      dollarPrice_60: dollarPrice60
    })
  }
  submitRegister(stepper: MatStepper, type?: any): void {
    if (stepper?.selectedIndex == 0) {
      if (this.firstFormGroup?.valid) {
      } else {
        this.publicService?.validateAllFormFields(this.firstFormGroup);
      }
    }
    if (type == 'second') {
      if (stepper?.selectedIndex == 1) {
        if (this.secondFormGroup?.valid) {
        } else {
          this.publicService?.validateAllFormFields(this.secondFormGroup);
        }
      }
    }
    if (type == 'third') {
      if (stepper?.selectedIndex == 2) {
        if (this.thirdFormGroup?.valid) {
        } else {
          this.publicService?.validateAllFormFields(this.thirdFormGroup);
        }
      }
    }
  }
  browseAll(type: any): void {
    let header;
    let items: any = []
    if (type == 'parentCategory') {
      header = 'التخصصات';
      items = { list: this.thirdFormGroup?.value?.parentCategory, key: 'name' };
    }
    const ref = this.dialogService?.open(BrowseAllComponent, {
      data: items,
      header: header,
      dismissableMask: false,
      width: '50%'
    });

    ref.onClose.subscribe((res: any) => {

    });
  }

  registerNow(): void {
    var formData: any = new FormData();
    formData.append("image", this.doctorImg?.image);
    formData.append("full_name_en", this.firstFormGroup?.value?.name_en);
    formData.append("full_name_ar", this.firstFormGroup?.value?.name_ar);
    formData.append("email", this.firstFormGroup?.value?.email);
    // formData.append("phone_no", this.publicService?.removeNonNumeric(this.firstFormGroup?.value?.phone?.number));
    formData.append("phone_no", this.firstFormGroup?.value?.phone);
    formData.append("phone_code", this.firstFormGroup?.value?.phoneCode?.phone_code);
    formData.append("gender", this.firstFormGroup?.value?.gender?.value);
    formData.append("password", this.firstFormGroup?.value?.password);
    formData.append("birth_date", this.publicService?.convertTimeOrDate(this.firstFormGroup?.value?.birthdate, 'date6'));
    formData.append("terms_conditions", this.firstFormGroup?.value?.terms_conditions);
    formData.append("country_id", this.secondFormGroup?.value?.country_id?.id);
    formData.append("country", this.secondFormGroup?.value?.country_id?.name);
    formData.append("license_number", this.secondFormGroup?.value?.license)
    formData.append("license_origin", this.secondFormGroup?.value?.organization);
    formData.append("years_experience", this.secondFormGroup?.value?.years_of_experience);
    this.secondFormGroup?.value?.language_id
      ? formData.append("language", 'arabic')
      // ? formData.append("language", this.secondFormGroup?.value?.language_id?.id)
      : "";
    formData.append("title", this.secondFormGroup?.value?.prefix?.name);
    formData.append("price_half_hour_usd", this.thirdFormGroup?.value?.dollarPrice_30);
    formData.append("price_half_hour_sar", this.thirdFormGroup?.value?.egyPrice_30);
    this.thirdFormGroup?.value?.parentCategory.forEach((item) => {
      formData.append("specialists[]", item?.id);
    });

    formData.append("cv", this.cvFile?.file);
    for (var i = 0; i < this.certificatesFiles?.image?.length; i++) {
      formData.append("certifications[]", this.certificatesFiles?.image[i]);
    }
    for (var i = 0; i < this.othersFiles?.image?.length; i++) {
      formData.append("other", this.othersFiles?.image[i]);
    }
    if (this.linksSocial?.length > 0) {
      this.linksSocial?.forEach((element: any) => {
        formData.append(`social[${element?.name?.value}]`, element?.link);
      });
    }
    this.publicService?.show_loader?.next(true);
    this.doctorsService?.joinUs(formData)?.subscribe(
      (res: any) => {
        if (res?.status) {
          this.alertService?.openToast('success', 'تم تسجيل طلبك بنجاح و سيتم ملااجعة طلبك والتواصل معك قريبا');
          this.router?.navigate(['/doctors']);
          this.publicService?.show_loader?.next(false);
        } else {
          this.alertService?.openToast('error', res?.message || 'حدث خطا غير متوقع');
        }
        this.publicService?.show_loader?.next(false);
      },
      (err: any) => {
        if (err?.message) {
          this.alertService?.openToast('error', err?.message);
        }
        this.publicService?.show_loader?.next(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
